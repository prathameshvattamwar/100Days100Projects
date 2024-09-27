const quizData = [
  {
    question: "What is the capital of France?",
    a: "Berlin",
    b: "Madrid",
    c: "Paris",
    d: "Lisbon",
    correct: "c",
  },
  {
    question: "Who is the President of the United States?",
    a: "Donald Trump",
    b: "Barack Obama",
    c: "Joe Biden",
    d: "George Bush",
    correct: "c",
  },
  {
    question: "What is 2 + 2?",
    a: "3",
    b: "4",
    c: "5",
    d: "6",
    correct: "b",
  },
  {
    question: "Which is the largest planet in our solar system?",
    a: "Earth",
    b: "Mars",
    c: "Jupiter",
    d: "Saturn",
    correct: "c",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    a: "Harper Lee",
    b: "J.K. Rowling",
    c: "Ernest Hemingway",
    d: "Mark Twain",
    correct: "a",
  },
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
  answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
  let answer;
  answerEls.forEach(answerEl => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

submitBtn.addEventListener('click', () => {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `
        <h2>You answered ${score}/${quizData.length} questions correctly</h2>
        <button id="reload">Reload</button>
      `;

      // Add an event listener to the newly created reload button
      const reloadBtn = document.getElementById('reload');
      reloadBtn.addEventListener('click', () => {
        window.location.reload();
      });
    }
  }
});

