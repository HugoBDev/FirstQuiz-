
import config from './config.js';
import Tmdb from './tmdb.js';
import Question from './models/question.model.js';
import Movie from './models/movie.model.js';
const tmdb = new Tmdb;

const questionsArray = [
    //QUESTION 1
    new Question(
        'Quel acteur joue dans ce film ?',
        [
            'Morgan Freeman',
            'Hugues Jackman',
            'Matt Demon'
        ],
        2,
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pP1cyoXFc5Br1Sg21uORSN49yyu.jpg'
    ),

    //QUESTION 2
    new Question(
        'Qui est l\'acteur sur l\'affiche de ce film?'
        , [
            'Joaquin Phoenix'
            , 'Adele Exarcpohupoulous'
            , 'Joaquin Phoenix'
            , 'Joaquin Phoenix'
            , 'Matt Demon'
        ],
        2,
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/909JHryBRMXJeVswBUDlYWK7cQr.jpg'
    ),

    //QUESTION 3
    new Question(
        'Quel almùklmùcteur joue dans clmùlùmklmùk film ?'
        , [
            'Morgan Freeman'
            , 'Hugues Jackman'
            , 'Matt Demon'
        ],
        2,
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/boAUuJBeID7VNp4L7LNMQs8mfQS.jpg'
    ),


    //QUESTION 4
    new Question(
        'Quel acteur jklmùklmùklmùoue dans ce film ?'
        , [
            'Morgan Freeman'
            , 'Hugues Jackman'
            , 'Matt Demon'
        ],
        2,
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/boAUuJBeID7VNp4L7LNMQs8mfQS.jpg'
    ),

    //QUESTION 5
    new Question(
        'Quel acteur ne joue pas dans ce film de qualité ?',
        [
            'Gérard Jugnot'
            , 'Thierry Lhermitte'
            , 'Gérard Depardieu',
            'Alain Chabat'
        ],
        2,
        'https://fr.web.img5.acsta.net/pictures/23/06/21/12/06/4953335.jpg'
    ),
];

let score = 0;

function createQuestionBlock(q, index) {

    // ca c'est la question que je met en paramettre
    const question = new Question(q.statement, q.answerList, q.correctAnswer, q.poster);

    // la je creer la div principale de ma question
    const divQuestion = document.createElement('div');
    // la je lui ajoute ses classes
    divQuestion.classList.add('block', 'question');

    // la je lui ajoute ses classes
    const posterContainer = document.createElement('div');
    posterContainer.classList.add('poster-container');
    const posterImg = document.createElement('img');
    posterImg.src = question.poster;
    const bottomGradient = document.createElement('div');
    bottomGradient.classList.add('bottom-gradient');

    const titleQuestion = document.createElement('p');
    // la je lui dis que ce que je veux à la place de mon texte c'est ce que j'ai dans mon objet Question
    titleQuestion.textContent = question.statement;

    const formAnswer = document.createElement('form');
    formAnswer.id = "question" + index;

    // la c'est le bordel, accroche toi à ton slip// 
    // On boucle dans mon tableau de liste d'acteur(answerList), à chaque fois que je bouvcle, je creer la partie radio+label+actor
    for (let i = 0; i < question.answerList.length; i++) {

        const answerWrapper = document.createElement('div');
        answerWrapper.classList.add('answer-wrapper');
        const label = document.createElement('label');
        label.htmlFor = index;
        label.textContent = question.answerList[i];

        const input = document.createElement('input');
        input.type = "radio";
        input.name = "actor";
        input.id = index;
        input.value = i;

        // la je range mon input et mon label dans mon answer-wrapper// 
        answerWrapper.appendChild(label);
        answerWrapper.appendChild(input);
        formAnswer.appendChild(answerWrapper);
    }
    // en gros on range les boites dans d'autres boites // 
    posterContainer.appendChild(posterImg);
    posterContainer.appendChild(bottomGradient);
    divQuestion.appendChild(posterContainer)
    divQuestion.appendChild(titleQuestion)
    divQuestion.appendChild(formAnswer)
    document.body.appendChild(divQuestion);
}

/**
 * Une fonction qui permet de générer les blocs de questioon 
 * à affichier.
 * 
 * @param {Question[]} questionList 
 */
function generateQuestions(questionList) {
    questionList.forEach((ques, i) => {
        createQuestionBlock(ques, i)
    });
}


function getScore(questionIndex) {
    var formulaire = document.getElementById("question" + questionIndex);
    let answer = formulaire.querySelector('input[name="actor"]:checked');
    if (answer) { // Si il y a une response de séléctionné.
        let userAnswerIndex = parseInt(answer.value, 10); // Convertir la chaîne en nombre.
        let correctAnswerIndex = questionsArray[questionIndex].correctAnswer;

        if (userAnswerIndex === correctAnswerIndex) {
            // Le code à executer si la reponse est correct.
            console.log('Correct!');
            score += 1;
        } else {
            // Le code à executer si la reponse n'est pas correct.
            console.log('Incorrect!');
        }
    } else {
        // Le code à executer si aucune reponse n'est séléctionné à l'index
        // qui s'affiche dans la console.
        console.log("No option selected for question " + questionIndex);
    }

    console.log(`le score est de ${score} sur ${questionsArray.length}`);
}


/**
 * La fonction qui affiche le score final
 */
function displayScores() {
    questionsArray.forEach((question, index) => {
        getScore(index);
    })

    const scoreDiv = document.createElement('p');
    scoreDiv.textContent = `${score} / ${questionsArray.length}`;
    scoreDiv.classList.add('score')
    document.body.appendChild(scoreDiv);
}

function generateQuestionsByMovie(movie){

}


// START 🚀
// generateQuestions(questionsArray);


tmdb.discoverMovies(2).then(data => {
    let i = 0;
    let delay = setInterval(() => {
        console.log(data.results[i]);

        tmdb.getMovieCredits(data.results[i].id).then(credit => {
            console.log(credit.cast);
            let answerList = [
                    credit.cast[0].name,
                    credit.cast[1].name,
                    credit.cast[2].name,
                    credit.cast[3].name,
            ]

            const imgUrl = `https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}`; 
            const question = new Question('Lequel de ces acteurs n \'as pas joué dans ' + data.results[i].title, answerList, 0,  imgUrl)

            createQuestionBlock(question, i)
        })



        if (i === data.results.length - 1) {
            clearInterval(delay);
            console.log('stop');
        }
        i += 1;
    }, 500)


}).catch(e)(
    console.error(e)
);

