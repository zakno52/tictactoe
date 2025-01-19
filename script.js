const tictactoe = (function XOGame() {
  // 1- Variables
  const data = ["X"];
  const chooseBtns = document.querySelectorAll("#chooseBtn");
  const squares = document.querySelectorAll("td");
  const introSection = document.querySelector(".introToggle");
  const restartButton = document.querySelector(".restartButton");
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
  let clickCount = 0;

  // 2- Events
  function addEventToButtons() {
    // for x-o Buttons
    chooseBtns.forEach((choosebtn) => {
      choosebtn.addEventListener("click", () => saveChoice(choosebtn));
    });

    // for restart button
    restartButton.addEventListener("click", () => resetGame());
  }

  function addEventToEachBox() {
    squares.forEach((square, index) => {
      square.addEventListener("click", () => {
        handleButtonClick(square, index);
        checkWinner();
      });
    });
  }

  // 3- handlers - Show results
  function saveChoice(choosebtn) {
    const choice = choosebtn.textContent;
    data[0] = choice;

    // toggle bottuns underline style
    (function toggleChooseBtnsStyle() {
      if (data[0] === "X") {
        chooseBtns[0].classList.add("clicked");
        chooseBtns[1].classList.remove("clicked");
      } else {
        chooseBtns[1].classList.add("clicked");
        chooseBtns[0].classList.remove("clicked");
      }
    })();
  }

  // gameBoard handler
  function handleButtonClick(square, index) {
    // show reset button when game starts
    introSection.style.display = "none";
    restartButton.style.display = "block";
    // symbols
    const xMark = square.firstElementChild;
    const oMark = square.lastElementChild;

    if (data[0] === "X") {
      xMark.style.display = "block";
      square.style.pointerEvents = "none";
      data[0] = "O";
    } else if (data[0] === "O") {
      oMark.style.display = "block";
      square.style.pointerEvents = "none";
      data[0] = "X";
    }

    // tracking Game
    clickCount++;
    if (clickCount % 2 === 1) {
      // Odd click
      player1.push(index);
      player1.sort();
    } else {
      // Even click
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
        let winText = document.createElement("div");
        winText.innerHTML = `${data[0]} Win`;
        restartButton.after(winText);
      }
    }
  }

  // restart button handler
  function resetGame() {
    data.length = 1;
    player1.length = 0;
    player2.length = 0;

    squares.forEach((square) => {
      square.firstElementChild.style.display = "none";
      square.lastElementChild.style.display = "none";
      square.style.pointerEvents = "auto";
      square.classList.remove("winning");
    });
    restartButton.style.display = "none";
    introSection.style.display = "flex";
  }

  return {
    init() {
      addEventToButtons();
      addEventToEachBox();
    },
  };
})();

tictactoe.init();
