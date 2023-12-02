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
        questionContainerRef.classList.add('question-container')

        const posterContainerRef = document.createElement('div');
        posterContainerRef.classList.add('poster-container');

        const posterImgRef = document.createElement('img');
        posterImgRef.src = this.poster;

        const bottomGradientRef = document.createElement('div');
        bottomGradientRef.classList.add('bottom-gradient');
        
        const titleQuestion = document.createElement('p');
        titleQuestion.textContent = this.statement;

        const formRef = document.createElement('form');
        formRef.id = 'form' + index;
        formRef.addEventListener('submit', function(event) {
            event.preventDefault(); // Empêche la soumission par défaut du formulaire
            console.log('Formulaire soumis !');
        });

        formRef.addEventListener('change', (event) => {
            document.getElementById('submitBtn' + index).disabled = false
        })

        const answersContainerRef = document.createElement('div');
        answersContainerRef.classList.add('answers-container');


        // Boucle sur chaque reponse de la qestion.
        for (let i = 0; i < this.answerList.length; i++) {

            const labelRef = document.createElement('label');
            const inputRef = document.createElement('input');
            inputRef.type = 'radio';
            inputRef.name = 'answer' + index;
            inputRef.value = i;

            const spanRef = document.createElement('span');
            spanRef.textContent = this.answerList[i];

            labelRef.appendChild(inputRef);
            labelRef.appendChild(spanRef);
            answersContainerRef.appendChild(labelRef)
        }

        const submitBtnRef = document.createElement('button');
        submitBtnRef.type = 'submit';
        submitBtnRef.classList.add('submit-question-btn');
        submitBtnRef.id = 'submitBtn'+ index;
        submitBtnRef.disabled = true;
        submitBtnRef.textContent = 'valider';
        submitBtnRef.addEventListener('click', () => {
            console.log('button ', index, 'was clicked !');
        })

        posterContainerRef.appendChild(posterImgRef);
        posterContainerRef.appendChild(bottomGradientRef);

        formRef.appendChild(answersContainerRef);
        formRef.appendChild(submitBtnRef);

        questionContainerRef.appendChild(posterContainerRef);
        questionContainerRef.appendChild(titleQuestion);
        questionContainerRef.appendChild(formRef);

        document.getElementById('questionsWrapper').appendChild(questionContainerRef)
    }

}