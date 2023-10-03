async function clickContinueButton(page) {
  const continueButton = await page.$(".sc-fodVxV.cRYqUJ button");

  // Vérifier si le bouton est trouvé
  if (continueButton) {
    // Cliquer sur le bouton
    await continueButton.click();
    console.log("Bouton 'Continuer' cliqué !");

    // // Vérifier si la popup avec la classe .sc-jcVebW est présente
    // await page.waitForTimeout(4000); // Vous pouvez ajuster le délai en millisecondes
    // await page.waitForSelector(".ReactModal__Content--after-open");

    // // Cibler la modal par sa classe parent "ReactModalPortal" et sa classe enfant "ReactModal__Content"
    // const modalSelector = ".ReactModalPortal .ReactModal__Overlay ReactModal__Overlay--after-open";

    // // Attendre que le bouton "Continuer" soit visible à l'intérieur de la modal
    // const continueButtonSelector = `${modalSelector} .sc-fFubgz.iQuECY button`;
    // await page.waitForSelector(continueButtonSelector);

    // // Cibler le bouton "Continuer" à l'intérieur de la modal
    // const continueButtonInModal = await page.$(continueButtonSelector);

    // if (continueButtonInModal) {
    //   // Cliquer sur le bouton
    //   await continueButtonInModal.click();
    //   console.log("Bouton 'Continuer' à l'intérieur de la modal cliqué !");
    // } else {
    //   console.log("Bouton 'Continuer' à l'intérieur de la modal introuvable.");
    // }
  } else {
    console.log("Bouton 'Continuer' introuvable.");
  }
}

module.exports = { clickContinueButton };
