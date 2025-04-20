const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const turnIndicator = document.getElementById('turnIndicator');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const restartButton = document.getElementById('restartButton');
const newGameButton = document.getElementById('newGameButton');
let oTurn;

startGame();

turnIndicator.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
newGameButton.addEventListener('click', startNewGame);

function startGame() {
    console.log("Game started");
    oTurn = false;
    turnIndicator.textContent = "Player 1's turn (X)";
    resultScreen.style.display = "none";
    newGameButton.style.display = "none";
    board.style.display = "grid";
    restartButton.textContent = "Restart";
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function handleClick(e) {
    console.log("Cell clicked");
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    console.log(`Placing mark: ${currentClass}`);
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
    turnIndicator.textContent = oTurn ? "Player 2's turn (O)" : "Player 1's turn (X)";
    console.log(`Turn swapped. oTurn: ${oTurn}`);
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function endGame(draw) {
    if (draw) {
        resultMessage.textContent = 'Draw!';
    } else {
        resultMessage.textContent = `${oTurn ? "O" : "X"} Wins!`;
    }
    resultScreen.style.display = "flex";
    board.style.display = "none";
    restartButton.textContent = "New";
    newGameButton.style.display = "block";
}

function startNewGame() {
    resultScreen.style.display = "none";
    newGameButton.style.display = "none";
    board.style.display = "grid";
    startGame();
}
