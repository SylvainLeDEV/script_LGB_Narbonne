async function checkDayAvailable(page, choiceForDiner, phase) {
  // Attendre que la div contenant les boutons soit visible
  if (phase === 2) {
    await page.waitForTimeout(500);
    await page.goto(
      "https://reservation.lesgrandsbuffets.com/date-and-guests?step=availabilities"
    );
  }
  await page.waitForSelector(".react-calendar__month-view__days");

  await page.waitForTimeout(700);
  // Obtenir tous les boutons à l'intérieur de la div
  const buttons = await page.$$(".react-calendar__month-view__days button");
  for (const button of buttons) {
    // Vérifier si le bouton est désactivé (disabled)
    const isDisabled = await button.evaluate((btn) => btn.disabled);

    // Obtenir le texte du bouton
    const buttonText = await button.evaluate((btn) => btn.textContent.trim());

    if (phase === 1) {
      if (isDisabled) {
        console.log(`Phase 1 : jour pas disponible.`);
      } else {
        console.log(
          `Phase 1 : La date ${buttonText} ${choiceForDiner.MONTH_AS_YOU_WHEN_DINER} est disponible.`
        );
        await button.click();
        return true;
      }
    } else if (phase === 2) {
      if (!isDisabled) {
        console.log(
          `
          ---------- 
         Phase 2 : La date ${buttonText} ${choiceForDiner.MONTH_AS_YOU_WHEN_DINER} est disponible. Pour ${choiceForDiner.NUMBER_PEOPLE} personnes, le ${choiceForDiner.WHEN_DINER}
          ----------
          `
        );
      } else {
        console.log(
          `La date ${buttonText} ${choiceForDiner.MONTH_AS_YOU_WHEN_DINER} n'est pas disponible.`
        );
      }
      // Comparer avec le chiffre 27 si le bouton n'est pas désactivé
      if (!isDisabled && parseInt(buttonText) === choiceForDiner.WHAT_DAY) {
        console.log(
          `
          Phase 2 : La date cherché précisément ${buttonText} ${choiceForDiner.MONTH_AS_YOU_WHEN_DINER} est disponible. Pour ${choiceForDiner.NUMBER_PEOPLE} personnes, le ${choiceForDiner.WHEN_DINER}
          `
        );
        await button.click();
        return true;
      }
    }
  }
}

module.exports = { checkDayAvailable };
