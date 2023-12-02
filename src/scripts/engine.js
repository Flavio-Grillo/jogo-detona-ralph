const state = {
    view: {
      squares: document.querySelectorAll(".square"),
      enemy: document.querySelector(".enemy"),
      timeLeft: document.querySelector("#time-left"),
      score: document.querySelector("#score"),
      livesDisplay:  document.querySelector("#lives"),
    },
    values: {
      gameVelocity: 1000,
      hitPosition: 0,
      result: 0,
      curretTime: 60,
      lives: 5,
    },
    actions: {
      timerId: setInterval(randomSquare, 1000),
      countDownTimerId: setInterval(countDown, 1000),
    },
  };
  
  function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;
  
    if (state.values.curretTime <= 0) {
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.timerId);
      alert("Game Over! O seu resultado foi: " + state.values.result);
    }
  }
  
  function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.mp4`);
    audio.volume = 0.08;
    audio.play();
  }
  
  function randomSquare() {
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
  
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
  }
  

  function resetGame() {
    state.values.hitPosition = 0;
    state.values.result = 0;
    state.values.curretTime = 60;
    state.values.lives = 5;
  
    state.view.score.textContent = state.values.result;
    state.view.timeLeft.textContent = state.values.curretTime;
    state.view.livesDisplay.textContent = state.values.lives;
  
    state.actions.timerId = setInterval(randomSquare, 1000);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
  }


function loseLife() {
  state.values.lives--;
  if (state.view.livesDisplay) {
    state.view.livesDisplay.textContent = state.values.lives;
  }

  if (state.values.lives <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    clearInterval(state.values.lives);
    clearInterval(state.view.livesDisplay);
    alert("Game Over! O seu resultado foi: " + state.values.result);
    resetGame();
  }
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.classList.contains("enemy")) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      } else {
        loseLife();
      }
    });
  });
}
  function initialize() {
    addListenerHitBox();

  }
  
  initialize();