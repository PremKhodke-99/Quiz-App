const questions = [
    {
        question: "Javascript is an _______ language?",
        answers: [
            {text: "Object-Oriented", correct: true},
            {text: "Object-Based", correct: false},
            {text: "Procedural", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        answers: [
            {text: "var", correct: false},
            {text: "let", correct: false},
            {text: "Both", correct: true},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        answers: [
            {text: "getElementById()", correct: false},
            {text: "getElementsByClassname()", correct: false},
            {text: "Both", correct: true},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        answers: [
            {text: "Throws an error", correct: false},
            {text: "Ignores the statement", correct: true},
            {text: "Gives a warning", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        answers: [
            {text: "document.write()", correct: false},
            {text: "console.log()", correct: false},
            {text: "windows.alert()", correct: false},
            {text: "All of the above", correct: true},
        ]
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        answers: [
            {text: "const", correct: true},
            {text: "var", correct: false},
            {text: "let", correct: false},
            {text: "constant", correct: false},
        ]
    },
    {
        question: "When the switch statement matches the expression with the given labels, how is the comparison done?",
        answers: [
            {text: "Both datatype and result of the expression are compared", correct: true},
            {text: "Obnly datatype is compared", correct: false},
            {text: "Only value is compared", correct: false},
            {text: "None of the above", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;   

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();