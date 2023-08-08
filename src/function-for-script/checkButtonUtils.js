async function checkButtons(page) {
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
        return;
      }
    }
  }
  
  module.exports = { checkButtons };