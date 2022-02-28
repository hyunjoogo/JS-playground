'use strict';
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const errorText = document.getElementById('error');
const removeAllBtn = document.getElementById('clear-cards');
const cardsDisplay = document.getElementById('cards');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentActiveCard = 0;

function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

const cardsData = getCardsData();


debugger;


// function createCards() {
//   cardsData.forEach(()=> console.log())
// }
//
//
// const createCard = (data, index) => {
//   console.log(data, index);
// }
//
// const showNextCard = () => {
//
// }
//
// const addCard = (event) => {
//   const question = questionInput.value;
//   const answer = answerInput.value;
//
//   if (question === "" || answer === "") {
//     errorText.innerHTML = "질문과 답을 적어주세요.";
//     window.setTimeout(function () {
//       errorText.innerHTML = "";
//     }, 2000);
//   } else {
//     const newInput = {question: question.trim(), answer: answer.trim()};
//     cardsData.push(newInput);
//     localStorage.setItem("cards", JSON.stringify(cards));
//     questionInput.value = "";
//     answerInput.value = "";
//   }
// }
//
// const removeAllCards = () => {
//   localStorage.clear();
// }
//
// createCards();
//
// // 새로운 카드 내용 스토리지에 저장하기
// addCardBtn.addEventListener('click', addCard);
// // 모든 카드 제거하기
// removeAllBtn.addEventListener('click', removeAllCards);
// // 이전, 다음 카드 보여주기
// nextBtn.addEventListener('click', showNextCard);
