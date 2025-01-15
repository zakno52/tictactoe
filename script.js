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
    data.push(square);
    console.log(data);
  }

  return {
    init() {
      addEventToChooseBtns();
      addEventToEachBox();
    },
  };
})();

tictactoe.init();
