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
      const target = table.children[i].children[j];
      if (cellData > 0) {
        target.textContent = cellData;
        target.className = 'color-' + cellData;
      } else {
        target.textContent = "";
        target.className = "";
      }
    });
  });
}

startGame();

// data = [
//   [32, 2, 4, 2],
//   [64, 4, 8, 4],
//   [2, 1024, 1024, 32],
//   [32, 16, 64, 4],
// ];

function moveCells(direction) {
  switch (direction) {
    case 'left' : {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (rowData) {
            const currentRow = newData[i];
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === cellData) { // 이전 값과 지금 값이 같으면
              const score = parseInt(scoreBoard.textContent);
              scoreBoard.textContent = score + currentRow[currentRow.length - 1] * 2;
              currentRow[currentRow.length - 1] *= -2;
            } else {
              newData[i].push(cellData);
            }
          }
        });
      });
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[i][j] = Math.abs(newData[i][j]) || 0;
        });
      });
      console.log(data);
      break;
    }
    case 'right': {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (rowData[3 - j]) {
            const currentRow = newData[i]
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === rowData[3 - j]) {
              const score = parseInt(scoreBoard.textContent);
              scoreBoard.textContent = score + currentRow[currentRow.length - 1] * 2;
              currentRow[currentRow.length - 1] *= -2;
            } else {
              newData[i].push(rowData[3 - j]);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[i][3 - j] = Math.abs(newData[i][j]) || 0;
        });
      });
      break;
    }
    case 'up': {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (cellData) {
            const currentRow = newData[j]
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === cellData) {
              const score = parseInt(scoreBoard.textContent);
              scoreBoard.textContent = score + currentRow[currentRow.length - 1] * 2;
              currentRow[currentRow.length - 1] *= -2;
            } else {
              newData[j].push(cellData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((cellData, i) => {
        [1, 2, 3, 4].forEach((rowData, j) => {
          data[j][i] = Math.abs(newData[i][j]) || 0;
        });
      });
      break;
    }
    case 'down': {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (data[3 - i][j]) {
            const currentRow = newData[j];
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === data[3 - i][j]) {
              const score = parseInt(scoreBoard.textContent);
              scoreBoard.textContent = score + currentRow[currentRow.length - 1] * 2;
              currentRow[currentRow.length - 1] *= -2;
            } else {
              newData[j].push(data[3 - i][j]);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((cellData, i) => {
        [1, 2, 3, 4].forEach((rowData, j) => {
          data[3 - j][i] = Math.abs(newData[i][j]) || 0;
        });
      });
      break;
    }
  }
  if (data.flat().includes(2048)) { // 승리
    draw();
    setTimeout(() => {
      alert('축하합니다. 2048을 만들었습니다!');
    }, 0);
  } else if (!data.flat().includes(0)) { // 빈 칸이 없으면 패배
    alert(`패배했습니다... ${scoreBoard.textContent}점`);
  } else {
    put2ToRandomCell();
    draw();
  }
}

window.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowUp') {
    moveCells('up');
  } else if (event.key === 'ArrowDown') {
    moveCells('down');
  } else if (event.key === 'ArrowLeft') {
    moveCells('left');
  } else if (event.key === 'ArrowRight') {
    moveCells('right');
  }
});
