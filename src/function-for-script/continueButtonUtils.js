async function clickContinueButton(page) {
  const continueButton = await page.$(".sc-fodVxV.cRYqUJ button");

  // Vérifier si le bouton est trouvé

  if (continueButton) {
    // Cliquer sur le bouton
    await continueButton.click();
    console.log("Bouton 'Continuer' cliqué !");

    // Vérifier si la popup avec la classe .sc-jcVebW est présente
    await page.waitForTimeout(600); // Vous pouvez ajuster le délai en millisecondes
    const reactModalPortals = await page.$$(
      ".ReactModal__Body--open .ReactModalPortal"
    );

    if (reactModalPortals && reactModalPortals.length > 1) {
      // Sélectionner le deuxième élément avec la classe .ReactModalPortal (index 1)
      const deuxiemeReactModalPortal = reactModalPortals[1];

      // Cibler la modal à l'intérieur de cet élément
      const modalSelector =
        ".ReactModal__Overlay .ReactModal__Content .sc-jcVebW .sc-bZSQDF .sc-bqyKva:nth-child(2) .sc-kstrdz .sc-hBEYos .sc-fodVxV";

      const continueButtonSelector = `${modalSelector} .sc-fFubgz.iQuECY`;

      // const divInModal = await deuxiemeReactModalPortal.$(modalSelector);

      // if (divInModal) {

      //     const divContent = await divInModal.evaluate((element) => {

      //         return element.innerHTML;

      //     });

      //     console.log(

      //         "Contenu de la div dans modalSelector :",

      //         divContent

      //     );

      // } else {

      //     console.log(

      //         "La div correspondante à modalSelector est introuvable."

      //     );

      // }

      const continueButtonInModal = await deuxiemeReactModalPortal.$(
        continueButtonSelector
      );

      if (continueButtonInModal) {
        // Cliquer sur le bouton
        await continueButtonInModal.click();
        console.log("Bouton 'Continuer' à l'intérieur de la modal cliqué !");
      } else {
        console.log(
          "Bouton 'Continuer' à l'intérieur de la modal introuvable."
        );
      }
    } else {
      console.log("Il n'y a pas de modal et le script continue sinon = Le DOM dans la modal à changé");
    }
  } else {
    console.log("Bouton 'Continuer' introuvable.");
  }
}

module.exports = { clickContinueButton };
