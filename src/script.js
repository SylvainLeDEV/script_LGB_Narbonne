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
const { checkDayAvailable } = require("./function-for-script/checkDayAvailableUtils");
const { clickContinueButton } = require("./function-for-script/continueButtonUtils");

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
    // ## -- Connection to LGB -- ##
    const browser = await puppeteer.launch({
      headless: false,
      devtools: true,
    });
    const page = await browser.newPage();

    await connectToLGB(page, DATA_TOKEN);

    // ## -- Select dorp down menu : Phase 1 -- ##
    await selectDropdownMenus(page, CHOICE_FOR_DINER);

    // ## -- Check month : Phase 1 -- ##
    await checkMonth(page, CHOICE_FOR_DINER);
  
    // ##-- Check Button Disabled or not : Phase 1 --##
    await checkDayAvailable(page);

    // ## -- Click on Continue : Phase 1 -- ##
    await clickContinueButton(page);

    console.log("Script Lunched think close ctr + C");
  } catch (err) {
    console.error("An error occurred :", err);
  }
}
startScrapping();
