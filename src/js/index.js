const gameCells = document.querySelectorAll(".board td");
const winnerBanner = document.querySelector(".winner");
const reloadTime = 1000;

const TicTacToe = new Game(gameCells);
const handleClick = ({ target }) => {
  if (!target.textContent) {
    target.textContent = TicTacToe.actualPlayer;

    const [, row, column] = target.className.split("");
    TicTacToe.fillBoard(row, column);
    const hasGameEnded = TicTacToe.checkGame();

    if (hasGameEnded) {
      winnerBanner.textContent = `${TicTacToe.actualPlayer} wins!`;
      setTimeout(() => {
        winnerBanner.textContent = "";
        TicTacToe.resetGame();
      }, reloadTime);
    }
  }
};

gameCells.forEach((cell) => cell.addEventListener("click", handleClick));
