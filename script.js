// Sample questions for quizzes
const quizzes = {
    'quiz1': [
        { question: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Madrid', 'Rome'], correctAnswer: 'Paris' },
        { question: 'Which planet is known as the Red Planet?', options: ['Mars', 'Venus', 'Jupiter', 'Saturn'], correctAnswer: 'Mars' },
        { question: 'What is the largest mammal on Earth?', options: ['Blue Whale', 'Elephant', 'Giraffe', 'Hippopotamus'], correctAnswer: 'Blue Whale' },
        { question: 'What is the currency of Japan?', options: ['Yen', 'Dollar', 'Euro', 'Pound'], correctAnswer: 'Yen' },
        { question: 'Who wrote "Romeo and Juliet"?', options: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Mark Twain'], correctAnswer: 'William Shakespeare' },
        // Add more questions as needed
    ],
    'quiz2': [
        { question: 'Which country is known as the Land of the Rising Sun?', options: ['Japan', 'China', 'South Korea', 'Vietnam'], correctAnswer: 'Japan' },
        { question: 'Which gas do plants absorb from the atmosphere?', options: ['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Methane'], correctAnswer: 'Carbon Dioxide' },
        { question: 'What is the largest ocean on Earth?', options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'], correctAnswer: 'Pacific Ocean' },
        { question: 'Who developed the theory of relativity?', options: ['Albert Einstein', 'Isaac Newton', 'Galileo Galilei', 'Stephen Hawking'], correctAnswer: 'Albert Einstein' },
        { question: 'Which element has the chemical symbol "O"?', options: ['Oxygen', 'Gold', 'Silver', 'Iron'], correctAnswer: 'Oxygen' },
        // Add more questions as needed
    ],
    'quiz3': [
        { question: 'What is the official language of Brazil?', options: ['Portuguese', 'Spanish', 'English', 'French'], correctAnswer: 'Portuguese' },
        { question: 'Who painted the Mona Lisa?', options: ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Claude Monet'], correctAnswer: 'Leonardo da Vinci' },
        { question: 'What is the currency of India?', options: ['Indian Rupee', 'Yen', 'Dollar', 'Euro'], correctAnswer: 'Indian Rupee' },
        { question: 'Which planet is known as the Blue Planet?', options: ['Earth', 'Mars', 'Venus', 'Jupiter'], correctAnswer: 'Earth' },
        { question: 'What is the largest desert in the world?', options: ['Antarctica', 'Sahara', 'Arctic', 'Gobi'], correctAnswer: 'Antarctica' },
        // Add more questions as needed
    ],
};

// Student objects
const students = {
    'Student A': { attemptedQuiz: false, score: 0 },
    'Student B': { attemptedQuiz: false, score: 0 },
    'Student C': { attemptedQuiz: false, score: 0 },
};

// Function to generate HTML for quiz questions
function generateQuestionsHTML(questions) {
    let html = '';
    questions.forEach((question, index) => {
        html += `<div>
            <p>${index + 1}. ${question.question}</p>
            ${generateOptionsHTML(question.options, index + 1)}
        </div>`;
    });
    return html;
}

// Function to generate HTML for options
function generateOptionsHTML(options, questionNumber) {
    let optionsHTML = '';
    options.forEach((option, index) => {
        optionsHTML += `<label><input type="radio" name="q${questionNumber}" value="${option}"> ${option}</label>`;
    });
    return optionsHTML;
}


// Display questions for each quiz
document.getElementById('quiz1-questions').innerHTML = generateQuestionsHTML(quizzes['quiz1']);
document.getElementById('quiz2-questions').innerHTML = generateQuestionsHTML(quizzes['quiz2']);
document.getElementById('quiz3-questions').innerHTML = generateQuestionsHTML(quizzes['quiz3']);


// Function to submit the quiz and calculate the score
function submitQuiz(studentName, quizId) {
    const quizContainer = document.getElementById(quizId);
    const selectedAnswers = quizContainer.querySelectorAll('input[type=radio]:checked');
    const correctAnswers = quizzes[quizId];

    students[studentName].attemptedQuiz = true;
    students[studentName].score = 0;

    selectedAnswers.forEach((selectedAnswer, index) => {
        const selectedOption = selectedAnswer.value;
        const correctOption = correctAnswers[index].correctAnswer;

        if (selectedOption === correctOption) {
            students[studentName].score += 1;
        }
    });

    // Disable the quiz after submission
    quizContainer.querySelectorAll('input[type=radio]').forEach(input => {
        input.disabled = true;
    });

    // Update the leaderboard
    updateLeaderboard();
}
// Function to update the leaderboard
function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';

    // Sort students by score in descending order
    const sortedStudents = Object.entries(students).sort((a, b) => b[1].score - a[1].score);

    // Display students in the leaderboard
    sortedStudents.forEach(([name, student], index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${name} - ${student.score} points`;
        leaderboardList.appendChild(listItem);
    });
}