const input = document.getElementById('input');
const remainTime = document.getElementById('remainTime');
const scoreBoard = document.getElementById('scoreBoard');
const word = document.getElementById('word');
const gameOverContainer = document.querySelector(".gameOver-container");
const gameContainer = document.querySelector(".container");

let INITIAL_TIME ;
let randomWord;
let timer;
let score ;

const words = [ '김현주', '김키유', '메롱', '축구', '우에', '거지', '아자', '야구'];

const getUserInput = (event) => {
  const userInput = event.target.value;
  event.preventDefault();
  if (randomWord === userInput) {
    score++;
    INITIAL_TIME += 3;
    input.value = "";
    addWordToDOM()
  }
};

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  INITIAL_TIME--;
  console.log(INITIAL_TIME);
  remainTime.innerText = `남은 시간 ${INITIAL_TIME}`;
  scoreBoard.innerText = `스코어 ${score}`;
  if (INITIAL_TIME === 0) {
    gameOver()
  }
}

const gameOver = () => {
  clearInterval(timer);
  const p = document.createElement("p");
  p.innerText = `${score}점`;
  gameOverContainer.appendChild(p);
  const button = document.createElement("button");
  button.addEventListener('click', gameStart);
  button.innerText = "다시하기";
  gameOverContainer.appendChild(button);
  gameOverContainer.classList.add("gameOver");
  gameContainer.classList.add("gameOver");
}

const gameStart = () => {
  gameOverContainer.classList.remove("gameOver");
  gameContainer.classList.remove("gameOver");
  INITIAL_TIME= 10;
  score = 0;
  addWordToDOM()
  input.focus()
  startTimer();
}

gameStart();
input.addEventListener('input', getUserInput);


// 입력값을 받아서
// 제시어랑 비교
