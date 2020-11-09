function main() {
    const overlay = document.querySelector('#game-overlay')

    const heading = document.querySelector('#heading')

    const start_button = overlay.querySelector('#start-button')

    function start() {
        Minesweeper(6, document.querySelector('#game'), 'game-grid', gameOver)

        overlay.classList.add('hidden')

        start_button.textContent = 'Play Again'
    }

    start_button.addEventListener('click', start)

    function gameOver(win = false) {
        if (win) {
            heading.textContent = 'You Win!'
        } else {
            heading.textContent = 'You Lose'
        }
        overlay.classList.remove('hidden')
    }
}

window.addEventListener('load', main)