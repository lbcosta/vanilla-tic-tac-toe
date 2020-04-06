const cells = document.querySelectorAll("td");
const winnerBanner = document.querySelector(".winner");

let state = {
  player: "X",
  table: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  winner: null,
};

function togglePlayer() {
  if (state.player === "X") {
    state.player = "O";
  } else {
    state.player = "X";
  }
}

const winByRow = (row, table, player) =>
  table[row][0] === player &&
  table[row][1] === player &&
  table[row][2] === player;

const winByFirstRow = (table, player) => winByRow(0, table, player);
const winBySecondRow = (table, player) => winByRow(1, table, player);
const winByThirdRow = (table, player) => winByRow(2, table, player);

const winByColumn = (column, table, player) =>
  table[0][column] === player &&
  table[1][column] === player &&
  table[2][column] === player;

const winByFirstColumn = (table, player) => winByColumn(0, table, player);
const winBySecondColumn = (table, player) => winByColumn(1, table, player);
const winByThirdColumn = (table, player) => winByColumn(2, table, player);

const winByLeftX = (table, player) =>
  table[0][0] === player && table[1][1] === player && table[2][2] === player;
const winByRightX = (table, player) =>
  table[0][2] === player && table[1][1] === player && table[2][0] === player;

function checkWinner() {
  const { table, player } = state;

  if (
    winByFirstRow(table, player) ||
    winBySecondRow(table, player) ||
    winByThirdRow(table, player) ||
    winByFirstColumn(table, player) ||
    winBySecondColumn(table, player) ||
    winByThirdColumn(table, player) ||
    winByLeftX(table, player) ||
    winByRightX(table, player)
  ) {
    state.winner = player;
    winnerBanner.textContent = `${player} wins!`;
    reset();
    setTimeout(() => {
      winnerBanner.textContent = "";
    }, 1500);
  } else {
    togglePlayer();
  }
}

function reset() {
  cells.forEach((cell) => (cell.textContent = ""));
  state = {
    player: "X",
    table: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    winner: null,
  };
}

cells.forEach((cell) => {
  cell.addEventListener("click", ({ target }) => {
    if (!target.textContent) {
      target.textContent = state.player;

      const [_, row, column] = target.className.split("");
      state.table[row][column] = state.player;
      console.log(state.table);
      checkWinner();
    }
  });
});
