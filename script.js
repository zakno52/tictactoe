const tictactoe = (function XOGame() {
  // Variables
  const data = [];
  const cooseBtns = document.querySelectorAll("#chooseBtn");

  // Events
  function addEventToChooseBtns() {
    cooseBtns.forEach((choosebtn) => {
      choosebtn.addEventListener("click", () => saveChoice(choosebtn));
    });
  }

  function addEventToEachBox() {
    const squares = document.querySelectorAll("td");
    squares.forEach((square) => {
      square.addEventListener("click", () => handleButtonClick(square));
    });
  }
  // handler - Show results

  function saveChoice(choosebtn) {
    const choice = choosebtn.textContent;
    data[0] = choice;
    console.log(data);
  }

  function handleButtonClick(square) {
    // data.push(square);
    const xMark = square.firstElementChild;
    const oMark = square.lastElementChild;
    if (data[0] === "X") {
      xMark.style.display = "block";
    } else {
      oMark.style.display = "block";
    }
  }

  return {
    init() {
      addEventToChooseBtns();
      addEventToEachBox();
    },
  };
})();

tictactoe.init();
