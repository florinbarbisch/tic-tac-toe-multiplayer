const boardutil = require('./boardutil');

// from https://www.rosettacode.org/wiki/Knuth_shuffle#JavaScript
function knuthShuffle(arr) {
  var rand, temp, i;
  for (i = arr.length - 1; i > 0; i -= 1) {
      rand = Math.floor((i + 1) * Math.random());//get random between zero and i (inclusive)
      temp = arr[rand];//swap i and the zero-indexed number
      arr[rand] = arr[i];
      arr[i] = temp;
  }
  return arr;
}

/**
 * Returns a random index where the cell is empty, or null if there are no empty cells
 */
getRandomMove = function(board) {
  let indexes = [0,1,2,3,4,5,6,7,8];
  // shuffle the indexes
  indexes = knuthShuffle(indexes);
  for (let i = 0; i < indexes.length; i++) {
    let index = indexes[i];
    if (!board[index]) {
      return index;
    }
  }
  return null;
}

describe('test the boardutil class', () => {
  
  it('isWinningRow should return the winning char or null', () => {
    expect(boardutil.isWinningRow('X',  'X',  'X' )).toBe('X');
    expect(boardutil.isWinningRow('O',  'O',  'O' )).toBe('O');
    expect(boardutil.isWinningRow('X',  'X',  null)).toBe(null);
    expect(boardutil.isWinningRow('O',  'O',  null)).toBe(null);
    expect(boardutil.isWinningRow('X',  'X',  'O' )).toBe(null);
    expect(boardutil.isWinningRow('O',  'O',  'X' )).toBe(null);
    expect(boardutil.isWinningRow('X',  null, null)).toBe(null);
    expect(boardutil.isWinningRow('O',  null, null)).toBe(null);
    expect(boardutil.isWinningRow('X',  'O',  null)).toBe(null);
    expect(boardutil.isWinningRow('O',  'X',  null)).toBe(null);
    expect(boardutil.isWinningRow(null, null, null)).toBe(null);
  });
  
  it('getWinner should return the char, that has 3 in a row/column or diagonal. Otherwise null should be returned, except when the baord is full, then "D" should be returned', () => {
    expect(boardutil.getWinner(['X', 'O', null, null, 'X', 'O', null, 'O', 'O'])).toEqual(null); // no_one_is_winning
    expect(boardutil.getWinner(['X', 'O', null, null, 'X', 'O', 'O',  'O', 'O'])).toEqual('O');  // O_in_row_is_winning
    expect(boardutil.getWinner(['X', 'X', 'X',  null, 'X', 'O', null, 'O', 'O'])).toEqual('X');  // X_in_row_is_winning
    expect(boardutil.getWinner(['X', 'X', 'O',  null, 'O', 'O', null, 'O', 'O'])).toEqual('O');  // O_in_column_is_winning
    expect(boardutil.getWinner(['X', 'X', null, null, 'X', 'O', null, 'X', 'O'])).toEqual('X');  // X_in_column_is_winning
    expect(boardutil.getWinner(['X', 'X', 'O',  null, 'O', 'O', 'O',  'O', 'X'])).toEqual('O');  // O_in_diagonal_is_winning
    expect(boardutil.getWinner(['X', 'X', null, null, 'X', 'O', null, 'O', 'X'])).toEqual('X');  // X_in_diagonal_is_winning
    expect(boardutil.getWinner(['O', 'X', 'O',  'X',  'X', 'O', null, 'O', 'X'])).toEqual(null); // draw_but_not_full
    expect(boardutil.getWinner(['O', 'X', 'O',  'X',  'X', 'O', 'X',  'O', 'X'])).toEqual('D');  // draw
  });
  
  it('isTwoInARow should return the index where a move would lead to a win', () => {
    expect(boardutil.isTwoInARow(['X',  'X',  null, null, null, null, null, null, null], 0, 1, 2, 'X')).toEqual(2);
    expect(boardutil.isTwoInARow(['X',  null, 'X',  null, null, null, null, null, null], 0, 1, 2, 'X')).toEqual(1);
    expect(boardutil.isTwoInARow([null, 'X',  'X',  null, null, null, null, null, null], 0, 1, 2, 'X')).toEqual(0);
    expect(boardutil.isTwoInARow(['O',  'X',  null, null, null, null, null, null, null], 0, 1, 2, 'X')).toEqual(null);
    expect(boardutil.isTwoInARow(['O',  null, 'O',  null, null, null, null, null, null], 0, 1, 2, 'X')).toEqual(null);
    expect(boardutil.isTwoInARow([null, 'O',  null, null, null, null, null, null, null], 0, 1, 2, 'X')).toEqual(null);
    expect(boardutil.isTwoInARow(['O',  'O',  null, null, null, null, null, null, null], 0, 1, 2, 'O')).toEqual(2);
    expect(boardutil.isTwoInARow(['O',  'O',  null, null, null, null, null, null, null], 0, 4, 8, 'O')).toEqual(null);
    expect(boardutil.isTwoInARow(['O',  'O',  'O',  null, null, null, null, null, null], 0, 1, 2, 'O')).toEqual(null);
    expect(boardutil.isTwoInARow(['O',  'O',  'O',  null, null, null, null, null, null], 0, 1, 2, 'X')).toEqual(null);
    expect(boardutil.isTwoInARow(['O',  'O',  'O',  null, null, null, 'O' , 'O' , 'O' ], 3, 4, 5, 'X')).toEqual(null);
  });

  it('findTwoInARow should return the index where a move would lead to a win', () => {
    // row
    expect(boardutil.findTwoInARow(['X',  'X',  null,
                                    'O',  'O',  null,
                                    'O',  null, 'X'], 'X')).toEqual(2);
    // column
    expect(boardutil.findTwoInARow(['X',  'O',  null,
                                    'X',  'O',  null,
                                    'O',  null, 'X'], 'O')).toEqual(7);
    // diagonal
    expect(boardutil.findTwoInARow([null, 'O',  null,
                                    'O',  'X',  null,
                                    'O',  null, 'X'], 'X')).toEqual(0);
    // no win possible
    expect(boardutil.findTwoInARow(['O',  'X',  'X',
                                    'X',  'O',  null,
                                    'O',  null, 'X'], 'O')).toEqual(null);
    expect(boardutil.findTwoInARow(['O',  null,  null,
                                    'X',  null,  null,
                                    null, null, 'X'], 'X')).toEqual(null);
  });

  it('isOneInARow should return the index where a move would create a win possibility', () => {
    expect([1,2].includes(boardutil.isOneInARow(['X',  null, null, null, null, null, null, null, null], 0, 1, 2, 'X'))).toBeTruthy();
    expect([0,1].includes(boardutil.isOneInARow([null, null, 'X',  null, null, null, null, null, null], 0, 1, 2, 'X'))).toBeTruthy();
    expect([0,2].includes(boardutil.isOneInARow([null, 'X',  null, null, null, null, null, null, null], 0, 1, 2, 'X'))).toBeTruthy();
    expect(boardutil.isOneInARow(['X',  'X',  null, null, null, null, null, null, null], 0, 1, 2, 'X')).toBe(null);
    expect(boardutil.isOneInARow(['X',  'O',  null, null, null, null, null, null, null], 0, 1, 2, 'X')).toBe(null);
    expect(boardutil.isOneInARow([null, 'O',  null, null, null, null, null, null, null], 0, 1, 2, 'X')).toBe(null);
    expect(boardutil.isOneInARow(['O',  null, null, null, null, null, null, null, null], 0, 1, 2, 'X')).toBe(null);
    expect(boardutil.isOneInARow([null, null, 'O',  null, null, null, null, null, null], 0, 1, 2, 'X')).toBe(null);
  });

  it('findOneInARow should return the index where a move would create a win possibility', () => {
    // column
    expect([3,6].includes(boardutil.findOneInARow(['X',  null,  'O',
                                                   null,  'O',  null,
                                                   null,  null, null], 'X'))).toBeTruthy();
    // row
    expect([1,2].includes(boardutil.findOneInARow(['X',  null,  null,
                                                   null,  'O',  null,
                                                   'O',  null,  null], 'X'))).toBeTruthy();
    // diagonal
    expect([4,8].includes(boardutil.findOneInARow(['X',   'O', null,
                                                   'O',  null, null,
                                                   null, null, null], 'X'))).toBeTruthy();
    // no win possible
    expect(boardutil.findOneInARow(['O',   'X',  'O',
                                    'X',  null,  null,
                                    'O',  null, 'X'], 'O')).toEqual(null);
    expect(boardutil.findOneInARow([null,  null,  null,
                                    null,  null,  null,
                                    null,  null, 'O'], 'X')).toEqual(null);
    expect(boardutil.findOneInARow(['X',   'X',  null,
                                    'X',   null,  'X',
                                    null,  'X',  'X'], 'X')).toEqual(null);
  });
  
  it('findOppositeCorner should return the index of an empty corner where the opposite corner is taken by the player', () => {
    expect(boardutil.findOppositeCorner(['X',  null,  'O',
                                         null, null,  null,
                                         null, null, null], 'X')).toEqual(8);
    expect(boardutil.findOppositeCorner(['X',  null,  'O',
                                         null, null,  null,
                                         null, null, null], 'O')).toEqual(6);
    expect(boardutil.findOppositeCorner(['X',  null,  null,
                                         null, null,  null,
                                         'X',  null, 'X'], 'X')).toEqual(2);
    expect(boardutil.findOppositeCorner(['X',  null,  'O',
                                         null, null,  null,
                                         null, null,  'X'], 'X')).toEqual(null);
    expect([0,6].includes(boardutil.findOppositeCorner([null, null,  'O',
                                                        null, null,  null,
                                                        null, null,  'O'], 'O'))).toBeTruthy();
  });

  it('findEmptyCorner should return the index of an empty corner', () => {
    expect(boardutil.findEmptyCorner(['X',  null,  'O',
                                      null, null, null,
                                      null, null,  'X'])).toEqual(6);
    expect(boardutil.findEmptyCorner([null, null,  'X',
                                      null, null, null,
                                      'X',  null,  'X'])).toEqual(0);
    expect(boardutil.findEmptyCorner(['X',  null, null,
                                      null, null, null,
                                      'X',  null, 'X'], 'X')).toEqual(2);
    expect(boardutil.findEmptyCorner(['X',  null,  'O',
                                      null, null, null,
                                      'O',  null, null])).toEqual(8);
    expect([0,6].includes(boardutil.findEmptyCorner([null, null,  'O',
                                                     null, null, null,
                                                     null, null,  'O']))).toBeTruthy();
    expect([0,2,6,8].includes(boardutil.findEmptyCorner([null, null, null,
                                                         null, null, null,
                                                         null, null, null]))).toBeTruthy();
  });
  
  it('findEmptyEncircledCorner should return the index of an empty and encircled corner', () => {
    expect(boardutil.findEmptyEncircledCorner([null,  'O', null,
                                                'O', null,  'X',
                                               null,  'X', null], 'X')).toEqual(8);
    expect(boardutil.findEmptyEncircledCorner([null,  'X', null,
                                                'X', null, null,
                                               null, null, null], 'X')).toEqual(0);
    expect(boardutil.findEmptyEncircledCorner([null,  'X', null,
                                               null, null,  'X',
                                               null, null, null], 'X')).toEqual(2);
    expect(boardutil.findEmptyEncircledCorner([null, null, null,
                                                'X', null, null,
                                               null,  'X', null], 'X')).toEqual(6);
    expect([0,2,6,8].includes(boardutil.findEmptyEncircledCorner([null,  'X', null,
                                                                   'X', null,  'X',
                                                                  null,  'X', null], 'X'))).toBeTruthy();
    expect([6,8].includes(boardutil.findEmptyEncircledCorner([null,  'O', null,
                                                               'X', null,  'X',
                                                              null,  'X', null], 'X'))).toBeTruthy();
  });

  it('findEmptySide should return a side-index where the cell is empty', () => {

    expect(boardutil.findEmptySide([null,  'X', null,
                                    'X', null, null,
                                    null,  'O', null])).toEqual(5);
    expect(boardutil.findEmptySide([null,  'X', null,
                                    'X', null,  'O',
                                    null, null, null])).toEqual(7);
    expect(boardutil.findEmptySide([null,  'O', null,
                                    null, null,  'X',
                                    null,  'O', null])).toEqual(3);
    expect(boardutil.findEmptySide([null, null, null,
                                    'X', null,  'X',
                                    null,  'O', null])).toEqual(1);
    expect(boardutil.findEmptySide([null,  'O', null,
                                    null, null,  'X',
                                    null,  'O', null])).toEqual(3);
    expect([1,5].includes(boardutil.findEmptySide([null, null, null,
                                                   'X', null, null,
                                                   null, 'O', null]))).toBeTruthy();
    expect([1,3,5,7].includes(boardutil.findEmptySide([null, null, null,
                                                       null, null, null,
                                                       null, null, null]))).toBeTruthy();
  });

  // fuzzy testing
  it('aiMove on difficulty impossible should never allow the player to win if the player starts', () => {
    for(let i = 0; i < 10_000; i++) {
      let board = [null, null, null, null, null, null, null, null, null];
      board[getRandomMove(board)] = 'X';
      while (boardutil.getWinner(board) == null) {
        let aiMove = boardutil.aiMove(board, 'Impossible');
        expect(board[aiMove]).toBe(null);
        board[aiMove] = 'O';
        if (boardutil.getWinner(board) === null) {
          board[getRandomMove(board)] = 'X';
        }
      }
      expect(['O', 'D'].includes(boardutil.getWinner(board))).toBeTruthy();
    }
  });

});