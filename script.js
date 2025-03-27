document.addEventListener('DOMContentLoaded', function () {
    const takeQuizButtons = document.querySelectorAll('.take-quiz');

    takeQuizButtons.forEach(button => {
        button.addEventListener('click', function () {
            const quizUrl = button.getAttribute('data-quiz-url');
            window.location.href = quizUrl; // Redirect to the unique quiz page
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start');
    const nextButton = document.getElementById('next');
    const scoreButton = document.getElementById('score');
    const scoreContainer = document.getElementById('score-container');
    const scoreResult = document.getElementById('score-result');
    const tryagainButton = document.getElementById('try-again');
    const questions = document.querySelectorAll('.question');
    const firstQuizButton = document.getElementById('first-quiz-button');
    const prevQuizButton = document.getElementById('previous-quiz-button');
    const homeButton = document.getElementById('home-button');
    const nextQuizButton = document.getElementById('next-quiz-button');
    const lastQuizButton = document.getElementById('last-quiz-button');
    const navigationContainer = document.querySelector('.navigation-container');
    let currentQuestion = 0;
    let score = 0;

    // Hide all questions initially
    questions.forEach(question => question.style.display = 'none');

    // Show navigation container on page load
    navigationContainer.style.display = 'flex';

    // When the start button is clicked, start the quiz
    startButton.addEventListener('click', function () {
        startButton.style.display = 'none'; // Hide the start button
        document.querySelector('.quiz-start-image').style.display = 'none'; // Hide the image
        document.querySelector('.quiz-title').style.display = 'none'; // Hide the title
        navigationContainer.style.display = 'none'; //hide navigation
        showQuestion(currentQuestion); // Show the first question
    });

    // When the next button is clicked, move to the next question
    nextButton.addEventListener('click', function () {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion(currentQuestion); // Show the next question
        } else {
            displayScore(); // If all questions are answered, display the score
        }
    });

    // Function to display a specific question based on the index
    function showQuestion(index) {
        // Hide all questions
        questions.forEach(question => question.style.display = 'none');
        // Show the current question
        questions[index].style.display = 'block';

        // Add event listeners to answer buttons for this question
        const answerButtons = questions[index].querySelectorAll('.answer');
        answerButtons.forEach(button => {
            button.addEventListener('click', function () {
                checkAnswer(button, index);
            });
        });

        // Ensure the next button is hidden until an answer is selected
        nextButton.style.display = 'none';
    }

    // Function to check if the selected answer is correct
    function checkAnswer(button, questionIndex) {
        const correctAnswerIndex = questions[questionIndex].dataset.correct;
        const selectedAnswer = button.dataset.index;

        // Disable all answer buttons after selecting an answer
        const answerButtons = questions[questionIndex].querySelectorAll('.answer');
        answerButtons.forEach(btn => btn.disabled = true);

        // Check if the answer is correct
        if (selectedAnswer === correctAnswerIndex) {
            button.classList.add('correct');
            score++; // Increase score for correct answer
        } else {
            button.classList.add('incorrect');
            // Highlight the correct answer
            const correctButton = questions[questionIndex].querySelector(`[data-index="${correctAnswerIndex}"]`);
            correctButton.classList.add('correct');
        }

        // Show the next button after selecting an answer
        nextButton.style.display = 'block';

        // If it's the last question, show the score button instead of the next button
        if (currentQuestion === questions.length - 1) {
            nextButton.style.display = 'none';
            scoreButton.style.display = 'inline-block';
        }
    }

    // Function to display the score inside the score container
    function displayScore() {
        // Hide all questions
        questions.forEach(question => question.style.display = 'none');

        // Show the score container
        scoreResult.textContent = `You scored ${score} out of ${questions.length}!`;
        scoreContainer.style.display = 'block';
        tryagainButton.style.display = 'block';
        scoreButton.style.display = 'none';
        navigationContainer.style.display = 'flex'; //show nav
    }

    tryagainButton.addEventListener('click', function () {
        window.location.reload(); // Refresh the page
    });

    // Add event listener to the score button to display the score
    scoreButton.addEventListener('click', function () {
        displayScore();
    });

    //Date range (replace with your actual dates)
    const firstQuizDate = '20250311'; //Oldest date
    const lastQuizDate = '20250316'; //newest date.

    // Function to generate quiz URL from date
    function getQuizUrl(date) {
        return `../quizzes/${date}.html`;
    }

    // Function to convert date string to a Date object
    function parseDate(dateString) {
        const year = parseInt(dateString.slice(0, 4));
        const month = parseInt(dateString.slice(4, 6)) - 1; // Months are 0-indexed
        const day = parseInt(dateString.slice(6, 8));
        return new Date(year, month, day);
    }

    // Function to format date object to a string
    function formatDate(date) {
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}${month}${day}`;
    }

    // Get current quiz date from the URL
    const currentQuizDate = window.location.pathname.split('/').pop().replace('.html', '');

    // Generate URLs for navigation buttons (corrected logic)
    firstQuizButton.addEventListener('click', function () {
        window.location.href = getQuizUrl(lastQuizDate); // First button goes to newest quiz
    });

    lastQuizButton.addEventListener('click', function () {
        window.location.href = getQuizUrl(firstQuizDate); // Last button goes to oldest quiz
    });

    // Logic for previous and next buttons (corrected logic)
    const currentDateObj = parseDate(currentQuizDate);
    const firstDateObj = parseDate(firstQuizDate);
    const lastDateObj = parseDate(lastQuizDate);

    let prevDateObj = new Date(currentDateObj);
    prevDateObj.setDate(currentDateObj.getDate() - 1); // Previous button goes to older date

    let nextDateObj = new Date(currentDateObj);
    nextDateObj.setDate(currentDateObj.getDate() + 1); // Next button goes to newer date

    if (prevDateObj >= firstDateObj) {
        nextQuizButton.addEventListener('click', function () {
            window.location.href = getQuizUrl(formatDate(prevDateObj));
        });
    } else {
        nextQuizButton.disabled = true;
    }

    if (nextDateObj <= lastDateObj) {
        prevQuizButton.addEventListener('click', function () {
            window.location.href = getQuizUrl(formatDate(nextDateObj));
        });
    } else {
        prevQuizButton.disabled = true;
    }

    homeButton.addEventListener('click', function () {
        window.location.href = '../index.html';
    });
});
