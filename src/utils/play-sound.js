let player = require("play-sound")((opts = {}));
function playNotificationSound() {
  const soundFilePath = "./assets/bon_app_bande_dabruti.mp3";
  // Use the play function from the play-sound library
  // Function to play the sound
  function playSound(callback) {
    player.play(soundFilePath, (err) => {
      if (err) {
        console.error("Error playing sound:", err.message);
        process.exit(1);
      }
      callback(); // Call the callback function when the sound is finished playing
    });
  }

  // Play the sound three times in a loop
  function playSoundLoop(index) {
    if (index < 3) {
      playSound(() => {
        playSoundLoop(index + 1);
      });
    }
  }

  // Start playing the sound loop
  playSoundLoop(0);
}

module.exports = { playNotificationSound };
