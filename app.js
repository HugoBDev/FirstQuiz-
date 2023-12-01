

import Tmdb from './tmdb.js';
import Question from './models/question.model.js';
import Movie from './models/movie.model.js';
const tmdb = new Tmdb;

let score = 0;

/**
 * 
 * @param {*} questionIndex 
 */
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

// START 🚀

tmdb.discoverMovies(2).then(data => {
    let i = 0;
    let delay = setInterval(() => {

        tmdb.getMovieCredits(data.results[i].id).then(credit => {
            const answerList = [
                credit.cast[0].name,
                credit.cast[1].name,
                credit.cast[2].name,
                credit.cast[3].name,
            ];

            const imgUrl = `https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}`;
            const question = new Question('Lequel de ces acteurs n \'as pas joué dans ' + data.results[i].title + ' ?', answerList, 0, imgUrl);
            console.log(question);
            question.createQuestionBlock(i);
            i += 1;

        }).catch(error => console.error(error))



        // if (i === data.results.length - 1) {
        if (i === 2) {
            clearInterval(delay);
        }
    }, 500)

}).catch(error => console.error(error));



