let questions = [];
let answers = [];

document.addEventListener('DOMContentLoaded', () => {
    const userNameInput = document.getElementById('userName');
    const startBtn = document.getElementById('startBtn');

    userNameInput.addEventListener('input', () => {
        startBtn.disabled = userNameInput.value.trim() === '';
    });
});

function startQuiz() {
    const nameSection = document.getElementById('name-section');
    const quizContainer = document.getElementById('quiz-container');
    const submitBtn = document.getElementById('submitBtn');
    const progressContainer = document.getElementById('progress-container');

    nameSection.style.display = 'none';
    quizContainer.style.display = 'block';
    submitBtn.parentElement.style.display = 'block';
    progressContainer.style.display = 'block';

    fetch('/api/quiz/questions')
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestions();
            updateProgress();
        })
        .catch(error => console.error('Error fetching questions:', error));
}

function displayQuestions() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.style.animationDelay = `${index * 0.1}s`;

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
            input.onchange = () => {
                updateAnswer(index, optIndex + 1);
                updateProgress();
            };

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

function updateProgress() {
    const answered = answers.filter(a => a !== undefined).length;
    const total = questions.length;
    const percentage = (answered / total) * 100;

    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute('aria-valuenow', answered);
    progressBar.setAttribute('aria-valuemax', total);

    document.getElementById('progress-text').textContent = `Question ${answered} of ${total}`;
}

// ... (previous code remains the same until submitQuiz)

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
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(score => {
        // Redirect to thank you page with encoded query params
        window.location.href = `/thankyou.html?userName=${encodeURIComponent(userName)}&score=${score}&total=${questions.length}`;
    })
    .catch(error => {
        console.error('Error submitting quiz:', error);
        alert('An error occurred while submitting the quiz. Please try again.');
    });
}

// ... (rest of the file remains the same)

function resetQuiz() {
    answers = [];
    document.getElementById('name-section').style.display = 'block';
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('button-container').style.display = 'none';
    document.getElementById('progress-container').style.display = 'none';
    document.getElementById('userName').value = '';
    document.getElementById('startBtn').disabled = true;
}