const tictactoe = (function XOGame() {
  // 1- Variables ---------------------------
  let data = "X";
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
    // toggle bottuns underline style
    (function toggleswitchBtnStyle() {
      if (data === "X") {
        XOBtns[1].classList.add("clicked");
        XOBtns[1].innerHTML = "X";
        XOBtns[0].classList.remove("clicked");
        XOBtns[0].innerHTML = "O";
        data = "O";
      } else {
        XOBtns[0].classList.add("clicked");
        XOBtns[0].innerHTML = "X";
        XOBtns[1].classList.remove("clicked");
        XOBtns[1].innerHTML = "O";
        data = "X";
      }
    })();
  }

  // gameBoard handler
  function handleButtonClick(square, index) {
    // show reset button when game starts
    introSection.style.display = "none";
    restartSection.style.display = "block";
    // symbols
    const xMark = square.firstElementChild;
    const oMark = square.lastElementChild;

    // toggle symbols + tracking game
    if (data === "X") {
      xMark.classList.add("showMark");
      square.style.pointerEvents = "none";
      data = "O";
      player1.push(index);
      player1.sort();
    } else {
      oMark.classList.add("showMark");
      square.style.pointerEvents = "none";
      data = "X";
      player2.push(index);
      player2.sort();
    }
  }
  // Check winner
  function checkWinner() {
    if (player1.length >= 3 || player2.length >= 3) {
      let winCoordinates = winPossibilities.find(
        (winCombo) =>
          winCombo.every((num) => player1.includes(num)) ||
          winCombo.every((num) => player2.includes(num))
      );

      if (winCoordinates !== undefined) {
        for (let index = 0; index < winCoordinates.length; index++) {
          squares[winCoordinates[index]].classList.add("winning");
        }
        squares.forEach((square) => {
          square.style.pointerEvents = "none";
        });
        if (data === "X") {
          data = "O";
          winText.innerHTML = `O Win`;
        } else {
          data = "X";
          winText.innerHTML = `X Win`;
        }
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
      square.classList.remove("winning");
    });
    restartSection.style.display = "none";
    introSection.style.display = "flex";
    winText.style.display = "none";
  }

  return {
    init() {
      addEventToButtons();
      addEventToEachBox();
    },
  };
})();

tictactoe.init();
