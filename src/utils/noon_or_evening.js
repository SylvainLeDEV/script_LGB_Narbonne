function convertToOption(choice) {
    const eveningOption = "evening";
    const noonOption = "noon";
  
    // Check the choice and return the appropriate option
    if (choice === "soir") {
      return eveningOption;
    } else if (choice === "midi") {
      return noonOption;
    } else {
      // If the choice is neither "soir" nor "midi", return null as an invalid choice
      return null;
    }
  }
  module.exports = {convertToOption}