async function clickContinueButton(page) {
    const continueButton = await page.$(".sc-fodVxV.cRYqUJ button");
  
    // Vérifier si le bouton est trouvé
    if (continueButton) {
      // Cliquer sur le bouton
      await continueButton.click();
      console.log("Bouton 'Continuer' cliqué !");
    } else {
      console.log("Bouton 'Continuer' introuvable.");
    }
  }
  
  module.exports = { clickContinueButton };
  