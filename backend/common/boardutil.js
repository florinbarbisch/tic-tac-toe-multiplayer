
/**
 * Heavily complicated over-engineered ai (just a bunch of if's)
 */
 aiMove = function(board, difficulty) {
  if (!['Easy', 'Medium', 'Impossible'].includes(difficulty)) {
    throw new Error("invalid difficulty");
  }

  let index = null; // fall-through cases

  switch (difficulty) {
    case 'Impossible':
      // 1. Win: If you have two in a row, play the third to get three in a row.
      index = findTwoInARow(board, 'O');
      if (index || index === 0) {
        //console.log(1);
        return index;
      }
      
      // 2. Block: If the opponent has two in a row, play the third to block them.
      index = findTwoInARow(board, 'X');
      if (index || index === 0) {
        //console.log(2);
        return index;
      }
    case 'Medium':
      // 3. Empty Corner: Play an empty corner that has two adjacent X.
      index = findEmptyEncircledCorner(board, 'X');
      if (index || index === 0) {
        //console.log(7);
        return index;
      }
      
      // 4. Create Winning Oppurtunity: Create an opportunity where you can win.
      index = findOneInARow(board, 'O');
      if (index || index === 0) {
        //console.log(3);
        return index;
      }

      /*
      // 5. Block Winning Oppurtunity: Block an opportunity where the opponent can win.
      index = findOneInARow(board, 'X');
      if (index || index === 0) {
        return index;
      }
      */
    case 'Easy':
      // 6. Center: Play the center.
      if (!board[4]) {
        //console.log(5);
        return 4;
      }

      // 7. Opposite Corner: If the opponent is in the corner, play the opposite corner.
      index = findOppositeCorner(board, 'X');
      if (index || index === 0) {
        //console.log(6);
        return index;
      }
      
      // 8. Empty Corner: Play an empty corner.
      index = findEmptyCorner(board);
      if (index || index === 0) {
        //console.log(8);
        return index;
      }

      // 9. Empty Side: Play an empty side.
      index = findEmptySide(board);
      if (index || index === 0) {
        //console.log(9);
        return index;
      }
  }

  // 10000. if ai got to here something went wrong
  throw "ai broke. something went wrong";
}

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
 * Return a corner-index where the cell is empty, but the adjecant cells are taken by the other player:
 * 0 1 2
 * 3 4 5
 * 6 7 8
 */
findEmptyEncircledCorner = function(board, otherPlayer) {
  if (!board[0] && board[1] === otherPlayer && board[3] === otherPlayer) { return 0; }
  if (!board[2] && board[1] === otherPlayer && board[5] === otherPlayer) { return 2; }
  if (!board[6] && board[3] === otherPlayer && board[7] === otherPlayer) { return 6; }
  if (!board[8] && board[5] === otherPlayer && board[7] === otherPlayer) { return 8; }
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
    let index = isOneInARow(board, i, i+1, i+2, player);
    if (index || index === 0) { return index; }
  }
  
  // check vertical
  for (var i = 0; i < 3; i++) {
    let index = isOneInARow(board, i, i+3, i+6, player);
    if (index || index === 0) { return index; }
  }
  
  // check diagonals
  let index = isOneInARow(board, 0, 4, 8, player);
  if (index || index === 0) { return index; }
  
  index = isOneInARow(board, 2, 4, 6, player);
  if (index || index === 0) { return index; }

  return null;
}

/*
 * Returns null if there isn't only one chars which is the same as player.
 * Returns the index where one a move would create a win opportunity.
 */
isOneInARow = function(board, a, b, c, player) {
  if (board[a] === board[b] && !board[a] && board[c] === player) {
    return a;
  }
  if (board[a] === board[c] && !board[a] && board[b] === player) {
    return a;
  }
  if (board[b] === board[c] && !board[b] && board[a] === player) {
    return c;
  }
  return null;
}

/**
 * Returns the index where one a move would lead to a win, or null
 */
 findTwoInARow = function(board, player) {
  // check horizontal
  for (var i = 0; i < 9; i+=3) {
    let index = isTwoInARow(board, i, i+1, i+2, player);
    if (index || index === 0) { return index; }
  }
  
  // check vertical
  for (var i = 0; i < 3; i++) {
    let index = isTwoInARow(board, i, i+3, i+6, player);
    if (index || index === 0) { return index; }
  }

  // check diagonals
  let index = isTwoInARow(board, 0, 4, 8, player);
  if (index || index === 0) { return index; }
  
  index = isTwoInARow(board, 2, 4, 6, player);
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
    let winner = isWinningRow(board[i], board[i+1], board[i+2]);
    if (winner) { return winner; }
  }
  
  // check vertical
  for (var i = 0; i < 3; i++) {
    let winner = isWinningRow(board[i], board[i+3], board[i+6]);
    if (winner) { return winner; }
  }

  // check diagonals
  let winner = isWinningRow(board[0], board[4], board[8]);
  if (winner) { return winner; }
  
  winner = isWinningRow(board[2], board[4], board[6]);
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
  aiMove,
  findEmptySide,
  findEmptyCorner,
  findEmptyEncircledCorner,
  findOppositeCorner,
  findOneInARow,
  isOneInARow,
  findTwoInARow,
  isTwoInARow,
  getWinner,
  isWinningRow,
}