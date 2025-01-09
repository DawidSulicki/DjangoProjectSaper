document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game');
    const rows = 10;
    const cols = 10;
    const minesCount = 20;

    const board = generateBoard(rows, cols, minesCount);
    renderBoard(board);

    function generateBoard(rows, cols, minesCount) {
        const board = Array.from({ length: rows }, () => Array(cols).fill(0));


        let minesPlaced = 0;
        while (minesPlaced < minesCount) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            if (board[row][col] !== 'M') {
                board[row][col] = 'M';
                minesPlaced++;
                updateNumbers(board, row, col);
            }
        }
        return board;
    }

    function updateNumbers(board, row, col) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[0].length && board[newRow][newCol] !== 'M') {
                    board[newRow][newCol]++;
                }
            }
        }
    }

    function renderBoard(board) {
        gameContainer.style.gridTemplateRows = `repeat(${board.length}, 30px)`;
        gameContainer.style.gridTemplateColumns = `repeat(${board[0].length}, 30px)`;

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.dataset.row = rowIndex;
                cellElement.dataset.col = colIndex;

                cellElement.addEventListener('click', () => revealCell(board, cellElement, rowIndex, colIndex));

                gameContainer.appendChild(cellElement);
            });
        });
    }

    function revealCell(board, cellElement, row, col) {
        if (cellElement.classList.contains('revealed')) return;

        cellElement.classList.add('revealed');

        const value = board[row][col];
        if (value === 'M') {
            cellElement.classList.add('mine');
            cellElement.textContent = '💣';
            alert('Game Over!');
        } else {
            cellElement.textContent = value === 0 ? '' : value;
            if (value === 0) {
                revealAdjacentCells(board, row, col);
            }
        }
    }

    function revealAdjacentCells(board, row, col) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[0].length) {
                    const adjacentCell = document.querySelector(`.cell[data-row="${newRow}"][data-col="${newCol}"]`);
                    if (!adjacentCell.classList.contains('revealed')) {
                        revealCell(board, adjacentCell, newRow, newCol);
                    }
                }
            }
        }
    }
});
