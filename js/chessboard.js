export default {
  draw,
  highlight,
};

// ****************************

function draw(boardEl) {
  for (let i = 0; i < 8; i++) {
    let row = document.createElement('div');
    row.dataset.row = i + 1;
    boardEl.append(row);

    for (let j = 0; j < 8; j++) {
      let tile = document.createElement('div');
      tile.dataset.position = `${i + 1}-${j + 1}`;
      row.append(tile);
    }
  }
}

function highlight(tileEl = null) {
  // clearing prev highlights:
  const boardEl = document.getElementById('board');
  const rows = boardEl.childNodes;
  for (const row of rows) {
    for (const tile of row.childNodes) {
      tile.classList.remove('highlighted');
    }
  }
  if (!tileEl) return;

  const [currentRow, currentColumn] = tileEl.dataset.position
    .split('-')
    .map(val => +val);

  const allCurrentDiagonalTiles = findAllDiagonals(currentRow, currentColumn);

  for (let [curRow, curCol] of allCurrentDiagonalTiles) {
    let position = `${curRow}-${curCol}`;
    let currentTile = document.querySelector(`[data-position="${position}"]`);
    currentTile.classList.add('highlighted');
  }

  function findAllDiagonals(currentRow, currentColumn) {
    const allPositions = [];
    findRecursive(currentRow, currentColumn, allPositions, 'main');
    return allPositions;
  }

  function findRecursive(currentRow, currentColumn, allPositions, path) {
    allPositions.push([currentRow, currentColumn]);

    const dNeighbors = {};
    if (
      (path == 'main' || path == 'topLeft') &&
      currentRow > 1 &&
      currentColumn > 1
    )
      dNeighbors.topLeft = [currentRow - 1, currentColumn - 1];
    if (
      (path == 'main' || path == 'topRight') &&
      currentRow > 1 &&
      currentColumn < 8
    )
      dNeighbors.topRight = [currentRow - 1, currentColumn + 1];
    if (
      (path == 'main' || path == 'bottomRight') &&
      currentRow < 8 &&
      currentColumn < 8
    )
      dNeighbors.bottomRight = [currentRow + 1, currentColumn + 1];
    if (
      (path == 'main' || path == 'bottomLeft') &&
      currentRow < 8 &&
      currentColumn > 1
    )
      dNeighbors.bottomLeft = [currentRow + 1, currentColumn - 1];

    for (const [key, value] of Object.entries(dNeighbors)) {
      findRecursive(value[0], value[1], allPositions, key);
    }
  }
}
