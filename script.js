const questionElement = document.getElementById('question');
const timeElement = document.getElementById('time');
const trueButton = document.getElementById('trueButton');
const falseButton = document.getElementById('falseButton');
const quizContainer = document.querySelector('.quiz-container');

let score = document.getElementById('scoreInit');
let scoreIn = 0;

let questionIndex = 0;
//une bonne réponse = un point
// let score = 0;

let timerInterval; // stocke l'ID de l'intervalle du minuteur

//ici, on mettra les 30 questions dans un tab :
const questions = [
    { question: "Est-ce que la Terre est plate ?", answer: false },
    { question: "Est-ce que l'eau bout à 100 degrés Celsius ?", answer: true },
    { question: "Est-ce que la Terre est plate ?", answer: false },
    { question: "Est-ce que l'eau bout à 100 degrés Celsius ?", answer: true },
    { question: "Est-ce que la Terre est plate ?", answer: false },
    { question: "Est-ce que l'eau bout à 100 degrés Celsius ?", answer: true },
    { question: "Est-ce que la Terre est plate ?", answer: false },
    { question: "Est-ce que l'eau bout à 100 degrés Celsius ?", answer: true },
    { question: "Est-ce que la Terre est plate ?", answer: false },
    { question: "Est-ce que l'eau bout à 100 degrés Celsius ?", answer: true },
    { question: "Est-ce que la Terre est plate ?", answer: false },
    { question: "Est-ce que l'eau bout à 100 degrés Celsius ?", answer: true },
    { question: "Est-ce que la Terre est plate ?", answer: false },
    { question: "Est-ce que l'eau bout à 100 degrés Celsius ?", answer: true },
];

console.log(questions[0].answer);

//fonction du timer
function startTimer() {
    let timeLeft = 10;
    timeElement.textContent = timeLeft;
    timerInterval = setInterval(function() {
        timeLeft--;
        timeElement.textContent = timeLeft;
        if (timeLeft == 0) {
            clearInterval(timerInterval);
            showCorrectAnswer(questionIndex); //montrer la bonne réponse : vrai ou faux
            questionIndex++;
            showQuestion();

            //laisser l'user cliquer sur qst suivante
        }
    }, 1000);
}

//afficher le bonne réponse
function showCorrectAnswer(questionIndex) {
    const reponseQuest= questions[questionIndex].answer;
    alert('la bonne réponse est ' + reponseQuest);
}

//showQuestion = montrera les questions (sans random - c'est en ordre)
function showQuestion() {
    setTimeout(resetButtonColors,1000);
    clearInterval(timerInterval);
    if (questionIndex < questions.length) {
        questionElement.textContent = `Question ${questionIndex + 1} : ${questions[questionIndex].question}`;
        startTimer();
    } else {
        questionElement.textContent = "Quiz terminé!";
    }
}

function resetButtonColors() {
    trueButton.classList.remove('correct');
    trueButton.classList.remove('incorrect');
    falseButton.classList.remove('correct');
    falseButton.classList.remove('incorrect');
}

trueButton.addEventListener('click', function() {
    if (questionIndex < questions.length) {
        if (questions[questionIndex].answer) {
            trueButton.classList.add('correct');
            score.textContent = scoreIn;
            scoreIn++;
        } else {
            falseButton.classList.add('incorrect');
        }
        questionIndex++;
        showQuestion();
    }
});

falseButton.addEventListener('click', function() {
    if (questionIndex < questions.length) {
        if (!questions[questionIndex].answer) {
            falseButton.classList.add('incorrect');
        } else {
            trueButton.classList.add('correct');
        }
        questionIndex++;
        showQuestion();
    }
});



showQuestion();
