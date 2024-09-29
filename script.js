const gameFunctions = (function() {

    let gameBoard = {
        a1: undefined,
        b1: undefined,
        c1: undefined,
        a2: undefined,
        b2: undefined,
        c2: undefined,
        a3: undefined,
        b3: undefined,
        c3: undefined,
    };
    const getGameBoard = () => gameBoard;
    const setGameBoard = (position, marker) => { gameBoard[position] = marker; };
    const resetGameBoard = () => {
        gameBoard = {
            a1: undefined,
            b1: undefined,
            c1: undefined,
            a2: undefined,
            b2: undefined,
            c2: undefined,
            a3: undefined,
            b3: undefined,
            c3: undefined,
        };
    }

    let roundNo = 1;
    const getRoundNo = () => roundNo;
    const increaseRoundNo = () => {roundNo++; };
    const resetRoundNo = () => {roundNo = 0; };

    const createPlayer = (marker) => {
        return {marker}
    };
    const playTurn = (posPlayed) => {
        // Checks if the round number is even or odd and uses it to decide which player's turn it is
        let player
        if (getRoundNo() % 2 === 0) {
            player = playerO
        } else {
            player = playerX
        }

        // posPlayed holds the cell the current player chose. Holds a value of a1, c3, b2... etc.
        if (getGameBoard()[posPlayed] === undefined) {
            setGameBoard(posPlayed, player.marker);
            if (checkWin(player, posPlayed)) {
                gameFunctions.declareWinner(player);
            }
            increaseRoundNo();
            if (getRoundNo() === 10) {
                declareWinner(undefined, true);
            }
        } else {
            alert("That square is taken");
            playTurn(player); // Lets the player try again if selecting an invalid cell
        }
    };
    const checkStraightWin = (linePlayed, player) => {
        // lineArr is used to count how many cells straight in a line a player has
        let lineArr = [];
        
        // propertyPosition defines whether we want to check a row (by only keeping the letter of the key in the gameBoard object) or a column (only keeping number)
        let propertyPosition;
        if (isNaN(linePlayed) === true) {
            propertyPosition = 0;
        } else {
            propertyPosition = 1;
        }

        // Adds the cells the player has marked in the current line to the lineArr so the program can check whether there is enough to win
        for (let property in getGameBoard()) {
            line = property[propertyPosition];
            if (line === linePlayed && getGameBoard()[property] === player.marker) {
                lineArr.push(property);
            }
        }
        if (lineArr.length === 3) {return true}
    };
    const checkDiagonalWin = (player) => {
        if (
            (getGameBoard().a1 === player.marker && getGameBoard().b2 === player.marker && getGameBoard().c3 === player.marker)
            ||
            (getGameBoard().c1 === player.marker && getGameBoard().b2 === player.marker && getGameBoard().a3 === player.marker)
        ) {
            return true;
        }
    };
    const checkWin = (player, posPlayed) => {
        // These isolate the letter (for the row) and the number (column) of the key in the gameBoard object
        let rowPlayed = posPlayed[0];
        let colPlayed = posPlayed[1]
        if (
            (checkStraightWin(rowPlayed, player)) || (checkStraightWin(colPlayed, player)) || (checkDiagonalWin(player))
        ) {
            return true;
        }
    };
    const declareWinner = (player, draw) => {
        if (draw) {
            console.log("It's a draw");
        } else {
            console.log(`Player ${player.marker} won`);
        }   
    };
    const resetBoard = () => {
        resetGameBoard();
        resetRoundNo();
    };
    return {getGameBoard, setGameBoard, resetGameBoard, getRoundNo, increaseRoundNo, resetRoundNo, createPlayer, playTurn, checkStraightWin, checkDiagonalWin, checkWin, declareWinner, resetBoard};
})()

const domController = (function() {
    const cells = Array.from(document.querySelectorAll(".cell"))
    const titleDescription = document.querySelector("strong")
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (gameFunctions.getRoundNo() % 2 === 0) {
                cell.textContent = "O";
                titleDescription.textContent = "X";
            } else {
                cell.textContent = "X";
                titleDescription.textContent = "O";
            }
            gameFunctions.playTurn(cell.getAttribute("id"));
        })
    });
})()

const playerX = gameFunctions.createPlayer("X");
const playerO = gameFunctions.createPlayer("O")