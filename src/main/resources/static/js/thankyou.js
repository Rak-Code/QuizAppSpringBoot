document.addEventListener('DOMContentLoaded', () => {
    // Parse URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('userName');
    const score = urlParams.get('score');
    const total = urlParams.get('total');

    // Validate parameters
    if (!userName || !score || !total) {
        console.error('Missing query parameters:', { userName, score, total });
        document.getElementById('score-value').textContent = 'Error loading score';
        return;
    }

    // Display score with username
    document.getElementById('score-value').textContent = `${score} / ${total}`;
    document.getElementById('score-text').innerHTML = `Your Score, ${userName}: <span id="score-value">${score} / ${total}</span>`;
});

function playAgain() {
    window.location.href = '/';
}