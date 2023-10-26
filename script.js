const questionElement = document.getElementById('question');
const timeElement = document.getElementById('time');
const trueButton = document.getElementById('trueButton');
const falseButton = document.getElementById('falseButton');
const quizContainer = document.querySelector('.quiz-container');
const questionImageElement = document.getElementById('questionImage');
const divTimer = document.getElementById('timer');
const rejouer = document.getElementById('rejouerbtn');

//une bonne réponse = un point
let score = document.getElementById('score');
let scoreIn = 0;

let questionIndex = 0;

let timerInterval; // stocke l'ID de l'intervalle du minuteur

//ici, on mettra les 30 questions dans un tab :
const questions = [
    { question: "Est-ce que le langage de programmation Python tire son nom du serpent reptile ?", answer: false },
    { question: "L'HTML est un langage de programmation utilisé pour la création de sites web ?", answer: false },
    { question: "Le code ci-dessus va s'exécuter sans erreur ?", answer: false, image:"./assets/images/image1.png"},
    { question: "Le langage de programmation C++ est une extension du langage C ?", answer: true},
    { question: "Le SQL est un langage de programmation utilisé pour la gestion des bases de données ?", answer: true},
    { question: "Le code ci-dessus va s'exécuter sans erreur ?", answer: false, image:"./assets/images/image2.png"},
    { question: "Le 'phishing' est une technique de piratage visant à voler des informations personnelles en se faisant passer pour une entité de confiance ?", answer: true},
    { question: "Le protocole IPv6 a été développé pour pallier la pénurie d'adresses IP ?", answer: true},
    { question: "Le code ci-dessus va s'exécuter sans erreur ?", answer: false, image:"./assets/images/image3.png"},
    { question: "Le langage de programmation JavaScript est identique à Java ?", answer: false},
    { question: "L'API (Application Programming Interface) permet la communication entre différentes applications ?", answer: true},
    { question: "Le code ci-dessus va s'exécuter sans erreur ?", answer: false, image:"./assets/images/image4.png"},
    { question: "Un algorithme est une séquence d'instructions qui décrit comment effectuer une tâche ?", answer: true},
    { question: "Le code ci-dessus va s'exécuter sans erreur ?", answer: false, image:"./assets/images/image5.png"},
    { question: "Les boucles permettent d'exécuter une série d'instructions plusieurs fois ?", answer: true},
    { question: "Les algorithmes sont des séquences d'instructions permettant de résoudre un problème ?", answer: true},
    { question: "En JavaScript, === est un opérateur d'égalité strict ?", answer: true, image:"./assets/images/image6.png"},
    { question: "Le langage de programmation Go a été développé par Google ?", answer: true},
    { question: "Le programme qui rectifie les erreurs commises par le programmeur est le compilateur ?", answer: true},
    { question: "Le code Python ci-dessus vérifie si un nombre est pair et stocke le résultat dans la variable 'resultat' ?", answer: true, image:"./assets/images/image7.png"},
    { question: "Les commentaires en programmation sont ignorés par le compilateur ou l'interpréteur ?", answer: true},
    { question: "Javascript est un langage front uniquement ?", answer: false},
    { question: "Est-ce du Python ?", answer: true, image:"./assets/images/image8.png"},
    { question: "Python est un langage de haut niveau ?", answer: true},
    { question: "L'assembleur est langage de bas niveau ?", answer: true},
    { question: "XAML est un langage de front uniquement ?", answer: true},
    { question: "Est-ce du PHP ?", answer: true, image:"./assets/images/image9.png"},
    { question: "Les variables en programmation sont des conteneurs qui stockent des valeurs ?", answer: true},
    { question: "Les fonctions en programmation permettent de regrouper des instructions réutilisables ?", answer: true},
    { question: "Programmer une boucle infinie est une bonne pratique ?", answer: false},
    { question: "Le programme rentre dans un If quand la condition du if est vraie ?", answer: true},
    { question: "Les indices d'une séquence de 5 éléments sont : '1 2 3 4 5' ?", answer: false},
    { question: "Dans le cas d'envoi d'informations plus ou moins sensibles par formulaire, on utilisera de préférence la méthode get plutôt que la méthode post ?", answer: false},
    { question: "Cette syntaxe est correcte.", answer: false, image:"./assets/images/image_qu38.jpg"},
    { question: "La syntaxe de cette ligne est correcte.", answer: true, image:"./assets/images/image_qu39.jpg"},
    { question: "La syntaxe de cette ligne est correcte.", answer: false, image:"./assets/images/image_qu40.jpg"},
    { question: "Ceci est du c#", answer: false, image:"./assets/images/image_qu41.jpg"},
    { question: "La variable m vaudra -15 à la fin de ce programme.", answer: true, image:"./assets/images/image_qu42.jpg"},
    { question: "Ceci est du Javascript.", answer: false, image:"./assets/images/image_qu43.jpg"},
    { question: "Voici un tableau. On accède au 1ier élément du tableau, chien, comme ceci: $tableau=[1]", answer: false, image:"./assets/images/image_qu44.jpg"},
    { question: "La boucle ci-dessous sera exécutée 4 fois", answer: true, image:"./assets/images/image_qu45.jpg"},
    { question: "La dernière valeur affichée par ce programme est 20.", answer: false, image:"./assets/images/image_qu46.jpg"}
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
    startTimer();

    if (questionIndex < questions.length) {
        questionElement.textContent = `Question ${questionIndex + 1}/${questions.length} : ${questions[questionIndex].question}`;
        //Question avec image
        const currentQuestion = questions[questionIndex];
        // questionElement.innerHTML = currentQuestion.question;
        if (currentQuestion.image) {
            // S'il y a une image associée à la question, l'ajouter
            questionImageElement.src = currentQuestion.image;
            questionImageElement.style.display = "block"; // Pour afficher l'image
        } else {
            // S'il n'y a pas d'image associée, cacher l'élément image
            questionImageElement.style.display = "none";
        }



    } else {
        questionElement.textContent = "TERMINÉ";
        questionElement.style.fontFamily = "ocr";
        questionElement.style.fontSize = "2rem";
        questionElement.style.marginTop = "1rem";
        questionElement.style.color = "#1d1736";
        
        rejouer.style.display = 'flex';
        trueButton.style.display = 'none'; //masque le bouton Vrai
        falseButton.style.display = 'none'; //masque le bouton Faux
        divTimer.style.display ='none'; //masque le timer
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