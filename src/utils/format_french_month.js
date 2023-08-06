function convertFrenchToEnglishDate(frenchDate) {
    const months = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
  
    // Sépare le mois et l'année de la chaîne de caractères
    const [month, year] = frenchDate.split(" ");
  
    // Trouve l'index du mois dans le tableau "months"
    const monthIndex = months.findIndex((m) => m.toLowerCase() === month.toLowerCase());
  
    // Si l'index est valide, renvoie le mois en anglais avec l'année
    if (monthIndex !== -1) {
      const englishMonth = new Date(Date.parse(`${monthIndex + 1}/1`)).toLocaleString('en', { month: 'long' });
      const englishDate = `${englishMonth} ${year}`;
      return englishDate;
    } else {
      // Si le mois n'est pas trouvé, renvoie la chaîne d'origine telle quelle
      return frenchDate;
    }
  }

  module.exports = {convertFrenchToEnglishDate}