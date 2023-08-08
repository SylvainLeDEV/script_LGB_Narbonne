const {
    convertFrenchToEnglishDate,
  } = require("../utils/format_french_month");
async function checkMonth(page, choiceForDiner) {
    let currentDate = await page.evaluate(() => {
      const spanElement = document.querySelector(
        ".react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from"
      );
      return spanElement.textContent.trim();
    });
  
    if (currentDate !== convertFrenchToEnglishDate(choiceForDiner.MONTH_AS_YOU_WHEN_DINER)) {
      while (true) {
        await page.click(
          ".react-calendar__navigation__arrow.react-calendar__navigation__next-button"
        );
  
        currentDate = await page.evaluate(() => {
          const spanElement = document.querySelector(
            ".react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from"
          );
          return spanElement.textContent.trim();
        });
  
        if (currentDate === convertFrenchToEnglishDate(choiceForDiner.MONTH_AS_YOU_WHEN_DINER)) {
          console.log("Date cible trouvée :", currentDate);
          break;
        }
      }
    } else {
      console.log("Date cible trouvée :", currentDate);
    }
  }
  
  module.exports = { checkMonth };