const gameFunctions = (function() {
    const createPlayer = (marker) => {
        return {marker}
    }
    const checkStraightWin = (linePlayed, player) => {
        lineArr = [];

        let propertyPosition;
        if (isNaN(linePlayed) === true) {
            propertyPosition = 0;
        } else {
            propertyPosition = 1;
        }

        for (let property in gameBoard) {
            line = property[propertyPosition];
            if (line === linePlayed && gameBoard[property] === player.marker) {
                lineArr.push(property);
            }
        }
        if (lineArr.length === 3) {return true}
    }
    const checkDiagonalWin = (player) => {
        if (
            (gameBoard.a1 === player.marker && gameBoard.b2 === player.marker && gameBoard.c3 === player.marker)
            ||
            (gameBoard.c1 === player.marker && gameBoard.b2 === player.marker && gameBoard.a3 === player.marker)
        ) {
            return true;
        }
    }
    const declareWinner = (player, draw) => {
        if (draw) {
            console.log("It's a draw");
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
            roundNo = 0;
        } else {
            console.log(`Player ${player.marker} won`);
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
            roundNo = 0
        }   
    }
    return {createPlayer, checkStraightWin, checkDiagonalWin, declareWinner};
})()

const playerX = gameFunctions.createPlayer("X");
const playerO = gameFunctions.createPlayer("O")

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

let roundNo = 0;
function nextRound() {
    if (roundNo === 9) {
        gameFunctions.declareWinner(undefined, true);
    } else {
        roundNo++;
        if (roundNo % 2 === 0) {
            playTurn(playerO)
        } else {
            playTurn(playerX)
        }
    }
}

function checkWin(player, posPlayed) {
    let rowPlayed = posPlayed[0];
    let colPlayed = posPlayed[1]
    if (
        (gameFunctions.checkStraightWin(rowPlayed, player)) || (gameFunctions.checkStraightWin(colPlayed, player)) || (gameFunctions.checkDiagonalWin(player))
    ) {
        return true;
    }
}

function playTurn(player) {
    let posPlayed = prompt(`Player: ${player.marker}, select a square`);
    if (gameBoard[posPlayed] === undefined) {
        gameBoard[posPlayed] = player.marker;
        if (checkWin(player, posPlayed)) {
            gameFunctions.declareWinner(player);
        } else {
            nextRound();
        }
    } else {
        alert("That square is taken");
        playTurn(player);
    }
}