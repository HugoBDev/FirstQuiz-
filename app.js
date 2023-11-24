
class Question {
    constructor(statement, answerList, correctAnswer, poster) {
        this.statement = statement;
        this.answerList = answerList;
        this.correctAnswer = correctAnswer;
        this.poster = poster;
    }
}


const question1 = new Question('Quel acteur joue dans ce film ?', ['Morgan Freeman', 'Hugues Jackman', 'Matt Demon'], 2, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pP1cyoXFc5Br1Sg21uORSN49yyu.jpg')
const question2 = new Question('Qui est l\'acteur sur l\'affiche de ce film?', ['Joaquin Phoenix', 'Adele Exarcpohupoulous','Joaquin Phoenix','Joaquin Phoenix', 'Matt Demon'], 2, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/909JHryBRMXJeVswBUDlYWK7cQr.jpg')
const question3 = new Question('Quel almùklmùcteur joue dans clmùlùmklmùk film ?', ['Morgan Freeman', 'Hugues Jackman', 'Matt Demon'], 2, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/boAUuJBeID7VNp4L7LNMQs8mfQS.jpg')
const question4 = new Question('Quel acteur jklmùklmùklmùoue dans ce film ?', ['Morgan Freeman', 'Hugues Jackman', 'Matt Demon'], 2, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/boAUuJBeID7VNp4L7LNMQs8mfQS.jpg')
let questionsArray = [question1, question2, question3, question4]




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


    const titleQuestion = document.createElement('p')
    // la je lui dis que ce que je veux à la place de mon texte c'est ce que j'ai dans mon objet Question
    titleQuestion.textContent = question.statement;

    const formAnswer = document.createElement('form');
    formAnswer.id = "question"+index

    
    //! la c'est le bordel, accroche toi à ton slip// 
    // On boucle dans mon tableau de liste d'acteur(answerList), à chaque fois que je bouvcle, je creer la partie radio+label+actor
    for (let i = 0; i < question.answerList.length; i++) {
        
        const answerWrapper = document.createElement('div');
        answerWrapper.classList.add('answer-wrapper');
        const label = document.createElement('label')
        label.htmlFor = index + '' + i;
        label.textContent = question.answerList[i]


        const input = document.createElement('input')
        input.type = "radio"
        input.name = "actor"
        input.id = index + '' + i;

        // la je range mon input et mon label dans mon answer-wrapper// 
        answerWrapper.appendChild(label)
        answerWrapper.appendChild(input)
        formAnswer.appendChild(answerWrapper)
    
    }
    // en gros on range les boites dans d'autres boites // 
    posterContainer.appendChild(posterImg)
    divQuestion.appendChild(posterContainer)
    divQuestion.appendChild(titleQuestion)
    divQuestion.appendChild(formAnswer)
    document.body.appendChild(divQuestion);
}


//  ici on execute l'ENORMEEEEE fonction au dessus pour chaque question de [questionArray]
function generateQuestions(questionList) {
    questionList.forEach((ques, i) => {
        createQuestionBlock(ques, i)
    });
}


generateQuestions(questionsArray)
