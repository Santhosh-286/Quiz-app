const questions = [
  {
    question:
      "Which of the following is used to declare a variable in JavaScript?",
    answer: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
  {
    question: "What is the correct way to write a comment in JavaScript?",
    answer: [
      { text: "/* This is a comment */", correct: false },
      { text: "// This is a comment", correct: true },
      { text: "<-- This is a comment --!>", correct: false },
      { text: "** This is a comment **", correct: false },
    ],
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    answer: [
      { text: "=", correct: true },
      { text: "==", correct: false },
      { text: "===", correct: false },
      { text: "=>", correct: false },
    ],
  },
  {
    question: "What will 'typeof []' return in JavaScript?",
    answer: [
      { text: "object", correct: true },
      { text: "array", correct: false },
      { text: "list", correct: false },
      { text: "undefined", correct: false },
    ],
  },
  {
    question: "Which method is used to print something on the console?",
    answer: [
      { text: "print()", correct: false },
      { text: "log()", correct: false },
      { text: "console.log()", correct: true },
      { text: "display()", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("nxt-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  const finalBg = document.getElementById("congrats-bg");
  finalBg.style.backgroundImage = "url('./Congratulations.gif')";
  finalBg.style.display = "block";
  questionElement.innerHTML = `Congratualations..!<br>Your score: ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
