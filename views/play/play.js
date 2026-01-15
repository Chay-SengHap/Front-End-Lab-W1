// DOM ELEMENTS
const dom_quiz = document.querySelector("#quiz");
const dom_question = document.querySelector("#question");
const dom_choiceA = document.querySelector("#A");
const dom_choiceB = document.querySelector("#B");
const dom_choiceC = document.querySelector("#C");
const dom_choiceD = document.querySelector("#D");
const dom_score = document.querySelector("#score");
const dom_start = document.querySelector("#start");
const dom_currentQuestion = document.querySelector("#current-question");
const dom_totalQuestions = document.querySelector("#total-questions");

// DATA
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

// VARIABLES
let runningQuestionIndex = 0;
let score = 0;

// HIDE / SHOW FUNCTIONS
function hide(element) {
  element.classList.add("hidden");
}

function show(element) {
  element.classList.remove("hidden");
}

// LOAD QUESTIONS FROM LOCAL STORAGE
function loadQuestion() {
  const storedQuestions = JSON.parse(localStorage.getItem("questions"));
  if (storedQuestions !== null && storedQuestions.length > 0) {
    questions = storedQuestions;
  }
}

// START QUIZ
function onStart() {
  hide(dom_start);
  hide(dom_score);
  show(dom_quiz);
  loadQuestion();
  renderQuestion();
}

// RENDER QUESTION
function renderQuestion() {
  const q = questions[runningQuestionIndex];
  dom_question.innerHTML = q.title;
  dom_choiceA.innerHTML = q.choiceA;
  dom_choiceB.innerHTML = q.choiceB;
  dom_choiceC.innerHTML = q.choiceC;
  dom_choiceD.innerHTML = q.choiceD;
  
  // Update question counter
  dom_currentQuestion.textContent = runningQuestionIndex + 1;
  dom_totalQuestions.textContent = questions.length;
}

// CHECK ANSWER
function checkAnswer(answer) {
  const q = questions[runningQuestionIndex];
  if (q.correct === answer) {
    score++;
    // Visual feedback for correct answer
    document.getElementById(answer).classList.add("bg-green-300");
  } else {
    // Visual feedback for wrong answer
    document.getElementById(answer).classList.add("bg-red-300");
    // Show correct answer
    document.getElementById(q.correct).classList.add("bg-green-300");
  }
  
  // Disable all choices after answering
  const choices = document.querySelectorAll('.choice');
  choices.forEach(choice => {
    choice.classList.remove('hover:bg-blue-200');
    choice.style.cursor = 'default';
    choice.onclick = null;
  });
  
  // Move to next question after delay
  setTimeout(() => {
    runningQuestionIndex++;
    
    if (runningQuestionIndex < questions.length) {
      // Reset choice styles
      choices.forEach(choice => {
        choice.classList.remove('bg-green-300', 'bg-red-300');
      });
      renderQuestion();
      
      // Re-enable choices
      choices.forEach(choice => {
        choice.classList.add('hover:bg-blue-200');
        choice.style.cursor = 'pointer';
        const choiceId = choice.id;
        choice.onclick = () => checkAnswer(choiceId);
      });
    } else {
      renderScore();
    }
  }, 1500);
}

// RENDER SCORE
function renderScore() {
  hide(dom_quiz);
  show(dom_score);

  let percentage = Math.round((score / questions.length) * 100);
  
  // Determine emoji based on score
  let emoji = '';
  if (percentage < 20) emoji = '../../img/20.png';
  else if (percentage >= 20 && percentage < 40) emoji = '../../img/40.png';
  else if (percentage >= 40 && percentage < 60) emoji = '../../img/60.png';
  else if (percentage >= 60 && percentage < 80) emoji = '../../img/80.png';
  else emoji = '../../img/100.png';
  
  // Determine message based on score
  let message = '';
  if (percentage < 40) message = "Better luck next time!";
  else if (percentage < 70) message = "Good job!";
  else if (percentage < 90) message = "Excellent!";
  else message = "Perfect! You're a genius!";

  dom_score.innerHTML = `
    <div class="bg-white p-10 rounded-2xl shadow-2xl max-w-2xl">
      <h1 class="text-4xl font-bold mb-8 text-blue-600">Quiz Completed!</h1>
      
      <img src="${emoji}" alt="Score Emoji" class="mx-auto mb-6 w-48 h-48" />
      
      <div class="text-6xl font-bold mb-4 ${percentage < 50 ? 'text-red-500' : 'text-green-500'}">
        ${percentage}%
      </div>
      
      <p class="text-2xl mb-2">${message}</p>
      <p class="text-xl text-gray-600 mb-8">
        You scored ${score} out of ${questions.length} questions
      </p>
      
      <div class="flex gap-4 justify-center">
        <button onclick="restartQuiz()" class="bg-blue-500 text-white px-8 py-3 rounded-lg text-xl hover:bg-blue-600 transition">
          Restart Quiz
        </button>
        <button onclick="goToEdit()" class="bg-orange-400 text-white px-8 py-3 rounded-lg text-xl hover:bg-orange-500 transition">
          Edit Questions
        </button>
      </div>
    </div>
  `;
}

// RESTART QUIZ
function restartQuiz() {
  runningQuestionIndex = 0;
  score = 0;
  hide(dom_score);
  show(dom_start);
}

// GO TO EDIT PAGE
function goToEdit() {
  window.location.href = "../edit/edit.html";
}

// INITIALIZE
function init() {
  // Add event listener to start button
  dom_start.addEventListener("click", onStart);
  
  // Set total questions
  dom_totalQuestions.textContent = questions.length;
  
  // Hide quiz and score screens initially
  hide(dom_quiz);
  hide(dom_score);
  show(dom_start);
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', init);