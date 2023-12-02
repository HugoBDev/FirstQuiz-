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
        const questionContainerRef = document.createElement('div');

        const questionBlockTop = document.createElement('div');
        questionBlockTop.classList.add('block', 'question');

        const posterContainer = document.createElement('div');
        posterContainer.classList.add('poster-container');

        const posterImg = document.createElement('img');
        posterImg.src = this.poster;

        const bottomGradient = document.createElement('div');
        bottomGradient.classList.add('bottom-gradient');
        
        const titleQuestion = document.createElement('p');
        titleQuestion.textContent = this.statement;

        const formRef = document.createElement('form');
        formRef.id = 'form' + index;

        const answersContainerRef = document.createElement('div');
        answersContainerRef.classList.add('answers-container');


        // Boucle sur chaque reponse de la qestion.
        for (let i = 0; i < this.answerList.length; i++) {

            const labelRef = document.createElement('label');
            const inputRef = document.createElement('input');
            inputRef.type = 'radio';
            inputRef.name = 'answer' + index;

            const spanRef = document.createElement('span');
            spanRef.textContent = this.answerList[i];

            labelRef.appendChild(inputRef);
            labelRef.appendChild(spanRef);
            answersContainerRef.appendChild(labelRef)
        }

        const submitBtnRef = document.createElement('button');
        submitBtnRef.classList.add('submit-question-btn');
        submitBtnRef.id = 'submitBtn'+ index;
        submitBtnRef.disabled = true;
        submitBtnRef.textContent = 'valider';

        posterContainer.appendChild(posterImg);
        posterContainer.appendChild(bottomGradient);
        questionBlockTop.appendChild(posterContainer)
        questionBlockTop.appendChild(titleQuestion)

        formRef.appendChild(answersContainerRef)
        questionBlockTop.appendChild(formRef)

        questionContainerRef.appendChild(questionBlockTop);
        questionContainerRef.appendChild(submitBtnRef);

        document.getElementById('questionsWrapper').appendChild(questionContainerRef)
    }

}