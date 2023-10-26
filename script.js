const questionElement = document.getElementById('question');
const timeElement = document.getElementById('time');
const trueButton = document.getElementById('trueButton');
const falseButton = document.getElementById('falseButton');
const quizContainer = document.querySelector('.quiz-container');
const questionImageElement = document.getElementById('questionImage');

let questionIndex = 0;
let timeLeft = 10;
const questions = [
    { question: "1. Est-ce que le langage de programmation Python tire son nom du serpent reptile ?", answer: false },
    { question: "2.	L'HTML est un langage de programmation utilisé pour la création de sites web ?", answer: false },
    { question: "3. Le code ci-dessus va s'exécuter sans erreur ?", answer: false, image:"./assets/images/image1.png"},
    { question: "4.	Le langage de programmation C++ est une extension du langage C ?", answer: true},
    { question: "5.	Le SQL est un langage de programmation utilisé pour la gestion des bases de données ?", answer: true},
    { question: "6. Le code ci-dessus va s'exécuter sans erreur ?", answer: false, image:"./assets/images/image2.png"},
    { question: "7. Le 'phishing' est une technique de piratage visant à voler des informations personnelles en se faisant passer pour une entité de confiance ?", answer: true},
    { question: "8.	Le protocole IPv6 a été développé pour pallier la pénurie d'adresses IP ?", answer: true},
    { question: "9. Le code ci-dessus va s'exécuter sans erreur ?", answer: false, image:"./assets/images/image3.png"},
    { question: "10. Le langage de programmation JavaScript est identique à Java ?", answer: false},
    { question: "11. L'API (Application Programming Interface) permet la communication entre différentes applications ?", answer: true},
    { question: "12. Le code ci-dessus va s'exécuter sans erreur ?", answer: false, image:"./assets/images/image4.png"},
    { question: "13. L'IA (intelligence artificielle) se réfère à des systèmes informatiques capables de penser et de ressentir comme des êtres humains ?", answer: false},
    { question: "14. Un algorithme est une séquence d'instructions qui décrit comment effectuer une tâche ?", answer: true},
    { question: "15. Le code ci-dessus va s'exécuter sans erreur ?", answer: false, image:"./assets/images/image5.png"},
    { question: "16. Les boucles permettent d'exécuter une série d'instructions plusieurs fois ?", answer: true},
    { question: "17. Les algorithmes sont des séquences d'instructions permettant de résoudre un problème ?", answer: true},
    { question: "18. En JavaScript, === est un opérateur d'égalité strict ?", answer: true, image:"./assets/images/image6.png"},
    { question: "19. Le langage de programmation Go a été développé par Google ?", answer: true},
    { question: "20. Le programme qui rectifie les erreurs commises par le programmeur est le compilateur ?", answer: true},
    { question: "21. Le code Python ci-dessus vérifie si un nombre est pair et stocke le résultat dans la variable 'resultat' ?", answer: true, image:"./assets/images/image7.png"},
    { question: "22. Les commentaires en programmation sont ignorés par le compilateur ou l'interpréteur ?", answer: true},
    { question: "23. Javascript est un langage front uniquement ?", answer: false},
    { question: "24. Est-ce du Python ?", answer: true, image:"./assets/images/image8.png"},
    { question: "25. Python est un langage de haut niveau ?", answer: true},
    { question: "26. L'assembleur est langage de bas niveau ?", answer: true},
    { question: "27. XAML est un langage de front uniquement ?", answer: true},
    { question: "28. Est-ce du PHP ?", answer: true, image:"./assets/images/image9.png"},
    { question: "29. Les variables en programmation sont des conteneurs qui stockent des valeurs ?", answer: true},
    { question: "30. Les fonctions en programmation permettent de regrouper des instructions réutilisables ?", answer: true},
    { question: "31. Programmer une boucle infinie est une bonne pratique ?", answer: false},
    { question: "32. Le programme rentre dans un If quand la condition du if est vraie ?", answer: true},
    { question: "33. Les indices d'une séquence de 5 éléments sont : '1 2 3 4 5' ?", answer: false},
    { question: "34. Dans le cas d'envoi d'informations plus ou moins sensibles par formulaire, on utilisera de préférence la méthode get plutôt que la méthode post ?", answer: false},
    //{ question: "35. ", answer: // , image:""}, // ajouter question de hier
    // { question: "36. ", answer: // , image:""}, // ajouter question de hier 
    { question: "37. Cette syntaxe est correcte.", answer: true, image:"./assets/images/image_qu37.jpg"},
    { question: "38. Cette syntaxe est correcte.", answer: false, image:"./assets/images/image_qu38.png"},
    { question: "39. La syntaxe de cette ligne est correcte.", answer: true, image:"./assets/images/image_qu39.png"},
    { question: "40. La syntaxe de cette ligne est correcte.", answer: false, image:"./assets/images/image_qu40.png"},
    { question: "41. Ceci est du c#", answer: false, image:"./assets/images/image_qu41.png"},
    { question: "42. la variable m vaudra -15 à la fin de ce programme.", answer: true, image:"./assets/images/image_qu42.png"},
    { question: "43. Ceci est du Javascript.", answer: false, image:"./assets/images/image_qu43.png"},
    { question: "44. Voici un tableau. On accède au 1ier élément du tableau, chien, comme ceci: $tableau=[1]", answer: false, image:"./assets/images/image_qu44.png"},
    { question: "45. La boucle  ci-dessous sera exécutée 4 fois", answer: true, image:"./assets/images/image_qu45.png"},
    { question: "46. La dernière valeur affichée par ce programme est 20.", answer: false, image:"./assets/images/image_qu46.png"}
    










];




function showQuestion() {
    if (questionIndex < questions.length) {
        questionElement.textContent = `Question ${questionIndex + 1} : ${questions[questionIndex].question}`;
        // Modifier l'image et la question en fonction de l'index actuel
        const currentQuestion = questions[questionIndex];
        questionElement.innerHTML = currentQuestion.question;
        if (currentQuestion.image) {
            // S'il y a une image associée à la question, l'ajouter
            questionImageElement.src = currentQuestion.image;
            questionImageElement.style.display = "block"; // Pour afficher l'image
        } else {
            // S'il n'y a pas d'image associée, cacher l'élément image
            questionImageElement.style.display = "none";
        }
        timeLeft = 10;
        timeElement.textContent = timeLeft;
        startTimer();
        resetButtonColors();
    } else {
        questionElement.textContent = "Quiz terminé!";
    }
}

function startTimer() {
    const timerInterval = setInterval(function() {
        timeLeft--;
        timeElement.textContent = timeLeft;
        if (timeLeft === 0) {
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
