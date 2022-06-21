
/**
 * Returns a side-index where the cell is empty:
 * 0 1 2
 * 3 4 5
 * 6 7 8
 */
 findEmptySide = function(board) {
  if (!board[1]) { return 1; }
  if (!board[5]) { return 5; }
  if (!board[7]) { return 7; }
  if (!board[3]) { return 3; }
  return null;
}

/**
 * Returns a corner-index where the cell is empty:
 * 0 1 2
 * 3 4 5
 * 6 7 8
 */
 findEmptyCorner = function(board) {
  if (!board[0]) { return 0; }
  if (!board[2]) { return 2; }
  if (!board[6]) { return 6; }
  if (!board[8]) { return 8; }
  return null;
}

/**
 * Returns a corner-index where the cell is empty, but the opposite cell is taken by the player:
 * 0 1 2
 * 3 4 5
 * 6 7 8
 */
 findOppositeCorner = function(board, player) {
  if (board[0] === player && !board[8]) { return 8; }
  if (board[8] === player && !board[0]) { return 0; }
  if (board[2] === player && !board[6]) { return 6; }
  if (board[6] === player && !board[2]) { return 2; }
  return null;
}

/**
 * Returns the index where one a move would create a win opportunity, or null
 */
 findOneInARow = function(board, player) {
  // check horizontal
  for (var i = 0; i < 9; i+=3) {
    let index = this.isOneInARow(board, i, i+1, i+2, player);
    if (index || index === 0) { return index; }
  }
  
  // check vertical
  for (var i = 0; i < 3; i++) {
    let index = this.isOneInARow(board, i, i+3, i+6, player);
    if (index || index === 0) { return index; }
  }
  
  // check diagonals
  let index = this.isOneInARow(board, 0, 4, 8, player);
  if (index || index === 0) { return index; }
  
  index = this.isOneInARow(board, 2, 4, 6, player);
  if (index || index === 0) { return index; }

  return null;
}

/*
 * Returns null if there isn't only one chars which is the same as player.
 * Returns the index where one a move would create a win opportunity.
 */
isOneInARow = function(board, a, b, c, player) {
  if (board[a] === board[b] && !board[a] && board[c] === player) {
    return b;
  }
  if (board[a] === board[c] && !board[a] && board[b] === player) {
    return a;
  }
  if (board[b] === board[c] && !board[b] && board[a] === player) {
    return b;
  }
  return null;
}

/**
 * Returns the index where one a move would lead to a win, or null
 */
 findTwoInARow = function(board, player) {
  // check horizontal
  for (var i = 0; i < 9; i+=3) {
    let index = this.isTwoInARow(board, i, i+1, i+2, player);
    if (index || index === 0) { return index; }
  }
  
  // check vertical
  for (var i = 0; i < 3; i++) {
    let index = this.isTwoInARow(board, i, i+3, i+6, player);
    if (index || index === 0) { return index; }
  }

  // check diagonals
  let index = this.isTwoInARow(board, 0, 4, 8, player);
  if (index || index === 0) { return index; }
  
  index = this.isTwoInARow(board, 2, 4, 6, player);
  if (index || index === 0) { return index; }

  return null;
}

/*
 * Returns null if there aren't only two chars which are the same as player.
 * Returns the index where one a move would lead to a win.
 */
isTwoInARow = function(board, a, b, c, player) {
  if (board[a] === board[b] && !board[c] && board[a] === player) {
    return c;
  }
  if (board[a] === board[c] && !board[b] && board[a] === player) {
    return b;
  }
  if (board[b] === board[c] && !board[a] && board[b] === player) {
    return a;
  }
  return null;
}

/**
 * Returns winning char. 
 * Returns 'D' if draw. 
 * Returns null, if no one won.
 */
 getWinner = function(board) {  
  // check horizontal
  for (var i = 0; i < 9; i+=3) {
    let winner = this.isWinningRow(board[i], board[i+1], board[i+2]);
    if (winner) { return winner; }
  }
  
  // check vertical
  for (var i = 0; i < 3; i++) {
    let winner = this.isWinningRow(board[i], board[i+3], board[i+6]);
    if (winner) { return winner; }
  }

  // check diagonals
  let winner = this.isWinningRow(board[0], board[4], board[8]);
  if (winner) { return winner; }
  
  winner = this.isWinningRow(board[2], board[4], board[6]);
  if (winner) { return winner; }

  // check if board is full
  for (var i = 0; i < 9; i++) {
    if (!board[i]) {
      return null;
    }
  }
  return 'D';
}

/**
 * returns winning char or null if no one has won
 */
 isWinningRow = function(a, b, c) {
  return a === b && a === c ? a : null;
}

module.exports = {
  findEmptySide,
  findEmptyCorner,
  findOppositeCorner,
  findOneInARow,
  isOneInARow,
  findTwoInARow,
  isTwoInARow,
  getWinner,
  isWinningRow,
}