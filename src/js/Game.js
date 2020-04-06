class Game {
  constructor(cells) {
    this.cells = cells;
    this.actualPlayer = "X";
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.winner = null;
  }

  fillBoard = (row, column) => {
    this.board[row][column] = this.actualPlayer;
  };

  togglePlayer = () => {
    if (this.actualPlayer === "X") {
      this.actualPlayer = "O";
    } else {
      this.actualPlayer = "X";
    }
  };

  resetGame = () => {
    this.cells.forEach((cell) => (cell.textContent = ""));
    this.actualPlayer = "X";
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.winner = null;
  };

  winByRow = (row, board, player) =>
    board[row][0] === player &&
    board[row][1] === player &&
    board[row][2] === player;

  winByFirstRow = (board, player) => this.winByRow(0, board, player);
  winBySecondRow = (board, player) => this.winByRow(1, board, player);
  winByThirdRow = (board, player) => this.winByRow(2, board, player);

  winByColumn = (column, board, player) =>
    board[0][column] === player &&
    board[1][column] === player &&
    board[2][column] === player;

  winByFirstColumn = (board, player) => this.winByColumn(0, board, player);
  winBySecondColumn = (board, player) => this.winByColumn(1, board, player);
  winByThirdColumn = (board, player) => this.winByColumn(2, board, player);

  winByLeftX = (board, player) =>
    board[0][0] === player && board[1][1] === player && board[2][2] === player;
  winByRightX = (board, player) =>
    board[0][2] === player && board[1][1] === player && board[2][0] === player;

  checkGame = () => {
    if (
      this.winByFirstRow(this.board, this.actualPlayer) ||
      this.winBySecondRow(this.board, this.actualPlayer) ||
      this.winByThirdRow(this.board, this.actualPlayer) ||
      this.winByFirstColumn(this.board, this.actualPlayer) ||
      this.winBySecondColumn(this.board, this.actualPlayer) ||
      this.winByThirdColumn(this.board, this.actualPlayer) ||
      this.winByLeftX(this.board, this.actualPlayer) ||
      this.winByRightX(this.board, this.actualPlayer)
    ) {
      this.winner = this.actualPlayer;
    } else {
      this.togglePlayer();
    }

    return this.winner;
  };
}
