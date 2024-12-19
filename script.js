const players = ["X", "O"];
let currentPlayer = players[0];
const board = document.getElementById("board");
const squares = document.querySelectorAll(".square");
const message = document.getElementById("message");
const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");

const winSquares = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let scores = { X: 0, O: 0 };

board.addEventListener("click", function (event) {
  removeSquareBackGround(); // Clear colors before next action
  const currentSquare = event.target.closest(".square");
  if (!currentSquare || currentSquare.textContent !== "") {
    return;
  }
  currentSquare.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    scores[currentPlayer]++;
    updateScoreboard();
    message.textContent = `${currentPlayer} wins this round!`;
    setTimeout(resetBoard, 2000);
    return;
  }

  if (checkTie()) {
    message.textContent = "It's a tie!";
    setTimeout(resetBoard, 2000);
    return;
  }

  currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  message.textContent = `${currentPlayer}'s turn!`;
  squareBackGroundColor(currentPlayer); // Apply new colors
});

function checkWin(currentPlayer) {
  return winSquares.some(
    ([a, b, c]) =>
      squares[a].textContent === currentPlayer &&
      squares[b].textContent === currentPlayer &&
      squares[c].textContent === currentPlayer
  );
}

function checkTie() {
  return [...squares].every((square) => square.textContent !== "");
}

function resetBoard() {
  squares.forEach((square) => {
    square.textContent = "";
    square.classList.remove("red", "green"); // Clear all colors
  });
  if (scores.X >= 3 || scores.O >= 3) {
    message.textContent = `Game Over! ${
      scores.X >= 3 ? "X" : "O"
    } wins the game!`;
    board.removeEventListener("click", playGame);
  } else {
    currentPlayer = players[0];
    message.textContent = `${currentPlayer}'s turn!`;
    squareBackGroundColor(currentPlayer);
  }
}

function resetGame() {
  scores = { X: 0, O: 0 };
  updateScoreboard();
  resetBoard();
  message.textContent = `X's turn!`;
}

function updateScoreboard() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

function removeSquareBackGround() {
  squares.forEach((ele) => {
    ele.classList.remove("red", "green"); // Clear only unplayed squares
  });
}

function squareBackGroundColor(player) {
  squares.forEach((ele) => {
    if (ele.textContent.trim() === "") {
      ele.classList.add(player === "X" ? "red" : "green");
    }
  });
}
