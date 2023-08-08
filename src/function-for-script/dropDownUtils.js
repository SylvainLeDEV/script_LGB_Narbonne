const { convertToOption } = require("../utils/noon_or_evening");
async function selectDropdownMenus(page, choiceForDiner) {
    // Select all dropdown menus with the same class
    const selectMenus = await page.$$(".sc-ezrdKe.bAYFRD > .sc-kLgntA.iIAZCR");
    if (selectMenus.length > 0) {
      await selectMenus[0].select(choiceForDiner.NUMBER_PEOPLE);
      await page.waitForTimeout(1000);
      await selectMenus[1].select(convertToOption(choiceForDiner.WHEN_DINER));
      await page.waitForTimeout(1000);
      console.log("All options selected in the dropdown menus.");
    } else {
      console.log("No dropdown menus found. Please check your CSS selector.");
    }
  }
  
  module.exports = { selectDropdownMenus };