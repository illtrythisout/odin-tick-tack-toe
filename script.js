const gameFunctions = (function() {
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

    return {checkStraightWin}
})()

function createPlayer(marker) {
    let score = 0
    const getScore = () => score
    const giveScore = () => score++

    return {marker, getScore, giveScore}
}
const playerX = createPlayer("X");
const playerO = createPlayer("O")

function declareWinner(player, draw) {
    if (draw) {
        console.log("It's a draw");
    } else {
        console.log(`Player ${player.marker} won`);
    }   
}

let roundNo = 0;
function nextRound() {
    if (roundNo === 9) {
        declareWinner(undefined, true);
    } else {
        roundNo++;
        if (roundNo % 2 === 0) {
            playTurn("X")
        } else {
            playTurn("O")
        }
    }
}

const gameBoard = {
    a1: undefined,
    b1: undefined,
    c1: undefined,
    a2: undefined,
    b2: undefined,
    c2: undefined,
    a3: undefined,
    b3: undefined,
    c3: undefined,
}

function checkWin(player, posPlayed) {
    let rowPlayed = posPlayed[0];
    let colPlayed = posPlayed[1]
    if (gameFunctions.checkStraightWin(rowPlayed, player)) {
        declareWinner(player);
    } else if (gameFunctions.checkStraightWin(colPlayed, player)) {
        declareWinner(player)
    }
}

function playTurn(player) {
    let posPlayed = prompt(`Player: ${player.marker}, select a square`);
    if (gameBoard[posPlayed] === undefined) {
        gameBoard[posPlayed] = player.marker;
        checkWin(player, posPlayed)
    } else {
        alert("That square is taken");
        playTurn(player);
    }
}