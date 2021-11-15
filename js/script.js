let scores = [];
let timer = 85;
let scoreCounter;
let questionCounter = 0;

const getHighScores = () => {
  let scoresArray = JSON.parse(localStorage.getItem("highscores"));
  let table = document.getElementById("highs");
  table.innerHTML = "";
  if (scoresArray != null && scoresArray.length > 0) {
    for (let item = 0; item < scoresArray.length; item++) {
      let row = table.insertRow(0);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      cell1.innerHTML = scoresArray[item].initials;
      cell2.innerHTML = scoresArray[item].highScore;
    }
  }
};

getHighScores();

document.getElementById("start").addEventListener("click", function () {
  startQuiz();
});

const getQuestionAnswer = (index) => {
  let para = document.createElement("h1");
  let t = document.createTextNode(qAs[index].question);
  para.appendChild(t);
  let div = document.createElement("div");
  let divQ1 = document.createElement("div");
  let answer1 = document.createElement("button");
  let answer1Text = document.createTextNode(qAs[index].a1);
  answer1.appendChild(answer1Text);
  answer1.id = "answer1";
  answer1.className = "button";
  divQ1.appendChild(answer1);
  let divQ2 = document.createElement("div");

  let answer2 = document.createElement("button");
  let answer2Text = document.createTextNode(qAs[index].a2);
  answer2.appendChild(answer2Text);
  answer2.id = "answer2";
  answer2.className = "button";
  divQ2.appendChild(answer2);
  let divQ3 = document.createElement("div");

  let answer3 = document.createElement("button");
  let answer3Text = document.createTextNode(qAs[index].a3);
  answer3.appendChild(answer3Text);
  answer3.id = "answer3";
  answer3.className = "button";
  divQ3.appendChild(answer3);
  let divQ4 = document.createElement("div");

  let answer4 = document.createElement("button");
  let answer4Text = document.createTextNode(qAs[index].a4);
  answer4.appendChild(answer4Text);
  answer4.id = "answer4";
  answer4.className = "button";
  divQ4.appendChild(answer4);
  div.appendChild(divQ1);
  div.appendChild(divQ2);
  div.appendChild(divQ3);
  div.appendChild(divQ4);
  let area = document.getElementById("quiz-area");
  area.innerHTML = "";
  area.appendChild(para);
  area.appendChild(div);
};

const startQuiz = () => {
  document.getElementById("heading").innerHTML = "";
  document.getElementById("table").style.display = "none";
  document.getElementById("highs").innerHTML = "";
  document.getElementById("score-area").innerHTML = "Time: " + timer;
  startTimer();
  getQuestionAnswer(questionCounter);
};
