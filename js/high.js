// vars to control DOM
var storedScoresEl = document.getElementById("stored-scores");
var storedInitialsEl = document.getElementById("stored-initials");

//window.onload function to order the getScores function
window.onload = function () {
  getScores();
};
// getting information from local storage.
function getScores() {
  var loadUserInitials = JSON.parse(localStorage.getItem("userInfo"));
  var loadUserScores = JSON.parse(localStorage.getItem("userScore"));
  console.log(loadUserInitials);
  console.log(loadUserScores);

  storedScoresEl.textContent = "Score: " + loadUserScores;
  storedInitialsEl.textContent = "Initials: " + loadUserInitials;
}
