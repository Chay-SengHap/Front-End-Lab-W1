// DOMS ELEMENTS  ---------------------------------------------------------
const dom_quiz = document.querySelector("#quiz");
const dom_question = document.querySelector("#question");
const dom_choiceA = document.querySelector("#A");
const dom_choiceB = document.querySelector("#B");
const dom_choiceC = document.querySelector("#C");
const dom_choiceD = document.querySelector("#D");
const dom_score = document.querySelector("#score");
const dom_start = document.querySelector("#start");

dom_start.addEventListener("click", onStart);

// DATA  ---------------------------------------------------------
let questions = [
  {
    title: "What does HTML stand for?",
    choiceA: "Hi Thierry More Laught",
    choiceB: "How To move Left",
    choiceC: "Ho Theary Missed the Laundry !",
    choiceD: "Hypertext Markup Language",
    correct: "D",
  },
  {
    title: "What does CSS stand for?",
    choiceA: "Cisco and Super Start",
    choiceB: "Ci So Sa",
    choiceC: "Cascading Style Sheets ",
    choiceD: "I don't know !",
    correct: "C",
  },
  {
    title: "What does JS stand for?",
    choiceA: "Junior stars",
    choiceB: "Justing Star",
    choiceC: "Javascript",
    choiceD: "RonanScript",
    correct: "C",
  },
];
let runningQuestionIndex = 0;
let score = 0;

// FUNCTIONS ---------------------------------------------------------

// Hide a given element
function hide(element) {
  // TODO
  element.style.display = 'none'
}

function show(element) {
  // TODO
  element.style.display =  "block"
}

function onStart() {
  hide(dom_start)
  // Render the current question
  show(dom_quiz)
  renderQuestion();
  
  
  // Display the quiz view,

}

function renderQuestion() {
  // Render the current question on the quiz view

    dom_question.innerHTML = questions[runningQuestionIndex].title;
    dom_choiceA.innerHTML = questions[runningQuestionIndex].choiceA;
    dom_choiceB.innerHTML = questions[runningQuestionIndex].choiceB;
    dom_choiceC.innerHTML = questions[runningQuestionIndex].choiceC;
    dom_choiceD.innerHTML = questions[runningQuestionIndex].choiceD;
  
}

function checkAnswer(answer) {
  // Update the score, display the next question or the score view
  if(questions[runningQuestionIndex].correct === answer){
    score++;
  }
  runningQuestionIndex++;
  
  
  if(runningQuestionIndex < questions.length) renderQuestion();
  else {renderScore()};

}

function renderScore() {
  // calculate the amount of question percent answered by the user
  // choose the image based on the scorePerCent
  hide(dom_quiz)
  show(dom_score)
  let percentageOfAnswer = Math.round((score / questions.length) * 100)

  let emoji = "";
  if(percentageOfAnswer < 20) emoji = "img/20.png"
  else if (percentageOfAnswer >=20 && percentageOfAnswer <40 ) emoji = 'img/40.png'
  else if (percentageOfAnswer >=40 && percentageOfAnswer <60 ) emoji = 'img/60.png'
  else if (percentageOfAnswer >=60 && percentageOfAnswer <80 ) emoji = 'img/80.png'
  else if (percentageOfAnswer>= 80) emoji = 'img/'
  

  dom_score.innerHTML = `<img src=${emoji} alt="">
  <p>Score Percentage : ${percentageOfAnswer}% </p>`

}

// FUNCTIONS ---------------------------------------------------------
show(dom_start);
hide(dom_quiz);
hide(dom_score)

