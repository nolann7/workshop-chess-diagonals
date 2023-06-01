export default {
  draw,
  highlight,
};

// ****************************

function draw(boardEl) {
  // TODO: draw the chessboard, 8 rows (divs)
  // of 8 tiles (divs) each, inserting all DOM
  // elements into `boardEl` div
  
  for (let i = 0; i < 8; i++) {
    let row = document.createElement('div');
    boardEl.append(row);

    for (let j = 0; j < 8; j++) {
      let tile = document.createElement('div');
      row.append(tile);
    }
  }
  console.log(boardEl);
}

function highlight(tileEl) {
  // TODO: clear previous highlights (if any) and
  // then find the tiles in the two diagonals
  // (major and minor) that `tileEl` belongs to,
  // to highlight them via CSS class "highlighted"
}
