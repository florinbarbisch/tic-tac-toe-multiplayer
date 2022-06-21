var mongoose = require('mongoose');
var User = mongoose.model('User');
const boardutil = require('../common/boardutil.js');

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

/**
 * Plays a move for the player and then let's the computer play a move, if anyone wins during this process, it will return the winner
 * 
 * @param player The player playing the move
 * @param cellNumber The cell number the player wants to set his X or O
 * @returns The winner or null if still ongoing
 */
SingleplayerGameSchema.methods.move = function(player, cellNumber) {
  this.playMove(player, cellNumber);

  // check if player's move won
  let winner = this.getWinner();
  if (winner) {
    console.log("won");
    return this.saveWinner(winner);
  }
  
  // let the ai do it's work
  index = boardutil.aiMove(this.getBoard(), this.difficulty);
  this.playMove(null, index);

  // check if computers's move won
  winner = this.getWinner();
  if (winner) {
    console.log("won");
    return this.saveWinner(winner);
  }
  
  return this.save();
};

const winnerToStatus = {
  X: 'Won',
  O: 'Lost',
  D: 'Draw',
}
SingleplayerGameSchema.methods.saveWinner = function(winner) {
  this.status = winnerToStatus[winner] || 'Ongoing';
  return this.save();
}

SingleplayerGameSchema.methods.getWinner = function() {
  return boardutil.getWinner(this.getBoard());
}

/**
 * Does not save anything
 */
SingleplayerGameSchema.methods.playMove = function(player, cellNumber) {
  if (this.getBoard()[cellNumber]) {
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
