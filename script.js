// console.log("start app...");
// const players = ["X", "O"];
// let currentPlayer = players[0];
// const board = document.getElementById("board");
// const squares = document.querySelectorAll(".square");
// const message = document.getElementById("message");
// const winSquares = [
//   [0, 1, 2],
//   [0, 3, 6],
//   [0, 4, 8],
//   [1, 4, 7],
//   [2, 5, 8],
//   [3, 4, 5],
//   [6, 7, 8],
// ];

// board.addEventListener("click", function (event) {
//   const currentSquare = event.target.closest(".square");
//   if (!currentSquare || currentSquare.textContent !== "") {
//     return;
//   }
//   currentSquare.textContent = currentPlayer;

//   if (checkWin(currentPlayer)) {
//     message.textContent = `Game over! ${currentPlayer} wins!`;
//     return;
//   }

//   if (checkTie()) {
//     if (checkLastThird(squares, currentPlayer)) {
//       console.log(
//         `${currentPlayer}'s symbol is in the last third position on the board.`
//       );
//     } else {
//       console.log(
//         `${currentPlayer}'s symbol is NOT in the last third position on the board.`
//       );
//     }
//     message.textContent = `Game over! It's a tie!`;
//     return;
//   }

//   currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
//   message.textContent = `${currentPlayer}'s turn!`;
// });

// function restartButton() {
//   squares.forEach((ele) => (ele.textContent = ""));
//   currentPlayer = players[0];
//   message.textContent = `X's turn!`;
// }

// function checkWin(currentPlayer) {
//   for (let i = 0; i < winSquares.length; i++) {
//     const [a, b, c] = winSquares[i];
//     if (
//       squares[a].textContent === currentPlayer &&
//       squares[b].textContent === currentPlayer &&
//       squares[c].textContent === currentPlayer
//     ) {
//       return true;
//     }
//   }
//   return false;
// }

// function checkTie() {
//   for (let i = 0; i < squares.length; i++) {
//     if (squares[i].textContent === "") {
//       return false;
//     }
//   }
//   return true;
// }

// function checkLastThird(squares, symbol) {
//   if (squares.length < 3) {
//     console.log("Not enough squares to check.");
//     return false;
//   }

//   const lastThirdIndex = squares.length - 3;
//   const lastThirdElement = squares[lastThirdIndex];
//   lastThirdElement.textContent = "";
//   console.log(
//     `Last third element (${lastThirdIndex}):`,
//     lastThirdElement.textContent
//   );

//   return lastThirdElement.textContent.trim() === symbol;
// }

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
// squares.forEach((ele) => {
//   ele.addEventListener("hover", () => {
//     squareBackGroundColor(currentPlayer);
//   });
// });
squareBackGroundColor(currentPlayer);

board.addEventListener("click", function (event) {
  squareBackGroundColor(currentPlayer);
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
  squareBackGroundColor(currentPlayer);
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
  squares.forEach((square) => (square.textContent = ""));
  if (scores.X >= 3 || scores.O >= 3) {
    message.textContent = `Game Over! ${scores.X >= 3 ? "X" : "O"} wins!`;
    board.removeEventListener("click", playGame);
  } else {
    currentPlayer = players[0];
    message.textContent = `${currentPlayer}'s turn!`;
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
    if (ele.textContent.trim() !== "") {
      ele.classList.remove("red", "green");
    }
  });
}
function squareBackGroundColor(player) {
  //   removeSquareBackGround();
  squares.forEach((ele) => {
    if (ele.textContent.trim() === "") {
      if (player === "X") {
        ele.classList.toggle("red");
      } else {
        ele.classList.toggle("green");
      }
    }
  });
}
