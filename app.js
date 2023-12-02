

import Tmdb from './tmdb.js';
import Question from './models/question.model.js';
const tmdb = new Tmdb;
const questionsCount = 6;

let score = 0;

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
                const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                const answerList = [];
                answerList[correctAnswer] = getRandomActorName(popularActors);

                for (let i = 0; i < maxAnswers; i++) {
                    if(i != correctAnswer) answerList[i] = credit.cast[i].name;
                }

                const question = new Question('Lequel de ces acteurs n \'as pas joué dans ' + movie.title + ' ?', answerList, correctAnswer, imgUrl);
                resolve(question);

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

// START 🚀


// Get polulars Actors (for fake answsers 😈)
let popularActors;
tmdb.getPopularPeople().then(data => {
    popularActors = data.results;
}).catch((error) => console.error(error));

for (let i = 0; i < questionsCount; i++) {
    const skeleton =  document.createElement('div');
    skeleton.classList.add('skeleton', 'sk'+i);
    document.getElementById('questionsWrapper').appendChild(skeleton);
}

tmdb.discoverMovies(2).then(data => {
    let i = 0;
    let delay = setInterval(() => {

        generateQuestionByMovie(data.results[i]).then(q => {
            q.createQuestionBlock(i);
            document.querySelector('.sk'+i).remove();
            i++;
        })

        tmdb.getMovieDetails(data.results[i].id).then(data=> {
            console.log(data);
            }).catch((error) => console.error(error));

        if (i === questionsCount -1 ) {
            clearInterval(delay);
            
        }
    }, 500)
    
    console.log(data);
}).catch(error => console.error(error));

