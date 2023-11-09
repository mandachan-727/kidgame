document.addEventListener("DOMContentLoaded", function() {
    const titleContainer = document.querySelector(".title-container");
    const gameContainer = document.querySelector(".game-container");
    const playButton = document.getElementById("play-button");
    const leftButton = document.getElementById("left-button");
    const rightButton = document.getElementById("right-button");
    const equalButton = document.getElementById("equal-button");
    const result = document.getElementById("result");
    const tryAgainButton = document.getElementById("try-again-button");
    const newGameButton = document.getElementById("new-game-button");
    const leftSide = document.querySelector(".left");
    const rightSide = document.querySelector(".right");

    let gameStarted = false;

    let questionType = getRandomQuestionType();
  
    playButton.addEventListener("click", startGame);
    leftButton.addEventListener("click", checkAnswer.bind(null, "left"));
    rightButton.addEventListener("click", checkAnswer.bind(null, "right"));
    equalButton.addEventListener("click", checkAnswer.bind(null, "equal"));
    tryAgainButton.addEventListener("click", tryAgain);
    newGameButton.addEventListener("click", startGame);

    function startGame() {
        gameStarted = true;
        leftSide.classList.remove("highlight");
        rightSide.classList.remove("highlight");
        titleContainer.style.display = "none";
        gameContainer.style.display = "flex";
        newRound();
    }

  function getRandomQuestionType() {
      return Math.random() < 0.5 ? "more" : "fewer";
  }
  
  function newRound() {
      questionType = getRandomQuestionType();
      const leftCount = getRandomCount();
      const rightCount = getRandomCount();

      //const questionType = getRandomQuestionType(); // Declare questionType for the current round.

      if (questionType === "more") {
          result.textContent = "Which side has more strawberries?";
      } else {
          result.textContent = "Which side has fewer strawberries?";
      }

      displayStrawberryIcons("left-icons", leftCount);
      displayStrawberryIcons("right-icons", rightCount);
  }

  function checkAnswer(selectedSide) {
      if (!gameStarted) return;

      const leftCount = parseInt(document.getElementById("left-icons").children.length);
      const rightCount = parseInt(document.getElementById("right-icons").children.length);
      let correctSide = "";

      if (leftCount === rightCount) {
          correctSide = "equal";
      } else {
          if (questionType === "more") {
              correctSide = leftCount > rightCount ? "left" : "right";
          } else {
              correctSide = leftCount < rightCount ? "left" : "right";
          }
      }

      if (selectedSide === correctSide) {
          result.textContent = "Good job!";
          tryAgainButton.style.display = "none";
          newGameButton.style.display = "block";
          if (correctSide !== "equal") {
              highlightSide(correctSide);
          }
      } else {
          result.textContent = "Try Again!";
          tryAgainButton.style.display = "block";
          newGameButton.style.display = "none";
      }
  }



    function tryAgain() {
        result.textContent = "";
        leftSide.classList.remove("highlight");
        rightSide.classList.remove("highlight");
        newRound();
    }

    function getRandomCount() {
        return Math.floor(Math.random() * 10) + 1;
    }

    function displayStrawberryIcons(containerId, count) {
        const container = document.getElementById(containerId);
        container.innerHTML = "";
  
        for (let i = 0; i < count; i++) {
            const strawberryIcon = document.createElement("img");
            strawberryIcon.src = "https://mandachan-727.github.io/kidgame/berri.png"; // Replace with your file path.
            container.appendChild(strawberryIcon);
        }
    }


    function highlightSide(side) {
        const sideElement = document.querySelector(`.${side}`);
        sideElement.classList.add("highlight");
    }
});
