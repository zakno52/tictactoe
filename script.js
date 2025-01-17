const tictactoe = (function XOGame() {
  // Variables
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

  // Events
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
      square.addEventListener("click", () => handleButtonClick(square, index));
    });
  }
  // handler - Show results

  function saveChoice(choosebtn) {
    const choice = choosebtn.textContent;
    data[0] = choice;
    console.log(data);

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

  function handleButtonClick(square, index) {
    clickCount++;
    if (clickCount % 2 === 1) {
      // Odd click
      player1.push(index);
      console.log("Array1:", player1);
    } else {
      // Even click
      player2.push(index);
      console.log("Array2:", player2);
    }

    introSection.style.display = "none";
    restartButton.style.display = "block";
    // data.push(square);
    const xMark = square.firstElementChild;
    const oMark = square.lastElementChild;
    if (data[0] === "X") {
      xMark.style.display = "block";
    } else {
      oMark.style.display = "block";
    }
  }

  function resetGame() {
    data.length = 0;
    data[0] = "X";
    squares.forEach((square) => {
      square.firstElementChild.style.display = "none";
      square.lastElementChild.style.display = "none";
    });
    restartButton.style.display = "none";
    introSection.style.display = "block";
  }

  // Check winner

  return {
    init() {
      addEventToButtons();
      addEventToEachBox();
    },
  };
})();

tictactoe.init();
