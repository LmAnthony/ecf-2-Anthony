// Function qui va permettre de faire apparaître un bouton que lorsque l'on clique dessus
// va renvoyez vers le point le plus haut de la page fluidement.
$(function() {
  $('body').append("<div id='scrolltop'><i class='fas fa-caret-square-up fa-3x'></i></div>");
  $('#scrolltop').css({
    'position': 'fixed',
    'width': '35px',
    'height': '35px',
    'bottom': '50px',
    'right': '50px',
    'display': 'none'
  });
  $(window).scroll(function() {
    if ($(window).scrollTop() < 350) {
      $('#scrolltop').fadeOut();
    } else {
      $('#scrolltop').fadeIn();
    }
  });

  $('#scrolltop').click(function() {
    $('html, body').animate({
      scrollTop: '0'
    }, 'slow');
  });
});



// ------------------------------------------ QUZzzzzzzZZZZZzzzzz ------------------------------------------------
/* Ce script va permettre de crée un Quiz avec un 4 questions en proposant 3 réponses.
Les réponses de l'utilisateurs vont être prit en compte et la function va calculer le nombre de réponses fausses et justes.
Dès que le bouton start est appuyer, le lancement du quiz se fait et les questions apparaisse.
Le bouton NEXT va permettre à l'utilisateur (après avoir choisis une réponse) de passer à la prochaine question, et ainsi de suite...
Pour terminer, quand l'utilisateur à finit le QUIZ, une correction s'effectue en donnant les mauvaises et/ou les bonnes réponses correctement.
*/


var quiz = [{ // QUESTION REPONSES
  question: "En quelle année Buster Keaton se lance dans le cinéma ?",
  answers: ["1915", "1917", "1922"],
  correctAnswer: 1
}, {
  question: "Il obtient son premier grand rôle, dans :",
  answers: ["La maison démontable", "Frigo déménageur", "Frigo à l’Electric Hotel"],
  correctAnswer: 0
}, {
  question: "Quel était son surnom ?",
  answers: ["L’homme qui ne rit jamais", "Le clown triste", "L’artiste burlesque"],
  correctAnswer: 0
}, {
  question: "A partir de quand sa carrière décline ?",
  answers: ["Les années 20", "Les années 30", "Les années 40"],
  correctAnswer: 1
}, {
  question: "Comment reconnait-on Lloyd ?",
  answers: ["Son costume 3 pièces", "Son canotier et ses lunettes", "Son cigare"],
  correctAnswer: 1
}, {
  question: "En quelle année est-il né ?",
  answers: ["1893", "1898", "1900"],
  correctAnswer: 0
}, {
  question: "En quelle année est-il au sommet de sa carrière ?",
  answers: ["1921", "1923", "1929"],
  correctAnswer: 1
}, {
  question: "Quel est son film le plus célèbre ?",
  answers: ["Monte la haut", "Monte là-dessus", "Descend par là"],
  correctAnswer: 1
}] // QUESTION REPONSES


// VAR
var i = 0;
var score = 0;


// FUNCTION POUR LE CLICK DE START ET AJOUT DE TEXTES
$(document).ready(function() {
  $('#start').on('click', function() { // #start = bouton START function ON CLICK
    $('#questions').text(quiz[i].question); // #questions = Questions du Quiz qui apparaissent
    $('#zero').text(quiz[i].answers[0]); // #zero = premiere réponse
    $('#one').text(quiz[i].answers[1]); // #one = deuxieme réponse
    $('#two').text(quiz[i].answers[2]); // #two = troisieme réponse
    $('#start').remove(); // #start = bouton START, on le retire
    $('.choices').show('slow'); // .start = les choix (les réponses) qui arrive en slow et se montre
    $('#next').show('slow'); // #next = Suivant, il arrive aussi en slow et se montre
  });
}); // Fin

// FUNCTION DU CLICK DU BOUTON NEXT (SUIVANT)
$(document).ready(function() {
  $(document).on('click', '#next', function() { // ON CLICK SUR LE NEXT
    var answer = $('input[name="answers"]:checked').val(); //
    var answerString = quiz[i].answers[answer]; // création variable pour la réponse select par l'utilisateur
    $('p[class="userAnswer"][value=' + i + ']').text(answerString); // Dans les résultats (fin du quiz) ça affiche la réponse que l'utilisateur à choisit
    var correctAnswer = quiz[i].correctAnswer; // création variable pour la VRAI réponse
    $('p[class="correctAnswer"][value=' + i + ']').text(quiz[i].answers[correctAnswer]); // Dans les résultats (fin du quiz) ça affiche la BONNE réponse
    if (answer == quiz[i].correctAnswer) {// En fonction des bonnes réponses que l'utilisateur à fait, il incrémente
      score++;
    } else {
      $('div[class="wrong"][name=' + i + ']').css('background', '#FE2E64'); // Mets en évidence les mauvaises réponses à la fin du quiz (en rouge Background)
    }
    if (!$('input[name="answers"]').is(':checked')) { // Function pour vérifier si l'utilisateur à bien choisit une réponse
      alert("Prenez votre souris en main et cliquer sur une des réponses au hasard si vous ne savez pas ?");
      return undefined; // Arrête d'exécuter le reste du code
    }
    i++;

    if (i < 8) { // CETTE FUNCTION Vérifie s'il y a bien 4 questions de répondu
      $('.choices').css('display', 'none'); // ON RETIRE LES CHOIX
      $('#questions').text(quiz[i].question);
      $('#zero').text(quiz[i].answers[0]);
      $('#one').text(quiz[i].answers[1]);
      $('#two').text(quiz[i].answers[2]);
      $('.choices').show('slow');
      $('input[name="answers"]').prop('checked', false);

    }
    if (i > 7) {
      $('#quiz').remove();
      $('#score').text("Ton score est de : " + score + " C'était potable");
      $('#results').fadeIn('fast');
    }


  });
});
