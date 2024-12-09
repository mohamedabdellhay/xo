console.log("start app...");
const board = document.getElementById("board");
const players = ["X", "O"];
let currentPlayer = players[0];
const squares = document.querySelectorAll(".square");

board.addEventListener("click", function (event) {
  const currentSquare = event.target.closest(".square");
  if (currentSquare) {
    if (currentSquare.textContent.trim() != "") {
      return;
    }
    currentSquare.textContent = currentPlayer;
    currentPlayer === players[0]
      ? (currentPlayer = players[1])
      : (currentPlayer = players[0]);
  }

  const data = Object.values(squares);
  squares.forEach((ele) => {
    console.log(ele);
  });
  console.log(data);
});

function restartButton() {
  squares.forEach((ele) => (ele.textContent = ""));
}
