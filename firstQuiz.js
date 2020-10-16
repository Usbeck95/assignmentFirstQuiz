// i variablen questions angiver jeg en array, som består af question med answer.
let myQuestions = [
    {
        question: "Hello?",
        answers: {
            a: 'cat',
            b: 'world',
            c: 'pizza'
        },
        correctAnswer: 'b'
    },
    {
        question: "Are cats cute?",
        answers: {
            a: 'yes',
            b: 'no',
            c: 'maybe'
        },
        correctAnswer: 'a'
    }
];

// tager min div fra HTML
let qBox = document.getElementById("quizBox");

let resultsContainer = document.getElementById("results");

// laver min submit knap
let btnSub = document.getElementById("submit");

buildQuiz(myQuestions, qBox, resultsContainer, btnSub);

//bygger min quiz
function buildQuiz(questions, qBox, resultsContainer, btnSub) {

    function questionsPlease(questions, qBox){
        // Her bliver svarene og output deklareret så de kan indeholde ja svar og output
        let output = [];
        let answers;
        // For hvert spørgsmål
        for(let i =0; i<questions.length; i++){

            //starter man med at resette svar arrayen
            answers = [];
        
            //For hvert muligt svar sker der hvad der står fra push
            for(letter in questions[i].answers){

                // De skal have en radio button så man kan klikke dem
                answers.push(
                    '<label>'
						+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
						+ letter + ': '
						+ questions[i].answers[letter]
					+ '</label>'
                );
            }
            // så her tilføjer man et spørgsmål og dets svar til outputtet
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }
        // så nu kombinerer man outputlisterne og skriver dem ud i htmlen
        qBox.innerHTML = output.join('');
    }

    function resultsPlease(questions, qBox, resultsContainer) {

        // laver en holder til valuesne fra quizzens svar
        let answerContainers = qBox.querySelectorAll('.answers');

        // her skal der holdes styr på brugerens svar
        let userAnswer = '';
        let numCorrect = 0;

        //for hvert svar skal der ske...
        for(let i=0; i<questions.length; i++){

            // den skal kigge efter om der er valgt et svar
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;

            //hvis det valgte svar er det samme som spørgsmålets korrekte svar...
            if(userAnswer===questions[i].correctAnswer){
                //så bliver der lagt en til hos numCorrect
                numCorrect++;
                
                //Så bliver svaret også grønt for rigtigt
                answerContainers[i].style.color = 'lightgreen';
            }
            // og ellers
            else {
                //så bliver der selvfølgelig ikke lagt til numcorrect og svaret bliver rødt
                answerContainers[i].style.color = 'red';
            }
        }

        // her beder vi den om at den skal skrive i html, og den skal fortælle hvor mange rigtige svar man har fået ud af alle de mulige svar.
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }

    // Den skal vise spørgsmålene med det samme. 
    questionsPlease(questions, qBox);

    //når man klikker submit, så skal den vise resultaterne
    btnSub.addEventListener("click", function(){
		resultsPlease(questions, qBox, resultsContainer);
	});
}

