

import Tmdb from './tmdb.js';
import Question from './models/question.model.js';
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
 * 
 * @param {*} movie 
 * @returns 
 */
function generateQuestionByMovie(movie) {
    return new Promise((resolve, reject) => {
        tmdb.getMovieCredits(movie.id)
            .then(credit => {


                const maxAnswers = 4;
                const correctAnswer = Math.floor(Math.random() * maxAnswers);
                console.log(correctAnswer);

                const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                const answerList = [];
                answerList[correctAnswer] = getRandomActorName(popularActors);

                for (let i = 0; i < maxAnswers; i++) {
                    if(i != correctAnswer) answerList[i] = credit.cast[i].name;
                }

                const question = new Question('Lequel de ces acteurs n \'as pas joué dans ' + movie.title + ' ?', answerList, 0, imgUrl)
                resolve(question)

            }).catch(error => reject(error));
    });
}

/**
 * 
 * @param {*} actors 
 * @returns 
 */
function getRandomActorName(actors){
    return popularActors[Math.floor(Math.random() * actors.length )].name;
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


// Get polulars Actors (for fake answsers 😈)
let popularActors;
tmdb.getPopularPeople().then(data => {
    popularActors = data.results;
    console.log(popularActors);
}).catch((error) => console.error(error));


tmdb.discoverMovies(2).then(data => {
    let i = 0;
    let delay = setInterval(() => {

        generateQuestionByMovie(data.results[i]).then(q => {
            q.createQuestionBlock(i)
            i++;
        })


        // if (i === data.results.length - 1) {
        if (i === 2) {
            clearInterval(delay);
        }
    }, 500)

}).catch(error => console.error(error));
