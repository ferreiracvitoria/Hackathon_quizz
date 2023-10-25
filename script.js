const questionElement = document.getElementById('question');
const timeElement = document.getElementById('time');
const trueButton = document.getElementById('trueButton');
const falseButton = document.getElementById('falseButton');
const quizContainer = document.querySelector('.quiz-container');

let questionIndex = 0;
let timeLeft = 10;
const questions = [
    { question: "Est-ce que la Terre est plate ?", answer: false },
    { question: "Est-ce que l'eau bout à 100 degrés Celsius ?", answer: true }
];

function showQuestion() {
    if (questionIndex < questions.length) {
        questionElement.textContent = `Question ${questionIndex + 1} : ${questions[questionIndex].question}`;
        timeLeft = 10;
        timeElement.textContent = timeLeft;
        startTimer();
        resetButtonColors();
    } else {
        // Rediriger vers "end.html" lorsque le quiz est terminé
        window.location.href = "end.html";
    }
}

function startTimer() {
    const timerInterval = setInterval(function() {
        timeLeft--;
        timeElement.textContent = timeLeft;
        if (timeLeft == 0) {
            clearInterval(timerInterval);
            questionIndex++;
            showQuestion();
        }
    }, 1000);
}

function resetButtonColors() {
    trueButton.classList.remove('correct');
    falseButton.classList.remove('incorrect');
}

trueButton.addEventListener('click', function() {
    if (questionIndex < questions.length) {
        if (questions[questionIndex].answer) {
            trueButton.classList.add('correct');
        } else {
            falseButton.classList.add('incorrect');
            showMessage("Réponse incorrecte");
        }
        questionIndex++;
        showQuestion();
    }
});

falseButton.addEventListener('click', function() {
    if (questionIndex < questions.length) {
        if (!questions[questionIndex].answer) {
            falseButton.classList.add('correct');
        } else {
            trueButton.classList.add('incorrect');
            showMessage("Réponse incorrecte");
        }
        questionIndex++;
        showQuestion();
    }
});

function showMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    quizContainer.appendChild(messageElement);
    setTimeout(() => {
        quizContainer.removeChild(messageElement);
    }, 2000); // Supprime le message après 2 secondes
}

showQuestion();
