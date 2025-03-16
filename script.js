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
    const shareButton = document.getElementById('share');
    const questions = document.querySelectorAll('.question');
    let currentQuestion = 0;
    let score = 0;

    // Hide all questions initially
    questions.forEach(question => question.style.display = 'none');
    
    // When the start button is clicked, start the quiz
    startButton.addEventListener('click', function () {
        startButton.style.display = 'none'; // Hide the start button
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
        scoreButton.style.display = 'none';
    }

    // Share the quiz result
    shareButton.addEventListener('click', function () {
        if (navigator.share) {
            navigator.share({
                title: 'Quiz Results',
                text: `I scored ${score} out of ${questions.length} on this awesome quiz!`,
                url: window.location.href 
            }).then(() => {
                console.log('Successfully shared');
            }).catch((error) => {
                console.error('Error sharing:', error);
            });
        } else {
            alert('Sharing not supported on this device. Please copy the link to share.');
        }
    });

    // Add event listener to the score button to display the score
    scoreButton.addEventListener('click', function () {
        displayScore(); 
    });
});
