const puppeteer = require("puppeteer");
const fs = require("fs");
const { updateTimestamp } = require("./utils/update_timeout");
const { convertToOption } = require("./utils/noon_or_evening");
const {
  convertFrenchToEnglishDate,
} = require("./utils/format_french_month.js");
const { log } = require("console");
let CHOICE_FOR_DINER = JSON.parse(
  fs.readFileSync("variables/choice_for_diner.json")
);
let DATA_TOKEN = JSON.parse(fs.readFileSync("data/persist_lgb_token.json"));
let targetDate = "2023-10-10";

updateTimestamp(targetDate);
async function startScrapping() {
  try {
    // Connection to https://reservation.lesgrandsbuffets.com/date-and-guests
    // With token and timeout ilimited
    const browser = await puppeteer.launch({
      headless: false,
      devtools: true,
    });
    const page = await browser.newPage();
    let { persist_lgb, token } = DATA_TOKEN;
    await page.goto("https://reservation.lesgrandsbuffets.com/");
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.evaluate(
      (token, persist_lgb) => {
        localStorage.setItem("token", token);
        localStorage.setItem("persist:lgb", JSON.stringify(persist_lgb));
      },
      token,
      persist_lgb
    );
    await page.goto("https://reservation.lesgrandsbuffets.com/date-and-guests");
    await page.setViewport({ width: 1080, height: 1024 });

    console.log("Connection to lgb/date-and-guests is ok ");

    // Select all dropdown menus with the same class
    const selectMenus = await page.$$(".sc-ezrdKe.bAYFRD > .sc-kLgntA.iIAZCR");

    // Check if dropdown menus are found
    // Number People + When diner
    if (selectMenus.length > 0) {
      await selectMenus[0].select(CHOICE_FOR_DINER.NUMBER_PEOPLE);
      await page.waitForTimeout(1000);
      await selectMenus[1].select(convertToOption(CHOICE_FOR_DINER.WHEN_DINER));
      await page.waitForTimeout(1000);
      console.log("All options selected in the dropdown menus.");
    } else {
      console.log("No dropdown menus found. Please check your CSS selector.");
    }

    // ## -- Check month -- ##
    // // Wait for the span element to be visible on the page
    // await page.waitForSelector(
    //   ".react-calendar__navigation__label__labelText--from"
    // );

    // // Get the content of the span element
    // const getMonthYears = await page.evaluate(() => {
    //   const spanElement = document.querySelector(
    //     ".react-calendar__navigation__label__labelText--from"
    //   );
    //   return spanElement.textContent.trim();
    // });
    // // Check the content of the span
    // if (getMonthYears === convertFrenchToEnglishDate(CHOICE_FOR_DINER.MONTH_AS_YOU_WANT_DINER)) {
    //   console.log("The span content matches the desired content.");
    // } else {
    //   console.log("The span content does not match the desired content.");
    // }

    let currentDate;
    while (true) {
      // Cliquez sur le bouton de navigation pour faire défiler la date
      await page.click(
        ".react-calendar__navigation__arrow.react-calendar__navigation__next-button"
      );

      // Attendez un court instant pour laisser le calendrier se mettre à jour
      await page.waitForTimeout(500);

      // Obtenez la date actuellement affichée dans le span correspondant
      currentDate = await page.evaluate(() => {
        const spanElement = document.querySelector(
          ".react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from"
        );
        return spanElement.textContent.trim();
      });

      // Vérifiez si la date correspond à la date cible
      console.log(
        currentDate ===
          convertFrenchToEnglishDate(CHOICE_FOR_DINER.MONTH_AS_YOU_WANT_DINER)
      );
      if (
        currentDate ===
        convertFrenchToEnglishDate(CHOICE_FOR_DINER.MONTH_AS_YOU_WANT_DINER)
      ) {
        console.log("La date cible a été trouvée :", currentDate);
        break;
      }
    }

    // ##-- Check Button --##
    // Attendre que la div contenant les boutons soit visible
    await page.waitForSelector(".react-calendar__month-view__days");

    // Obtenir tous les boutons à l'intérieur de la div
    const buttons = await page.$$(".react-calendar__month-view__days button");
    for (const button of buttons) {
      // Vérifier si le bouton est désactivé (disabled)
      const isDisabled = await button.evaluate((btn) => btn.disabled);

      // Obtenir le texte du bouton
      const buttonText = await button.evaluate((btn) => btn.textContent.trim());

      // Afficher l'état du bouton
      if (isDisabled) {
        console.log(`Le bouton "${buttonText}" est désactivé.`);
      } else {
        console.log(`Le bouton "${buttonText}" est activé.`);
        await button.click();
        break;
      }
    }
    // ## -- Click on Continue -- ##
    // Utiliser page.$() pour obtenir le bouton à l'intérieur de la div
    const continueButton = await page.$(".sc-fodVxV.cRYqUJ button");

    // Vérifier si le bouton est trouvé
    if (continueButton) {
      // Cliquer sur le bouton
      await continueButton.click();
      console.log("Bouton 'Continuer' cliqué !");
    } else {
      console.log("Bouton 'Continuer' introuvable.");
    }

    //   if (continueButton) {
    //     continueButton.click();
    //     console.log("Bouton 'Continuer' cliqué !");
    //   } else {
    //     console.log("Bouton 'Continuer' introuvable.");
    //   }
    // };

    console.log("Script Lunched think close ctr + C");
  } catch (err) {
    console.error("An error occurred :", err);
  }
}
startScrapping();
