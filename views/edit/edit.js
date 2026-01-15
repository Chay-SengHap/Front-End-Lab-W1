// DOM ELEMENTS
const dialog = document.getElementById("questions-dialog");
const container = document.getElementById("questions-container");
const dialogTitle = document.getElementById("dialog-title");
const createEditBtn = document.getElementById("createEditBtn");

const titleInput = document.getElementById("title");
const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");
const choiceC = document.getElementById("choiceC");
const choiceD = document.getElementById("choiceD");
const correct  = document.getElementById("answer");

// DATA
let questions = JSON.parse(localStorage.getItem("questions")) || [
  {
    title: "What does HTML stand for?",
    choiceA: "Hi Thierry More Laugh",
    choiceB: "How To Move Left",
    choiceC: "Ho Theary Missed Laundry",
    choiceD: "HyperText Markup Language",
    correct: "D",
  },
];

let questionToEdit = null;

// UTIL
function show(el) { el.classList.remove("hidden"); }
function hide(el) { el.classList.add("hidden"); }

function saveQuestions() {
  localStorage.setItem("questions", JSON.stringify(questions));
}

function clearInputs() {
  titleInput.value = "";
  choiceA.value = "";
  choiceB.value = "";
  choiceC.value = "";
  choiceD.value = "";
  correct.value = ""
}

// RENDER
function renderQuestions() {
  container.innerHTML = "";

  questions.forEach((q, index) => {
    const card = document.createElement("div");
    card.className =
      "bg-white p-4 rounded-xl shadow flex justify-between items-center";

    card.innerHTML = `
      <span class="font-medium">${q.title}</span>
      <div class="flex gap-3">
        <button onclick="editQuestion(${index})"
          class="text-blue-500 font-semibold"><img src="../../img/edit.svg" class="h-8" alt=""></button>
        <button onclick="removeQuestion(${index})"
          class="text-red-500 font-semibold"><img src="../../img/trash.png" class="h-8" alt=""></button>
      </div>
    `;

    container.appendChild(card);
  });
}

// ACTIONS
function onAddQuestion() {
  questionToEdit = null;
  dialogTitle.textContent = "Create Question";
  createEditBtn.textContent = "Create";
  clearInputs();
  show(dialog);
}

function editQuestion(index) {
  questionToEdit = index;
  const q = questions[index];

  titleInput.value = q.title;
  choiceA.value = q.choiceA;
  choiceB.value = q.choiceB;
  choiceC.value = q.choiceC;
  choiceD.value = q.choiceD;

  dialogTitle.textContent = "Edit Question";
  createEditBtn.textContent = "Save";
  show(dialog);
}

function removeQuestion(index) {
  questions.splice(index, 1);
  saveQuestions();
  renderQuestions();
}

function onCancel() {
  hide(dialog);
  clearInputs();
}

function onCreate() {
  const data = {
    title: titleInput.value,
    choiceA: choiceA.value,
    choiceB: choiceB.value,
    choiceC: choiceC.value,
    choiceD: choiceD.value,
    correct: "A",
  };

  if (questionToEdit !== null) {
    questions[questionToEdit] = data;
  } else {
    questions.push(data);
  }

  saveQuestions();
  renderQuestions();
  hide(dialog);
  clearInputs();
}

// INIT
renderQuestions();
