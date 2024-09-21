const playBoard = document.querySelector(".play-area");
const playBoardScore = document.querySelector(".score")
const playBoardHighScore = document.querySelector('.high-score')
const controls = document.querySelectorAll(".play-contorls i")

let gameOver = false
let foodX, foodY;
let snakeX = 5, snakeY = 15;
let directionX = 0, directionY = 0
const snakeBody = []
let setIntervalId;
let score = 0
// getting the highscore from the local storage
let highScore = localStorage.getItem("high-score") || 0
playBoardHighScore.innerHTML = `High Score: ${highScore}`



// change the food position in the playboard
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const changeSnakeDirection = (e) => {
    // changing the direction values when key press
    if (e.key === "ArrowUp" && directionY != 1) {
        directionX = 0
        directionY = -1
    } else if (e.key === "ArrowDown" && directionY != -1) {
        directionX = 0
        directionY = 1
    } else if (e.key === "ArrowRight" && directionX != -1) {
        directionX = 1
        directionY = 0
    } else if (e.key === "ArrowLeft" && directionX != 1) {
        directionX = -1
        directionY = 0
    }

}

const gameOverHandle = () => {
    // clearing the timer and reload the page when game over
    clearInterval(setIntervalId)
    alert("Game Over!!! Press Ok to Restart the Game")
    location.reload();
}

controls.forEach(key => {
    key.addEventListener("click", () => changeSnakeDirection({ key: key.dataset.key })
    )
})

const startGame = () => {

    if (gameOver) return gameOverHandle();
    //  Generates the food on the play board
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // change the food position 
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition()
        snakeBody.push([foodX, foodY])
        score++
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore)
        playBoardScore.innerHTML = `Score: ${score}`
        playBoardHighScore.innerHTML = `High Score: ${highScore}`
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        // shifiting forward the values of the elements in the snake body by one
        snakeBody[i] = snakeBody[i - 1]

    }

    snakeBody[0] = [snakeX, snakeY] //seeting first element of snake body to current snake position

    snakeX += directionX
    snakeY += directionY

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true
    }

    for (let i = 0; i < snakeBody.length; i++) {
        // adding div to each part of the snake body
        htmlMarkup += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        // snake head hit the body then game over
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true
        }
    }
    playBoard.innerHTML = htmlMarkup;
};
changeFoodPosition()
setIntervalId = setInterval(startGame, 125)

document.addEventListener("keydown", changeSnakeDirection)