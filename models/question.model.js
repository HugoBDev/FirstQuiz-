export default class Question {

    statement;
    answerList
    correctAnswer;
    poster;

    constructor(statement, answerList, correctAnswer, poster) {
        this.statement = statement;
        this.answerList = answerList;
        this.correctAnswer = correctAnswer;
        this.poster = poster;
    }


    createQuestionBlock(index) {

        // ca c'est la question que je met en parametre

        // la je creer la div principale de ma question
        const divQuestion = document.createElement('div');
        // la je lui ajoute ses classes
        divQuestion.classList.add('block', 'question');

        // la je lui ajoute ses classes
        const posterContainer = document.createElement('div');
        posterContainer.classList.add('poster-container');
        const posterImg = document.createElement('img');
        posterImg.src = this.poster;
        const bottomGradient = document.createElement('div');
        bottomGradient.classList.add('bottom-gradient');

        const titleQuestion = document.createElement('p');
        // la je lui dis que ce que je veux à la place de mon texte c'est ce que j'ai dans mon objet Question
        titleQuestion.textContent = this.statement;

        const questionsContainerRef = document.createElement('div');
        questionsContainerRef.classList.add('questions-container');

        // la c'est le bordel, accroche toi à ton slip// 
        // On boucle dans mon tableau de liste d'acteur(answerList), à chaque fois que je bouvcle, je creer la partie radio+label+actor
        for (let i = 0; i < this.answerList.length; i++) {

            const labelRef = document.createElement('label');
            const inputRef = document.createElement('input');
            inputRef.type = 'radio';
            inputRef.name = 'answer' + index;

            const spanRef = document.createElement('span');
            spanRef.textContent = this.answerList[i];

            labelRef.appendChild(inputRef);
            labelRef.appendChild(spanRef);
            questionsContainerRef.appendChild(labelRef)
        }
        // en gros on range les boites dans d'autres boites // 
        posterContainer.appendChild(posterImg);
        posterContainer.appendChild(bottomGradient);
        divQuestion.appendChild(posterContainer)
        divQuestion.appendChild(titleQuestion)
        divQuestion.appendChild(questionsContainerRef);

        document.getElementById('questionsWrapper').appendChild(divQuestion)
        // document.body.appendChild(divQuestion);
    }

}