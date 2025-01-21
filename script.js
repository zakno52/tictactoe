const tictactoe = (function XOGame() {
  // 1- Variables ---------------------------
  let choiceOne = "X";
  let winning = "winningX";
  const switchBtn = document.querySelector(".switch");
  const XOBtns = document.querySelectorAll("#chooseBtn");
  const squares = document.querySelectorAll("td");
  const introSection = document.querySelector(".introToggle");
  const restartSection = document.querySelector(".restartSection");
  let winText = document.querySelector(".winText");
  const winPossibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let player1 = [];
  let player2 = [];

  // 2- Events -------------------------------
  function addEventToButtons() {
    // for switch Button
    switchBtn.addEventListener("click", () => switchChoice());

    // for restart button
    restartSection.addEventListener("click", () => resetGame());
  }

  function addEventToEachBox() {
    squares.forEach((square, index) => {
      square.addEventListener("click", () => {
        handleButtonClick(square, index);
        checkWinner();
      });
    });
  }

  // 3- handlers - Show results ------------------------------
  function switchChoice() {
    XOBtns[1].classList.toggle("clicked2");
    XOBtns[0].classList.toggle("clicked");
    choiceOne = choiceOne === "X" ? "O" : "X";
  }

  // gameBoard handler
  function handleButtonClick(square, index) {
    // show reset button when game starts
    restartSection.style.opacity = "1";
    introSection.style.top = "0";
    introSection.style.pointerEvents = "none";
    // symbols
    const xMark = square.firstElementChild;
    const oMark = square.lastElementChild;

    // toggle symbols + tracking game
    if (choiceOne === "X") {
      xMark.classList.add("showMark");
      square.style.pointerEvents = "none";
      choiceOne = "O";
      player1.push(index);
      player1.sort();
    } else {
      oMark.classList.add("showMark");
      square.style.pointerEvents = "none";
      choiceOne = "X";
      player2.push(index);
      player2.sort();
    }
  }

  // Check winner
  function checkWinner() {
    const playersNames = document.querySelectorAll(".playerInput");

    if (player1.length >= 3 || player2.length >= 3) {
      let winCoordinates = winPossibilities.find(
        (winCombo) =>
          winCombo.every((num) => player1.includes(num)) ||
          winCombo.every((num) => player2.includes(num))
      );

      if (winCoordinates !== undefined) {
        if (choiceOne === "O") {
          winText.innerHTML = `X Win`;
          winning = "winningX";

          console.log(player1, player2);
        } else {
          winText.innerHTML = `O Win`;
          winning = "winningO";

          console.log(player1, player2);
        }

        for (let index = 0; index < winCoordinates.length; index++) {
          squares[winCoordinates[index]].classList.add(winning);
        }
        squares.forEach((square) => {
          square.style.pointerEvents = "none";
        });

        winText.style.display = "block";
      }
    }
  }

  // restart button handler
  function resetGame() {
    player1.length = 0;
    player2.length = 0;

    squares.forEach((square) => {
      square.firstElementChild.classList.remove("showMark");
      square.lastElementChild.classList.remove("showMark");
      square.style.pointerEvents = "auto";
      square.classList.remove(winning);
    });
    restartSection.style.opacity = "0";
    introSection.style.top = "2rem";
    winText.style.display = "none";
    introSection.style.pointerEvents = "auto";
    // choiceOne = XOBtns[0].classList[0] === "clicked" ? "O" : "X";
  }

  return {
    init() {
      addEventToButtons();
      addEventToEachBox();
    },
  };
})();

tictactoe.init();
