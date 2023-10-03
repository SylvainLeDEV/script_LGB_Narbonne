async function checkDayAvailable(page, choiceForDiner) {
  // Attendre que la div contenant les boutons soit visible
  await page.waitForSelector(".react-calendar__month-view__days");

  await page.waitForTimeout(600);
  // Obtenir tous les boutons à l'intérieur de la div
  const buttons = await page.$$(".react-calendar__month-view__days button");
  for (const button of buttons) {
    // Vérifier si le bouton est désactivé (disabled)
    const isDisabled = await button.evaluate((btn) => btn.disabled);

    // Obtenir le texte du bouton
    const buttonText = await button.evaluate((btn) => btn.textContent.trim());

    // Afficher l'état du bouton
    if (isDisabled) {
      console.log(`La date ${buttonText} ${choiceForDiner.MONTH_AS_YOU_WHEN_DINER} n'est pas disponible.`);
    } else {
      console.log(`La date ${buttonText} ${choiceForDiner.MONTH_AS_YOU_WHEN_DINER} est disponible.`);
      await button.click();
      return;
    }
  }
}

module.exports = { checkDayAvailable };
