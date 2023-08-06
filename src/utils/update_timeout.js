const fs = require("fs");
const path = require("path");

function updateTimestamp(targetDate) {
  const fileName = "persist_lgb_token.json";
  const filePath = path.join(process.cwd(), "data", fileName);
  try {
    // Charger le contenu du fichier JSON
    let persist_lgb = require(filePath);

    // Convertir la date cible en timestamp (en millisecondes)
    const targetTimestamp = new Date(targetDate).getTime();

    // Convertir la chaîne JSON de "bookingSlice" en un objet JSON
    persist_lgb.persist_lgb.bookingSlice = JSON.parse(persist_lgb.persist_lgb.bookingSlice);

    // Vérifier si le timestamp existant est différent de la cible
    if (persist_lgb.persist_lgb.bookingSlice.timeout !== targetTimestamp) {
      // Mettre à jour le champ "timeout" avec le nouveau timestamp
      persist_lgb.persist_lgb.bookingSlice.timeout = targetTimestamp;

      // Convertir l'objet JSON de "bookingSlice" en chaîne JSON
      persist_lgb.persist_lgb.bookingSlice = JSON.stringify(persist_lgb.persist_lgb.bookingSlice);

      // Sauvegarder les modifications dans le fichier JSON
      fs.writeFileSync(filePath, JSON.stringify(persist_lgb));

      console.log("Le timestamp a été mis à jour avec succès pour la date :", targetDate);
    } else {
      console.log("Le timestamp dans le fichier est déjà égal à la date cible :", targetDate);
    }
  } catch (err) {
    console.error("Une erreur s'est produite lors de la mise à jour du timestamp :", err);
  }
}

module.exports = { updateTimestamp };