const puppeteer = require("puppeteer");
const fs = require("fs");

// --- Utils ---
const { updateTimestamp } = require("./utils/update_timeout");
const {
  convertFrenchToEnglishDate,
} = require("./utils/format_french_month.js");

// --- Function for script ---
const { connectToLGB } = require("./function-for-script/connectionUtils");
const { selectDropdownMenus } = require("./function-for-script/dropDownUtils");
const { checkMonth } = require("./function-for-script/checkMonthUtils");
const {
  checkDayAvailable,
} = require("./function-for-script/checkDayAvailableUtils");
const {
  clickContinueButton,
} = require("./function-for-script/continueButtonUtils");

// --- DATA ---
let CHOICE_FOR_DINER = JSON.parse(
  fs.readFileSync("variables/choice_for_diner.json")
);
let DATA_TOKEN = JSON.parse(fs.readFileSync("data/persist_lgb_token.json"));
let targetDate = "2023-10-10";
updateTimestamp(targetDate);

// --- Function for scrap lgb --
async function startScrapping() {
  try {
    while (true) {
      // Boucle infinie
      // ## -- Connection to LGB -- ##
      const browser = await puppeteer.launch({
        // headless: false,
        // devtools: true,
      });
      const page = await browser.newPage();

      await connectToLGB(page, DATA_TOKEN);

      // ## -- Select dorp down menu : Phase 1 -- ##
      await selectDropdownMenus(page, CHOICE_FOR_DINER);

      // ## -- Check month : Phase 1 -- ##
      await checkMonth(page, CHOICE_FOR_DINER);

      // ##-- Check Button Disabled or not : Phase 1 --##
      await checkDayAvailable(page, CHOICE_FOR_DINER, 1);

      // ## -- Click on Continue : Phase 1 -- ##
      await clickContinueButton(page);
      const currentDate = new Date();

      // ##-- Check Button Disabled or not : Phase 2 --##
      if (await checkDayAvailable(page, CHOICE_FOR_DINER, 2)) {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString("fr-FR", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        console.log(`Date trouvée à ${formattedDate}. Arrêt de la recherche.`);
        break; // Arrête la boucle lorsque la bonne date est trouvée
      }

      console.log(
        "One iteration completed. Waiting before the next iteration..."
      );

      // Fermez le navigateur et attendez un certain temps avant de recommencer
      // await browser.close();
      // await new Promise((resolve) => setTimeout(resolve, 10000)); // Attendez 60 secondes (1 minute) avant de continuer la prochaine itération
    }
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

startScrapping();
