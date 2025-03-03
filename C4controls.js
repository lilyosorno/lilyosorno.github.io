const ROWS = 6;
const COLS = 7;
let board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
let currentPlayer = 1;
let playerColors = [document.getElementById("player1Color").value, document.getElementById("player2Color").value];

function createBoard() {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.col = col;
            cell.addEventListener("click", handleMove);
            boardElement.appendChild(cell);
        }
    }
}

function handleMove(event) {
    const col = event.target.dataset.col;
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            updateBoard();
            currentPlayer = 3 - currentPlayer;
            updateTurnIndicator();
            break;
        }
    }
}

function updateBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.style.backgroundColor = "white");
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col]) {
                const index = row * COLS + col;
                cells[index].style.backgroundColor = playerColors[board[row][col] - 1];
            }
        }
    }
}

function updateTurnIndicator() {
    playerColors = [document.getElementById("player1Color").value, document.getElementById("player2Color").value];
    document.getElementById("turnIndicator").textContent = `Turn: ${currentPlayer === 1 ? "Player 1" : "Player 2"}`;
    document.getElementById("turnIndicator").style.color = playerColors[currentPlayer - 1];
}

document.getElementById("player1Color").addEventListener("input", updateTurnIndicator);
document.getElementById("player2Color").addEventListener("input", updateTurnIndicator);

createBoard();
updateTurnIndicator();