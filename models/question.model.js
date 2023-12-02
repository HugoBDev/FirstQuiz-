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

        const cAnswer = this.correctAnswer;

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
        formRef.addEventListener('submit', function (event) {

            /**
             * ce listener est joué quand le formulaire est 'envoyé', 
             * c'est a dire quand l'utilisateur clique si le bouton de type Submit qui est DANS le formualaire
             */

            event.preventDefault(); // Empêche la soumission par défaut du formulaire

            const form = document.getElementById('form' + index);
            const radios = form.querySelectorAll('input[type="radio"]');

            radios.forEach(radio => {
                //On bouche sur chaque input radio ... 
                if (radio.checked) { // mais on ne teste que celui qui est checked !

                    // si la valeur du radio checked est égale à la valeur de la correctAnswer ...
                    if (radio.value === cAnswer.toString()) {
                        // Le Code à executer si la response est correct
                        console.log('correct !');
                    } else { // Sinon ...
                        // Le Code à executer si la response n'est pas correct ...
                        console.log('mauvaise reponse !');
                    }
                }
            })
        });

        formRef.addEventListener('change', (event) => {
            /**
             * ce listener est joué quand le formulaire change
             * ce qui nous informe que l'utilisateur a cliqué sur un radio. 
             * donc on peux autoriser l'utilisateur a cliquer sur valider,
             * ca se traduit par changer l'état disabled du bouton de true a false
            */
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
        submitBtnRef.id = 'submitBtn' + index;
        submitBtnRef.disabled = true;
        submitBtnRef.textContent = 'valider';
        submitBtnRef.addEventListener('click', (event) => {
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