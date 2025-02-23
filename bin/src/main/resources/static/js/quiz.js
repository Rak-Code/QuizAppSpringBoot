document.addEventListener('DOMContentLoaded', loadQuestions);

let questions = [];
let answers = [];

function loadQuestions() {
    fetch('/api/quiz/questions')
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestions();
            document.getElementById('submitBtn').disabled = false;
        })
        .catch(error => console.error('Error fetching questions:', error));
}

function displayQuestions() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';

        const questionText = document.createElement('h5');
        questionText.textContent = `${index + 1}. ${question.questionText}`;
        questionDiv.appendChild(questionText);

        const optionGroup = document.createElement('div');
        question.options.forEach((option, optIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'form-check';

            const input = document.createElement('input');
            input.type = 'radio';
            input.className = 'form-check-input';
            input.name = `question-${index}`;
            input.id = `q${index}-opt${optIndex}`;
            input.value = optIndex + 1;
            input.onchange = () => updateAnswer(index, optIndex + 1);

            const label = document.createElement('label');
            label.className = 'form-check-label';
            label.htmlFor = `q${index}-opt${optIndex}`;
            label.textContent = option;

            optionDiv.appendChild(input);
            optionDiv.appendChild(label);
            optionGroup.appendChild(optionDiv);
        });

        questionDiv.appendChild(optionGroup);
        quizContainer.appendChild(questionDiv);
    });
}

function updateAnswer(questionIndex, selectedOption) {
    answers[questionIndex] = selectedOption;
}

function submitQuiz() {
    const userName = document.getElementById('userName').value.trim();
    if (!userName) {
        alert('Please enter your name!');
        return;
    }

    if (answers.length !== questions.length) {
        alert('Please answer all questions!');
        return;
    }

    const submission = {
        userName: userName,
        answers: answers
    };

    fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(submission)
    })
    .then(response => response.json())
    .then(score => {
        document.getElementById('result').textContent = `Quiz Over, ${userName}! Your score: ${score} out of ${questions.length}`;
        document.getElementById('submitBtn').disabled = true;
    })
    .catch(error => console.error('Error submitting quiz:', error));
}