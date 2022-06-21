var mongoose = require('mongoose');
var User = mongoose.model('User');

var MultiplayerGameSchema = new mongoose.Schema({
  player1: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  player2: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  movingPlayer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  winner: {type: String, enum: ['X', 'O', 'D', 'Ongoing']},
  openForRandom: {type: Boolean, default: false },
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

MultiplayerGameSchema.methods.setPlayer2 = function(player) {
  if (player.equals(this.player1)) {
    throw "player can't play against him-/herself"
  }

  this.player2 = player;
  if (!this.movingPlayer) {
    this.movingPlayer = player;
  }
  if (this.openForRandom) {
    this.openForRandom = false;
  }

  return this.save();
}

MultiplayerGameSchema.methods.move = function(player, cellNumber) {
  this.playMove(player, cellNumber);

  // check if player won
  let winner = this.getWinner();
  if (winner) {
    console.log("won");
    return this.saveWinner(winner);
  }
  
  return this.save();
};

/**
 * returns winning char or null if no one has won
 */
MultiplayerGameSchema.methods.isWinningRow = function(a, b, c) {
  return a === b && a === c ? a : null;
}


MultiplayerGameSchema.methods.saveWinner = function(winner) {
  this.winner = winner || 'Ongoing';
  this.movingPlayer = null;
  return this.save();
}

/**
 * Returns winning char. 
 * Returns 'D' if draw. 
 * Returns null, if no one won.
 */
MultiplayerGameSchema.methods.getWinner = function() {
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
 * Does not save anything
 */
MultiplayerGameSchema.methods.playMove = function(player, cellNumber) {
  if (this.getBoard[cellNumber]) {
    throw "cell not empty";
  }
  if (!this.movingPlayer.equals(player)) {
    throw "not your turn";
  }

  var char = player.equals(this.player1) ? 'X' : 'O';

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

  this.movingPlayer = player.equals(this.player1) ? this.player2 : this.player1
};

MultiplayerGameSchema.methods.toJSONFor = function(user){
  return {
    _id: this._id,
    for: user ? user.toJSONFor(user) : user,
    player:   user &&  user.equals(this.player1) ? this.player1.toJSONFor(user) : this.player2 ? this.player2.toJSONFor(user) : null,
    opponent: user && !user.equals(this.player1) ? this.player1.toJSONFor(user) : this.player2 ? this.player2.toJSONFor(user) : null,
    yourTurn:  this.movingPlayer ? user.equals(this.movingPlayer) : null,
    winner: this.winner,
    statusText: user ? this.getStatusFor(user) : null,
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

MultiplayerGameSchema.methods.getStatusFor = function(user) {
  if (this.winner === 'Ongoing') {
    return null;
  } else if (this.winner === 'D') {
    return 'Draw!';
  } else if (user.equals(this.winner === 'X' ? this.player1 : this.player2)) {
    return 'You won!';
  } else {
    return 'You lost!';
  }
};

MultiplayerGameSchema.methods.getBoard = function(){
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

mongoose.model('MultiplayerGame', MultiplayerGameSchema);
