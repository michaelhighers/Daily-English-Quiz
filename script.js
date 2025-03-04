document.addEventListener("DOMContentLoaded", function () {
    // Handle quiz navigation from landing page
    const quizCards = document.querySelectorAll(".quiz-card");

    quizCards.forEach(card => {
        card.querySelector(".take-quiz").addEventListener("click", function () {
            const quizPage = card.getAttribute("data-quiz");
            window.location.href = quizPage; // Redirects to the corresponding quiz page
        });
    });

    // Quiz logic (only runs if on a quiz page)
    const quizForm = document.getElementById("quiz-form");
    if (quizForm && typeof correctAnswers !== "undefined") {
        document.getElementById("submit-quiz").addEventListener("click", function () {
            let score = 0;

            Object.keys(correctAnswers).forEach((question) => {
                const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
                if (selectedOption && selectedOption.value === correctAnswers[question]) {
                    score++;
                }
            });

            // Display results
            document.getElementById("score").textContent = score;
            document.getElementById("quiz-results").style.display = "block";
        });

        // Share Results Button
        document.getElementById("share-results").addEventListener("click", function () {
            const score = document.getElementById("score").textContent;
            const shareText = `I just scored ${score}/5 on today's English quiz! Try it yourself: ${window.location.href}`;
            
            if (navigator.share) {
                navigator.share({
                    title: "English Quiz Results",
                    text: shareText,
                    url: window.location.href
                }).catch(error => console.log("Error sharing:", error));
            } else {
                alert("Sharing not supported on this browser. You can copy and share this manually:\n\n" + shareText);
            }
        });
    }
});
