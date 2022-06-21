var mongoose = require('mongoose');
var User = mongoose.model('User');

var SingleplayerGameSchema = new mongoose.Schema({
  player: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  status: {type: String, enum: ['Ongoing', 'Won', 'Lost', 'Draw'], default: 'Ongoing'},
  difficulty: {type: String, enum: ['Easy', 'Medium', 'Impossible']},
  cell1: {type: String, enum: ['X', 'O', null], default: null},
  cell2: {type: String, enum: ['X', 'O', null], default: null},
  cell3: {type: String, enum: ['X', 'O', null], default: null},
  cell4: {type: String, enum: ['X', 'O', null], default: null},
  cell5: {type: String, enum: ['X', 'O', null], default: null},
  cell6: {type: String, enum: ['X', 'O', null], default: null},
  cell7: {type: String, enum: ['X', 'O', null], default: null},
  cell8: {type: String, enum: ['X', 'O', null], default: null},
  cell9: {type: String, enum: ['X', 'O', null], default: null},
}, {timestamps: true});

SingleplayerGameSchema.methods.move = function(player, cellNumber) {
  this.playMove(player, cellNumber);

  // check if player's move won
  let winner = this.getWinner();
  if (winner) {
    console.log("won");
    return this.saveWinner(winner);
  }
  
  // let the ai do it's work
  this.aiMove(this.difficulty);

  // check if computers's move won
  winner = this.getWinner();
  if (winner) {
    console.log("won");
    return this.saveWinner(winner);
  }
  
  return this.save();
};

/**
 * Heavily complicated over-engineered ai (just a bunch of if's)
 */
SingleplayerGameSchema.methods.aiMove = function(difficulty) {
  let board = this.getBoard();
  
  let index = null; // fall-through cases

  switch (difficulty) {
    case 'Impossible':
      // 1. Win: If you have two in a row, play the third to get three in a row.
      index = this.findTwoInARow(board, 'O');
      if (index || index === 0) {
        return this.playMove(null, index);
      }
      
      // 2. Block: If the opponent has two in a row, play the third to block them.
      index = this.findTwoInARow(board, 'X');
      if (index || index === 0) {
        return this.playMove(null, index);
      }
    case 'Medium':
      // 3. Create Winning Oppurtunity: Create an opportunity where you can win.
      index = this.findOneInARow(board, 'O');
      if (index || index === 0) {
        return this.playMove(null, index);
      }

      /*
      // 4. Block Winning Oppurtunity: Block an opportunity where the opponent can win.
      index = this.findOneInARow(board, 'X');
      if (index || index === 0) {
        return this.playMove(null, index);
      }
      */
    case 'Easy':
      // 5. Center: Play the center.
      if (!board[4]) {
        return this.playMove(null, 4);
      }

      // 6. Opposite Corner: If the opponent is in the corner, play the opposite corner.
      index = this.findOppositeCorner(board, 'X');
      if (index || index === 0) {
        return this.playMove(null, index);
      }
      
      // 7. Empty Corner: Play an empty corner.
      index = this.findEmptyCorner(board);
      if (index || index === 0) {
        return this.playMove(null, index);
      }

      // 8. Empty Side: Play an empty side.
      index = this.findEmptySide(board);
      if (index || index === 0) {
        return this.playMove(null, index);
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
SingleplayerGameSchema.methods.findEmptySide = function(board) {
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
SingleplayerGameSchema.methods.findEmptyCorner = function(board) {
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
SingleplayerGameSchema.methods.findOppositeCorner = function(board, player) {
  if (board[0] === player && !board[8]) { return 8; }
  if (board[8] === player && !board[0]) { return 0; }
  if (board[2] === player && !board[6]) { return 6; }
  if (board[6] === player && !board[2]) { return 2; }
  return null;
}

/**
 * Returns the index where one a move would create a win opportunity, or null
 */
SingleplayerGameSchema.methods.findOneInARow = function(board, player) {
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
SingleplayerGameSchema.methods.isOneInARow = function(board, a, b, c, player) {
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
SingleplayerGameSchema.methods.findTwoInARow = function(board, player) {
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
SingleplayerGameSchema.methods.isTwoInARow = function(board, a, b, c, player) {
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

const winnerToStatus = {
  X: 'Won',
  O: 'Lost',
  D: 'Draw',
}
SingleplayerGameSchema.methods.saveWinner = function(winner) {
  this.status = winnerToStatus[winner] || 'Ongoing';
  return this.save();
}

/**
 * Returns winning char. 
 * Returns 'D' if draw. 
 * Returns null, if no one won.
 */
SingleplayerGameSchema.methods.getWinner = function() {
  let board = this.getBoard();
  
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
SingleplayerGameSchema.methods.isWinningRow = function(a, b, c) {
  return a === b && a === c ? a : null;
}


SingleplayerGameSchema.methods.isValidMove = function(cellNumber) {
  return !this.getBoard()[cellNumber];
}

/**
 * Does not save anything
 */
SingleplayerGameSchema.methods.playMove = function(player, cellNumber) {
  if (!this.isValidMove(cellNumber)) {
    throw new Error("cell not empty");
  }

  let char = player ? 'X' : 'O'

  switch (cellNumber) {
    case 0: this.cell1 = char; break;
    case 1: this.cell2 = char; break;
    case 2: this.cell3 = char; break;
    case 3: this.cell4 = char; break;
    case 4: this.cell5 = char; break;
    case 5: this.cell6 = char; break;
    case 6: this.cell7 = char; break;
    case 7: this.cell8 = char; break;
    case 8: this.cell9 = char; break;
  }
};

SingleplayerGameSchema.methods.toJSONFor = function(user){
  return {
    _id: this._id,
    player: this.player.toProfileJSONFor(user),
    status: this.status,
    difficulty: this.difficulty,
    cell1: this.cell1,
    cell2: this.cell2,
    cell3: this.cell3,
    cell4: this.cell4,
    cell5: this.cell5,
    cell6: this.cell6,
    cell7: this.cell7,
    cell8: this.cell8,
    cell9: this.cell9,
  };
};
SingleplayerGameSchema.methods.getBoard = function(){
  return [
    this.cell1,
    this.cell2,
    this.cell3,
    this.cell4,
    this.cell5,
    this.cell6,
    this.cell7,
    this.cell8,
    this.cell9,
  ];
};

module.exports = mongoose.model('SingleplayerGame', SingleplayerGameSchema);
