//variables
const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quizBox");
const option_list = document.querySelector(".option-list");
const timeCount = quizBox.querySelector(".timer .timer-sec");
const timeLine = quizBox.querySelector("header .time-line");
const next_btn = quizBox.querySelector(".next-btn");
const result_box = document.querySelector(".result-box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 120;
let widthValue = 0;
let userScore = 0;

// When start button is clicked
startBtn.onclick = () => {
  infoBox.classList.add("activeInfo");
};

// When exit button is clicked
exitBtn.onclick = () => {
  infoBox.classList.remove("activeInfo");
  // console.log("hello");
};

//When continue button is clicked
continueBtn.onclick = () => {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.add("activeQuiz");
  showQuestions(0);
  queCounter(1);
  startTimer(120);
  startTimerLine(0);
  // console.log("hello");
};

// When the next button is clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    next_btn.style.display = "none";
    // clearInterval(counter);
    // startTimer(timeValue);
  } else {
    clearTimeout(startTimer);
    console.log("Questions completed");
    showResultBox();
    // if (timeCount === 0 || timeCount < 0) {
    //   timeCount.textContent = "Game Over!";
    //   clearInterval(timeCount);
    // }
  }
};

//When the quit button is clicked
quit_quiz.onclick = () => {
  window.location.reload();
};

//When the restart button is clicked
restart_quiz.onclick = () => {
  quizBox.classList.add("activeQuiz");
  result_box.classList.remove("activeResult");
  let que_count = 0;
  let que_numb = 1;
  let timeValue = 120;
  let widthValue = 0;
  let userScore = 0;
  showQuestions(que_count);
  queCounter(que_numb);
  startTimer(timeValue);
  clearInterval(counterLine);
  // clearInterval(timeLine);
  startTimerLine(widthValue);
  next_btn.style.display = "none";
};

//grabbing questions & answers from array
function showQuestions(index) {
  const que_text = document.querySelector(".que-text");
  let que_tag =
    "<span>" +
    questions[index].number +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option">' +
    questions[index].options[0] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[1] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[2] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[3] +
    "<span></span></div>";
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
  // console.log("hello");
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
  let userAns = answer.textContent;
  let correctAns = questions[que_count].answer;
  let allOptions = option_list.children.length;
  if (userAns == correctAns) {
    userScore += 1;
    console.log(userScore);
    answer.classList.add("correct");
    console.log("Answer is Correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    answer.classList.add("incorrect");
    timeValue = timeValue - 30;
    console.log("Answer is Wrong");
    answer.insertAdjacentHTML("beforeend", crossIcon);
    //if answers is incorrect then automatically selected the correct answer
    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correctAns) {
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }

  //once user selected disabled all options
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.style.display = "block";
}
function showResultBox() {
  infoBox.classList.remove("activeInfo"); //hide the info box
  quizBox.classList.remove("activeQuiz"); // hide the quiz box
  result_box.classList.add("activeResult"); // show the result box
  const scoreText = result_box.querySelector(".score-text");
  if (userScore > 3) {
    let scoreTag =
      "<span>and congrats, You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag =
      "<span>and nice, You got only <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span>and sorry, You got only <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}
// functionality of timer
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time === 0 || time < 0) {
      clearInterval(startTimer);
      timeCount.textContent = "00";
    }
  }
}
//functionality of the timer line
function startTimerLine(time) {
  counterLine = setInterval(timer, 220);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px";
    if (time > 549) {
      clearInterval(counterLine);
    }
  }
}
function queCounter(index) {
  const bottom_ques_counter = quizBox.querySelector(".total-que");
  let totalQuesCountTag =
    "<span><p>" +
    index +
    "</p>of<p>" +
    questions.length +
    "</p>Questions</span>";
  bottom_ques_counter.innerHTML = totalQuesCountTag;
}

//Function to End the Game.
function endGame() {
  var userScore = scoreText;
  console.log(userScore);
  getUserInitials();
}

var getUserInitials = function () {
  userEndGameInputEl.removeAttribute("class", "hide");
};

function submitInitials() {
  // setting var of userInitials and wrote code to capture the text put into the #userInitialsInputTxtbox.
  userInitials = document.getElementById("userInitialsInputTxtBox").value;
  console.log(userInitials);
  storeUserResultsLocalStorage();
}

//Created function to move user input to local storage

var storeUserResultsLocalStorage = function () {
  localStorage.setItem("userScore", JSON.stringify(userScore));
  localStorage.setItem("userInfo", JSON.stringify(userInitials));
};
