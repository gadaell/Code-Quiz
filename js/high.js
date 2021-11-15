const saveHighScores = () => {
  const initials = document.getElementById("initialsInput").value;
  const highScores = {
    initials: initials,
    highScore: timer,
  };
  scores = JSON.parse(localStorage.getItem("highscores"));
  if (!scores) {
    scores = [];
  }
  scores.push(highScores);

  localStorage.setItem("highscores", JSON.stringify(scores));
  getHighScores();
  document.getElementById("quiz-area").innerHTML = "";
  document.getElementById("score-area").innerHTML = "";
  const clearDiv = document.createElement("div");
  const clearButton = document.createElement("button");
  const clearText = document.createTextNode("Clear High Scores");
  clearButton.appendChild(clearText);
  clearButton.id = "clear";
  clearButton.className = "button";
  clearDiv.appendChild(clearButton);
  document.getElementById("confirm").appendChild(clearDiv);
  document.getElementById("table").style.display = "initial";
};

document.addEventListener("click", function (e) {
  if (e.target.id === "save") {
    saveHighScores();
  }
  if (e.target.id === "clear") {
    localStorage.clear();
    getHighScores();
  }
  if (
    e.target.id === "answer1" ||
    e.target.id === "answer2" ||
    e.target.id === "answer3" ||
    e.target.id === "answer4"
  ) {
    if (e.target.id == qAs[questionCounter].correct) {
      document.getElementById("confirm").innerHTML = "Correct!";
      setTimeout(function () {
        document.getElementById("confirm").innerHTML = "";
      }, 500);
    } else {
      document.getElementById("confirm").innerHTML = "Incorrect";
      setTimeout(function () {
        document.getElementById("confirm").innerHTML = "";
      }, 500);
      timer = timer - 15;
      if (timer < 0) {
        timer = 0;
      }
      document.getElementById("score-area").innerHTML = "Time: " + timer;
    }
    questionCounter++;
    if (questionCounter < qAs.length && timer > 0) {
      getQuestionAnswer(questionCounter);
    } else {
      document.getElementById("heading").innerHTML = "Quiz Complete";
      document.getElementById("confirm").innerHTML = "";

      clearInterval(scoreCounter);
      if (timer < 0) {
        timer = 0;
      }
      const score = document.createElement("h2");
      const scoreText = document.createTextNode("Your score is " + timer);
      score.appendChild(scoreText);
      const div = document.createElement("div");
      const input = document.createElement("input");
      const inputText = document.createTextNode("Please enter your initials");
      div.appendChild(inputText);
      input.id = "initialsInput";
      div.appendChild(input);
      score.appendChild(div);
      const scoreArea = document.getElementById("quiz-area");
      scoreArea.innerHTML = "";
      const divButton = document.createElement("div");

      const saveButton = document.createElement("button");
      const saveText = document.createTextNode("Save Score");
      saveButton.appendChild(saveText);
      saveButton.id = "save";
      saveButton.className = "button";
      divButton.appendChild(saveButton);
      score.appendChild(divButton);
      scoreArea.appendChild(score);
    }
  }
});

const startTimer = () => {
  scoreCounter = setInterval(function () {
    document.getElementById("score-area").innerHTML = "Time: " + timer;
    timer--;
  }, 1000);
};
