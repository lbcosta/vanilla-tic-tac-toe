const playerXAudio = document.querySelector("#player-x-audio");
playerXAudio.volume = 0.3;
const playerOAudio = document.querySelector("#player-o-audio");
playerOAudio.volume = 0.3;
const winAudio = document.querySelector("#win-audio");
const drawAudio = document.querySelector("#draw-audio");
const gameCells = document.querySelectorAll(".board td");
const winnerBanner = document.querySelector(".winner");
const reloadTime = 2000;

const TicTacToe = new Game(gameCells);
const handleClick = ({ target }) => {
  if (!target.textContent && TicTacToe.winner === null) {
    target.textContent = TicTacToe.actualPlayer;

    const [, row, column] = target.className.split("");
    TicTacToe.fillBoard(row, column);
    if (TicTacToe.actualPlayer === "X") {
      playerXAudio.play();
    } else {
      playerOAudio.play();
    }

    const hasGameEnded = TicTacToe.checkGame();

    if (hasGameEnded) {
      winStrobe(TicTacToe.winner);
      winnerBanner.textContent = `${TicTacToe.winner} wins!`;
      TicTacToe.winner === "X" || TicTacToe.winner === "O"
        ? winAudio.play()
        : drawAudio.play();

      setTimeout(() => {
        winnerBanner.textContent = "";
        TicTacToe.resetGame();
        resetBoardColors();
      }, reloadTime);
    }
  }
};

gameCells.forEach((cell) => cell.addEventListener("click", handleClick));

function winStrobe(winner) {
  let time = 100;

  gameCells.forEach((cell) => {
    setTimeout(() => {
      switch (winner) {
        case "X":
          cell.style.background = "#ff2079";
          break;
        case "O":
          cell.style.background = "#440bd4";
          break;
        default:
          cell.style.background = "rgba(255, 255, 255, 0.25)";
      }
    }, time);
    time += 100;
  });
}

let originalCellColors = [];
gameCells.forEach((cell) =>
  originalCellColors.push(cell.style.backgroundColor)
);

function resetBoardColors() {
  gameCells.forEach(
    (cell, idx) => (cell.style.background = originalCellColors[idx])
  );
}
