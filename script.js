const questionElement = document.getElementById('question');
const timeElement = document.getElementById('time');
const trueButton = document.getElementById('trueButton');
const falseButton = document.getElementById('falseButton');
const quizContainer = document.querySelector('.quiz-container');
const divTimer = document.getElementById('timer');

let score = document.getElementById('score');
let scoreIn = 0;

let questionIndex = 0;
//une bonne réponse = un point
// let score = 0;

let timerInterval; // stocke l'ID de l'intervalle du minuteur

//ici, on mettra les 30 questions dans un tab :
const questions = [
    { question: "Est-ce que la Terre est plate ?", answer: false },
    { question: "Est-ce que l'eau bout à 100 degrés Celsius ?", answer: true },
    { question: "Est-ce que la Terre est plate ?", answer: false }
];

console.log(questions[0].answer);

//fonction du timer
function startTimer() {
    let timeLeft = 10;
    timeElement.textContent = timeLeft;
    timerInterval = setInterval(function() {
        timeLeft--;
        timeElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showCorrectAnswer(); //Montrera la bonne réponse
            questionIndex++;
            setTimeout(showQuestion, 1000);
            //laisser l'user cliquer sur qst suivante
        }
    }, 1000);
}

//afficher le bonne réponse
function showCorrectAnswer() {
    const reponseQuest = questions[questionIndex].answer;
    if (reponseQuest) {
        trueButton.classList.add('correct');
        falseButton.classList.add('incorrect');
    } else {
        falseButton.classList.add('correct');
        trueButton.classList.add('incorrect');
    }
}

//showQuestion = montrera les questions (sans random - c'est en ordre)
function showQuestion() {
    isAnswered = false; //Réinitialisera isAnswered
    resetButtonColors(); //Réinitialisera les couleurs des boutons
    clearInterval(timerInterval);
    if (questionIndex < questions.length) {
        questionElement.textContent = `Question ${questionIndex + 1} : ${questions[questionIndex].question}`;
        startTimer();
    } else {
        questionElement.textContent = "Quiz terminé!";
        trueButton.style.display = 'none'; //masque le bouton Vrai
        falseButton.style.display = 'none'; //masque le bouton Faux
        divTimer.style.display ='none'; //masque le timer
        nextButton.style.display ='block'; //masque le timer

    }
}

function resetButtonColors() {
    trueButton.classList.remove('correct');
    trueButton.classList.remove('incorrect');
    falseButton.classList.remove('correct');
    falseButton.classList.remove('incorrect');
}

let isAnswered = false;

trueButton.addEventListener('click', function() {
    if (!isAnswered && questionIndex < questions.length) {
        isAnswered = true;
        if (questions[questionIndex].answer) {
            trueButton.classList.add('correct');
            scoreIn++; // Augmentera le score en cas de bonne réponse
            score.textContent = scoreIn; // MAJ le score affiché
        } else {
            trueButton.classList.add('incorrect');
            setTimeout(function(){
                falseButton.classList.add('correct'); // Mettra en vert le bouton avec la bonne réponse
            },1000);
        }
        questionIndex++;
        setTimeout(showQuestion, 2000);
    }
});

falseButton.addEventListener('click', function() {
    if (!isAnswered && questionIndex < questions.length) {
        isAnswered = true;
        if (!questions[questionIndex].answer) {
            falseButton.classList.add('correct');
            scoreIn++; //Augmentera le score en cas de bonne réponse
            score.textContent = scoreIn; //MAJ le score affiché
        } else {
            falseButton.classList.add('incorrect');
            setTimeout(function(){
                trueButton.classList.add('correct'); // Mettre en vert le bouton avec la bonne réponse
            }, 1000);
        }
        questionIndex++;
        setTimeout(showQuestion, 2000); //temps pour que l'user voir la couleur des boutons
    }
});

showQuestion();
