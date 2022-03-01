'use strict';
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const errorText = document.getElementById('error');
const removeAllBtn = document.getElementById('clear-cards');
const cardsDisplay = document.getElementById('cards');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const addContainer = document.getElementById('add-container');
const card = document.querySelector('.card');
const currentPage = document.getElementById('current');

// 현재 보여지고 있는 카드 번호
let currentActiveCard = 0;


// localstorage 자료 가지고 오는 함수
const getCardsData = () => {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
};

const cardsData = getCardsData();

const createCards = () => {
  const nowCard = cardsData[currentActiveCard];
  const card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('active');
  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <p>
        ${!nowCard ? "카드가 없습니다" : nowCard.question}
      </p>
    </div>
    <div class="inner-card-back">
      <p>
      ${!nowCard ? "카드가 없습니다" : nowCard.answer}
      </p>
    </div>
  </div>
  `;
  card.addEventListener('click', () => card.classList.toggle('show-answer'));
  cardsDisplay.append(card);
  updateCurrentText();

};

const updateCurrentText = () => {
  if (!cardsData[currentActiveCard]) {
    return
  }
  currentPage.innerText = `${currentActiveCard + 1}/${cardsData.length}`;
};

const showNextCard = () => {
  if (!cardsData[currentActiveCard]) {
    return
  }
  if (currentActiveCard === cardsData.length - 1) {
    return alert('마지막 카드입니다');
  } else {
    const card = document.querySelector('.card');
    cardsDisplay.removeChild(card);
    currentActiveCard++;
    createCards();
  }
};

const showPrevCard = () => {
  if (!cardsData[currentActiveCard]) {
    return
  }
  if (currentActiveCard === 0) {
    return alert('처음 카드입니다');
  } else {
    const card = document.querySelector('.card');
    cardsDisplay.removeChild(card);
    currentActiveCard--;
    createCards();
  }
};

const addCard = () => {
  const question = questionInput.value;
  const answer = answerInput.value;

  if (question === "" || answer === "") {
    errorText.innerHTML = "질문과 답을 적어주세요.";
    window.setTimeout(function () {
      errorText.innerHTML = "";
    }, 2000);
  } else {
    const newInput = {question: question.trim(), answer: answer.trim()};
    cardsData.push(newInput);
    localStorage.setItem("cards", JSON.stringify(cardsData));
    window.location.reload();
  }
};

const removeAllCards = () => {
  localStorage.clear();
  window.location.reload();
};

createCards();

// 새로운 카드 내용 스토리지에 저장하기
addCardBtn.addEventListener('click', addCard);
// 모든 카드 제거하기
removeAllBtn.addEventListener('click', removeAllCards);
// 이전, 다음 카드 보여주기
nextBtn.addEventListener('click', showNextCard);
prevBtn.addEventListener('click', showPrevCard);
// 새로운 카드 입력 화면 나오게 하기
showBtn.addEventListener('click', () => addContainer.classList.add('show'));
// 본래화면 나오게 하기
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));
