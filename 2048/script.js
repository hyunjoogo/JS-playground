const table = document.getElementById("table");
const scoreBoard = document.getElementById("score");

let data = [];

function startGame() {
  const fragment = document.createDocumentFragment();
  [1, 2, 3, 4].forEach(function () {
    const rowData = [];
    data.push(rowData);
    const tr = document.createElement("tr");
    [1, 2, 3, 4].forEach(function () {
      rowData.push(0);
      const td = document.createElement("td");
      tr.appendChild(td);
    });
    fragment.appendChild(tr);
  });
  table.appendChild(fragment);
  console.log('초기 data : ', data);
  put2ToRandomCell();
  draw();
}

function put2ToRandomCell() {
  const emptyCells = []; // [[0, 0], [0, 1], ... ,[1, 0], [1, 1], ..., [3, 3]]
  data.forEach(function (rowData, i) { // i : 줄
    rowData.forEach(function (cellData, j) { // j : 칸
      // cellData가 0 이면
      if (!cellData) {
        emptyCells.push([i, j]);
      }
    });
  });
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  data[randomCell[0]][randomCell[1]] = 2; // data의 i줄, j칸에 2를 넣어라
}

function draw() {
  data.forEach((rowData, i) => {
    console.log(rowData, i);
    rowData.forEach((cellData, j) => {
      console.log(cellData, j);
      const target = table.children[i].children[j];
      if (cellData > 0) {
        target.textContent = cellData;
        target.className = 'color-' + cellData;
      } else {
        target.textContent = "";
        target.className = "";
      }
    })
  })
}

startGame();
