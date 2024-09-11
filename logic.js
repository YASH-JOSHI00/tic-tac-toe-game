const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const messageElement = document.getElementById('message');
let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = clickedCell.getAttribute('data-index');

    if (boardState[clickedIndex] !== '' || !gameActive) {
        return;
    }

    boardState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const a = boardState[condition[0]];
        const b = boardState[condition[1]];
        const c = boardState[condition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageElement.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        messageElement.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageElement.textContent = `It's ${currentPlayer}'s turn`;
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    messageElement.textContent = `It's ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
