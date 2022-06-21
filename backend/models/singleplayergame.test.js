const mockingoose = require('mockingoose');
const User = require('./User');
const SingleplayerGame = require('./SingleplayerGame');

describe('test mongoose SingleplayerGame model', () => {
  it('should return the an array with all the cells', () => {
    const _doc = {
      _id: '621f4aa81c74d43035c8dcb3',
      player: {
        _id: '621f4b0f1c74d43035c8dcb5',
        username: 'mustermann',
        salt: '541c7d6fbc0c32c2321cc4d7e008db68',
        hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
      },
      status: 'Ongoing',
      difficulty: 'Easy',
      cell1: 'X',
      cell2: 'O',
      cell3: 'X',
      cell4: 'O',
      cell5: 'X',
      cell6: 'O',
      cell7: null,
      cell8: 'O',
      cell9: 'X',
    };

    const board = [
      _doc.cell1,
      _doc.cell2,
      _doc.cell3,
      _doc.cell4,
      _doc.cell5,
      _doc.cell6,
      _doc.cell7,
      _doc.cell8,
      _doc.cell9,
    ];

    mockingoose(SingleplayerGame).toReturn(_doc, 'findOne');

    return SingleplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(doc => {
      expect(JSON.parse(JSON.stringify(doc.getBoard()))).toMatchObject(board);
    });
  });

  it('should format the json correctly', () => {
    const _doc = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    mockingoose(User).toReturn(_doc, 'findOne');
    
    return User.findById('621f4b0f1c74d43035c8dcb5').exec().then(user => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X',
        cell2: 'O',
        cell3: null,
        cell4: null,
        cell5: 'X',
        cell6: 'O',
        cell7: null,
        cell8: 'O',
        cell9: 'X',
      };
      const _post_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player: {
          username: 'mustermann',
        },
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X',
        cell2: 'O',
        cell3: null,
        cell4: null,
        cell5: 'X',
        cell6: 'O',
        cell7: null,
        cell8: 'O',
        cell9: 'X',
      };

      mockingoose(SingleplayerGame).toReturn(_pre_game, 'findOne');

      return SingleplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        expect(JSON.parse(JSON.stringify(game.toJSONFor(user)))).toMatchObject(_post_game);
      });
    });
  });

  it('should set the field if a move is played', () => {
    const _doc = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    mockingoose(User).toReturn(_doc, 'findOne');
    
    return User.findById('621f4b0f1c74d43035c8dcb5').exec().then(user => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X',
        cell2: 'O',
        cell3: null,
        cell4: null,
        cell5: 'X',
        cell6: 'O',
        cell7: null,
        cell8: 'O',
        cell9: 'X',
      };

      mockingoose(SingleplayerGame).toReturn(_pre_game, 'findOne');

      return SingleplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        game.playMove(true, 6)
        game.playMove(false, 3)        
        // check if cell 7 and 3 have changed
        expect(game.cell7).toBe('X');
        expect(game.cell4).toBe('O');
        // check if other cells are unchanged
        expect(game.cell1).toBe('X');
        expect(game.cell2).toBe('O');
        expect(game.cell3).toBe(null);
        expect(game.cell5).toBe('X');
        expect(game.cell6).toBe('O');
        expect(game.cell8).toBe('O');
        expect(game.cell9).toBe('X');
      });
    });
  });

  it('should throw an error if the field is not empty', () => {
    const _doc = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    mockingoose(User).toReturn(_doc, 'findOne');
    
    return User.findById('621f4b0f1c74d43035c8dcb5').exec().then(user => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X',
        cell2: 'O',
        cell3: null,
        cell4: null,
        cell5: 'X',
        cell6: 'O',
        cell7: null,
        cell8: 'O',
        cell9: 'X',
      };

      mockingoose(SingleplayerGame).toReturn(_pre_game, 'findOne');

      expect.assertions(1);
      return expect(SingleplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        game.playMove(true, 8)
      })).rejects.toThrow("cell not empty");
    });
  });
  
  it('should be a valid move if the cell is empty and an invalid if it\'s not empty', () => {
    const _doc = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    mockingoose(User).toReturn(_doc, 'findOne');
    
    return User.findById('621f4b0f1c74d43035c8dcb5').exec().then(user => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X',
        cell2: 'O',
        cell3: null,
        cell4: null,
        cell5: 'X',
        cell6: 'O',
        cell7: null,
        cell8: 'O',
        cell9: 'X',
      };

      mockingoose(SingleplayerGame).toReturn(_pre_game, 'findOne');

      return SingleplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        expect(game.isValidMove(0)).toBe(false);
        expect(game.isValidMove(1)).toBe(false);
        expect(game.isValidMove(2)).toBe(true);
        expect(game.isValidMove(3)).toBe(true);
        expect(game.isValidMove(4)).toBe(false);
        expect(game.isValidMove(5)).toBe(false);
        expect(game.isValidMove(6)).toBe(true);
        expect(game.isValidMove(7)).toBe(false);
        expect(game.isValidMove(8)).toBe(false);
      });
    });
  });

  it('isWinningRow should return the winning char or null', () => {
    const _doc = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    mockingoose(User).toReturn(_doc, 'findOne');
    
    return User.findById('621f4b0f1c74d43035c8dcb5').exec().then(user => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X',
        cell2: 'O',
        cell3: null,
        cell4: null,
        cell5: 'X',
        cell6: 'O',
        cell7: null,
        cell8: 'O',
        cell9: 'X',
      };

      mockingoose(SingleplayerGame).toReturn(_pre_game, 'findOne');

      return SingleplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        expect(game.isWinningRow('X',  'X',  'X' )).toBe('X');
        expect(game.isWinningRow('O',  'O',  'O' )).toBe('O');
        expect(game.isWinningRow('X',  'X',  null)).toBe(null);
        expect(game.isWinningRow('O',  'O',  null)).toBe(null);
        expect(game.isWinningRow('X',  'X',  'O' )).toBe(null);
        expect(game.isWinningRow('O',  'O',  'X' )).toBe(null);
        expect(game.isWinningRow('X',  null, null)).toBe(null);
        expect(game.isWinningRow('O',  null, null)).toBe(null);
        expect(game.isWinningRow('X',  'O',  null)).toBe(null);
        expect(game.isWinningRow('O',  'X',  null)).toBe(null);
        expect(game.isWinningRow(null, null, null)).toBe(null);
      });
    });
  });

  it('getWinner should return the char, that has 3 in a row/column or diagonal. Otherwise null should be returned, except when the baord is full, then "D" should be returned', () => {
    const _doc = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    mockingoose(User).toReturn(_doc, 'findOne');
    
    return User.findById('621f4b0f1c74d43035c8dcb5').exec().then(user => {
      const no_one_is_winning = {
        _id: 'de82ba4c59f13e2e737c68f2',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X' , cell2: 'O' , cell3: null,
        cell4: null, cell5: 'X' , cell6: 'O' ,
        cell7: null, cell8: 'O' , cell9: 'O' ,
      };
      const O_in_row_is_winning = {
        _id: 'b4e2310d50184643594ffc7c',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X' , cell2: 'O' , cell3: null,
        cell4: null, cell5: 'X' , cell6: 'O' ,
        cell7: 'O' , cell8: 'O' , cell9: 'O' ,
      };
      const X_in_row_is_winning = {
        _id: '4022292ca72570d913fdd22a',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X' , cell2: 'X' , cell3: 'X',
        cell4: null, cell5: 'X' , cell6: 'O' ,
        cell7: null, cell8: 'O' , cell9: 'O' ,
      };
      const O_in_column_is_winning = {
        _id: '401c9e5a56a00a0d13ddbcb6',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X' , cell2: 'X' , cell3: 'O' ,
        cell4: null, cell5: 'O' , cell6: 'O' ,
        cell7: null, cell8: 'O' , cell9: 'O' ,
      };
      const X_in_column_is_winning = {
        _id: '383627afcfdc7ae36bff8a78',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X' , cell2: 'X' , cell3: null ,
        cell4: null, cell5: 'X' , cell6: 'O' ,
        cell7: null, cell8: 'X' , cell9: 'O' ,
      };
      const O_in_diagonal_is_winning = {
        _id: '971070ea196624f4a42f26e3',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X' , cell2: 'X' , cell3: 'O' ,
        cell4: null, cell5: 'O' , cell6: 'O' ,
        cell7: 'O' , cell8: 'O' , cell9: 'X' ,
      };
      const X_in_diagonal_is_winning = {
        _id: '86d4461256c8d4e70184d354',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X' , cell2: 'X' , cell3: null ,
        cell4: null, cell5: 'X' , cell6: 'O' ,
        cell7: null, cell8: 'O' , cell9: 'X' ,
      };
      const draw_but_not_full = {
        _id: 'c2c9563b27e8afbe18f92e70',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'O' , cell2: 'X' , cell3: 'O' ,
        cell4: 'X' , cell5: 'X' , cell6: 'O' ,
        cell7: null, cell8: 'O' , cell9: 'X' ,
      };
      const draw = {
        _id: 'bf59287d2616493ccdbb9538',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'O' , cell2: 'X' , cell3: 'O' ,
        cell4: 'X' , cell5: 'X' , cell6: 'O' ,
        cell7: 'X' , cell8: 'O' , cell9: 'X' ,
      };

      const finderMock = query => {
        expect(query.getQuery()).toMatchSnapshot('findById query');
        if (query.getQuery()._id === 'de82ba4c59f13e2e737c68f2') { return no_one_is_winning; }
        if (query.getQuery()._id === 'b4e2310d50184643594ffc7c') { return O_in_row_is_winning; }
        if (query.getQuery()._id === '4022292ca72570d913fdd22a') { return X_in_row_is_winning; }
        if (query.getQuery()._id === '401c9e5a56a00a0d13ddbcb6') { return O_in_column_is_winning; }
        if (query.getQuery()._id === '383627afcfdc7ae36bff8a78') { return X_in_column_is_winning; }
        if (query.getQuery()._id === '971070ea196624f4a42f26e3') { return O_in_diagonal_is_winning; }
        if (query.getQuery()._id === '86d4461256c8d4e70184d354') { return X_in_diagonal_is_winning; }
        if (query.getQuery()._id === 'c2c9563b27e8afbe18f92e70') { return draw_but_not_full; }
        if (query.getQuery()._id === 'bf59287d2616493ccdbb9538') { return draw; }
        return null;
      };
  
      mockingoose(SingleplayerGame).toReturn(finderMock, 'findOne');

      return Promise.all([
        SingleplayerGame.findById('de82ba4c59f13e2e737c68f2'),
        SingleplayerGame.findById('b4e2310d50184643594ffc7c'),
        SingleplayerGame.findById('4022292ca72570d913fdd22a'),
        SingleplayerGame.findById('401c9e5a56a00a0d13ddbcb6'),
        SingleplayerGame.findById('383627afcfdc7ae36bff8a78'),
        SingleplayerGame.findById('971070ea196624f4a42f26e3'),
        SingleplayerGame.findById('86d4461256c8d4e70184d354'),
        SingleplayerGame.findById('c2c9563b27e8afbe18f92e70'),
        SingleplayerGame.findById('bf59287d2616493ccdbb9538'),
      ]).then(games => {
        expect(games[0].getWinner()).toEqual(null);
        expect(games[1].getWinner()).toEqual('O');
        expect(games[2].getWinner()).toEqual('X');
        expect(games[3].getWinner()).toEqual('O');
        expect(games[4].getWinner()).toEqual('X');
        expect(games[5].getWinner()).toEqual('O');
        expect(games[6].getWinner()).toEqual('X');
        expect(games[7].getWinner()).toEqual(null);
        expect(games[8].getWinner()).toEqual('D');
      });
    });
  });
  
  it('should set the status to won if X is the winner', () => {
    const _doc = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    mockingoose(User).toReturn(_doc, 'findOne');
    
    return User.findById('621f4b0f1c74d43035c8dcb5').exec().then(user => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X',
        cell2: 'O',
        cell3: null,
        cell4: null,
        cell5: 'X',
        cell6: 'O',
        cell7: null,
        cell8: 'O',
        cell9: 'X',
      };

      mockingoose(SingleplayerGame).toReturn(_pre_game, 'findOne');
      
      jest.useFakeTimers()
      return SingleplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        game.saveWinner('X');
        expect(game.status).toEqual('Won');
      });
    });
  });

  it('should set the status to Lost if O is the winner', () => {
    const _doc = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    mockingoose(User).toReturn(_doc, 'findOne');
    
    return User.findById('621f4b0f1c74d43035c8dcb5').exec().then(user => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X',
        cell2: 'O',
        cell3: null,
        cell4: null,
        cell5: 'X',
        cell6: 'O',
        cell7: null,
        cell8: 'O',
        cell9: 'X',
      };

      mockingoose(SingleplayerGame).toReturn(_pre_game, 'findOne');
      
      jest.useFakeTimers()
      return SingleplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        game.saveWinner('O');
        expect(game.status).toEqual('Lost');
      });
    });
  });

  it('should set the status to Draw if D is the winner', () => {
    const _doc = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    mockingoose(User).toReturn(_doc, 'findOne');
    
    return User.findById('621f4b0f1c74d43035c8dcb5').exec().then(user => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X',
        cell2: 'O',
        cell3: null,
        cell4: null,
        cell5: 'X',
        cell6: 'O',
        cell7: null,
        cell8: 'O',
        cell9: 'X',
      };

      mockingoose(SingleplayerGame).toReturn(_pre_game, 'findOne');
      
      jest.useFakeTimers()
      return SingleplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        game.saveWinner('D');
        expect(game.status).toEqual('Draw');
      });
    });
  });

  it('should set the status to Ongoing if the winner is not X,O or D', () => {
    const _doc = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    mockingoose(User).toReturn(_doc, 'findOne');
    
    return User.findById('621f4b0f1c74d43035c8dcb5').exec().then(user => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X',
        cell2: 'O',
        cell3: null,
        cell4: null,
        cell5: 'X',
        cell6: 'O',
        cell7: null,
        cell8: 'O',
        cell9: 'X',
      };

      mockingoose(SingleplayerGame).toReturn(_pre_game, 'findOne');
      
      jest.useFakeTimers()
      return SingleplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        game.saveWinner('');
        expect(game.status).toEqual('Ongoing');
      });
    });
  });
  
  it('isTwoInARow should return the index where a move would lead to a win', () => {
    const _doc = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    mockingoose(User).toReturn(_doc, 'findOne');
    
    return User.findById('621f4b0f1c74d43035c8dcb5').exec().then(user => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X',
        cell2: 'O',
        cell3: null,
        cell4: null,
        cell5: 'X',
        cell6: 'O',
        cell7: null,
        cell8: 'O',
        cell9: 'X',
      };

      mockingoose(SingleplayerGame).toReturn(_pre_game, 'findOne');
      
      return SingleplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        expect(game.isTwoInARow(['X',  'X',  null, null, null, null, null, null, null], 0, 1, 2, 'X')).toEqual(2);
        expect(game.isTwoInARow(['X',  null, 'X',  null, null, null, null, null, null], 0, 1, 2, 'X')).toEqual(1);
        expect(game.isTwoInARow([null, 'X',  'X',  null, null, null, null, null, null], 0, 1, 2, 'X')).toEqual(0);
        expect(game.isTwoInARow(['O',  'X',  null, null, null, null, null, null, null], 0, 1, 2, 'X')).toEqual(null);
        expect(game.isTwoInARow(['O',  null, 'O',  null, null, null, null, null, null], 0, 1, 2, 'X')).toEqual(null);
        expect(game.isTwoInARow([null, 'O',  null, null, null, null, null, null, null], 0, 1, 2, 'X')).toEqual(null);
        expect(game.isTwoInARow(['O',  'O',  null, null, null, null, null, null, null], 0, 1, 2, 'O')).toEqual(2);
        expect(game.isTwoInARow(['O',  'O',  null, null, null, null, null, null, null], 0, 4, 8, 'O')).toEqual(null);
        expect(game.isTwoInARow(['O',  'O',  'O',  null, null, null, null, null, null], 0, 1, 2, 'O')).toEqual(null);
        expect(game.isTwoInARow(['O',  'O',  'O',  null, null, null, null, null, null], 0, 1, 2, 'X')).toEqual(null);
        expect(game.isTwoInARow(['O',  'O',  'O',  null, null, null, 'O' , 'O' , 'O' ], 3, 4, 5, 'X')).toEqual(null);
      });
    });
  });

  it('findTwoInARow should return the index where a move would lead to a win', () => {
    const _doc = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    mockingoose(User).toReturn(_doc, 'findOne');
    
    return User.findById('621f4b0f1c74d43035c8dcb5').exec().then(user => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X',
        cell2: 'O',
        cell3: null,
        cell4: null,
        cell5: 'X',
        cell6: 'O',
        cell7: null,
        cell8: 'O',
        cell9: 'X',
      };

      mockingoose(SingleplayerGame).toReturn(_pre_game, 'findOne');
      
      return SingleplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        // row
        expect(game.findTwoInARow(['X',  'X',  null,
                                   'O',  'O',  null,
                                   'O',  null, 'X'], 'X')).toEqual(2);
        // column
        expect(game.findTwoInARow(['X',  'O',  null,
                                   'X',  'O',  null,
                                   'O',  null, 'X'], 'O')).toEqual(7);
        // diagonal
        expect(game.findTwoInARow([null, 'O',  null,
                                   'O',  'X',  null,
                                   'O',  null, 'X'], 'X')).toEqual(0);
        // no win possible
        expect(game.findTwoInARow(['O',  'X',  'X',
                                   'X',  'O',  null,
                                   'O',  null, 'X'], 'O')).toEqual(null);
        expect(game.findTwoInARow(['O',  null,  null,
                                   'X',  null,  null,
                                   null, null, 'X'], 'X')).toEqual(null);
      });
    });
  });

  it('isOneInARow should return the index where a move would create a win possibility', () => {
    const _doc = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    mockingoose(User).toReturn(_doc, 'findOne');
    
    return User.findById('621f4b0f1c74d43035c8dcb5').exec().then(user => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X',
        cell2: 'O',
        cell3: null,
        cell4: null,
        cell5: 'X',
        cell6: 'O',
        cell7: null,
        cell8: 'O',
        cell9: 'X',
      };

      mockingoose(SingleplayerGame).toReturn(_pre_game, 'findOne');
      
      return SingleplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        expect(game.isOneInARow(['X',  null, null, null, null, null, null, null, null], 0, 1, 2, 'X') in [1, 2]).toBeTruthy();
        expect(game.isOneInARow([null, null, 'X',  null, null, null, null, null, null], 0, 1, 2, 'X') in [0, 1]).toBeTruthy();
        expect(game.isOneInARow([null, 'X',  null, null, null, null, null, null, null], 0, 1, 2, 'X') in [0, 2]).toBeTruthy();
        expect(game.isOneInARow(['X',  'X',  null, null, null, null, null, null, null], 0, 1, 2, 'X')).toBe(null);
        expect(game.isOneInARow(['X',  'O',  null, null, null, null, null, null, null], 0, 1, 2, 'X')).toBe(null);
        expect(game.isOneInARow([null, 'O',  null, null, null, null, null, null, null], 0, 1, 2, 'X')).toBe(null);
        expect(game.isOneInARow(['O',  null, null, null, null, null, null, null, null], 0, 1, 2, 'X')).toBe(null);
        expect(game.isOneInARow([null, null, 'O',  null, null, null, null, null, null], 0, 1, 2, 'X')).toBe(null);
      });
    });
  });
  
  it('findOneInARow should return the index where a move would create a win possibility', () => {
    const _doc = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    mockingoose(User).toReturn(_doc, 'findOne');
    
    return User.findById('621f4b0f1c74d43035c8dcb5').exec().then(user => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X',
        cell2: 'O',
        cell3: null,
        cell4: null,
        cell5: 'X',
        cell6: 'O',
        cell7: null,
        cell8: 'O',
        cell9: 'X',
      };

      mockingoose(SingleplayerGame).toReturn(_pre_game, 'findOne');
      
      return SingleplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        // column
        expect([3,6].includes(game.findOneInARow(['X',  null,  'O',
                                                  null,  'O',  null,
                                                  null,  null, null], 'X'))).toBeTruthy();
        // row
        expect([1,2].includes(game.findOneInARow(['X',  null,  null,
                                                  null,  'O',  null,
                                                  'O',  null,  null], 'X'))).toBeTruthy();
        // diagonal
        expect([4,8].includes(game.findOneInARow(['X',   'O', null,
                                                  'O',  null, null,
                                                  null, null, null], 'X'))).toBeTruthy();
        // no win possible
        expect(game.findOneInARow(['O',   'X',  'O',
                                   'X',  null,  null,
                                   'O',  null, 'X'], 'O')).toEqual(null);
        expect(game.findOneInARow([null,  null,  null,
                                   null,  null,  null,
                                   null,  null, 'O'], 'X')).toEqual(null);
        expect(game.findOneInARow(['X',   'X',  null,
                                   'X',   null,  'X',
                                   null,  'X',  'X'], 'X')).toEqual(null);
      });
    });
  });
  
  it('findOppositeCorner should return the index of an empty corner where the opposite corner is taken by the player', () => {
    const _doc = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    mockingoose(User).toReturn(_doc, 'findOne');
    
    return User.findById('621f4b0f1c74d43035c8dcb5').exec().then(user => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X',
        cell2: 'O',
        cell3: null,
        cell4: null,
        cell5: 'X',
        cell6: 'O',
        cell7: null,
        cell8: 'O',
        cell9: 'X',
      };

      mockingoose(SingleplayerGame).toReturn(_pre_game, 'findOne');
      
      return SingleplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        expect(game.findOppositeCorner(['X',  null,  'O',
                                        null, null,  null,
                                        null, null, null], 'X')).toEqual(8);
        expect(game.findOppositeCorner(['X',  null,  'O',
                                        null, null,  null,
                                        null, null, null], 'O')).toEqual(6);
        expect(game.findOppositeCorner(['X',  null,  null,
                                        null, null,  null,
                                        'X',  null, 'X'], 'X')).toEqual(2);
        expect(game.findOppositeCorner(['X',  null,  'O',
                                        null, null,  null,
                                        null, null,  'X'], 'X')).toEqual(null);
        expect([0,6].includes(game.findOppositeCorner([null, null,  'O',
                                                       null, null,  null,
                                                       null, null,  'O'], 'O'))).toBeTruthy();
      });
    });
  });

  it('findEmptyCorner should return the index of an empty corner', () => {
    const _doc = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    mockingoose(User).toReturn(_doc, 'findOne');
    
    return User.findById('621f4b0f1c74d43035c8dcb5').exec().then(user => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X',
        cell2: 'O',
        cell3: null,
        cell4: null,
        cell5: 'X',
        cell6: 'O',
        cell7: null,
        cell8: 'O',
        cell9: 'X',
      };

      mockingoose(SingleplayerGame).toReturn(_pre_game, 'findOne');
      
      return SingleplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        expect(game.findEmptyCorner(['X',  null,  'O',
                                     null, null, null,
                                     null, null,  'X'])).toEqual(6);
        expect(game.findEmptyCorner([null, null,  'X',
                                     null, null, null,
                                     'X',  null,  'X'])).toEqual(0);
        expect(game.findEmptyCorner(['X',  null, null,
                                     null, null, null,
                                     'X',  null, 'X'], 'X')).toEqual(2);
        expect(game.findEmptyCorner(['X',  null,  'O',
                                     null, null, null,
                                     'O',  null, null])).toEqual(8);
        expect([0,6].includes(game.findEmptyCorner([null, null,  'O',
                                                    null, null, null,
                                                    null, null,  'O']))).toBeTruthy();
        expect([0,2,6,8].includes(game.findEmptyCorner([null, null, null,
                                                        null, null, null,
                                                        null, null, null]))).toBeTruthy();
      });
    });
  });

  it('findEmptySide should return a side-index where the cell is empty', () => {
    const _doc = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    mockingoose(User).toReturn(_doc, 'findOne');
    
    return User.findById('621f4b0f1c74d43035c8dcb5').exec().then(user => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player: user,
        status: 'Ongoing',
        difficulty: 'Easy',
        cell1: 'X',
        cell2: 'O',
        cell3: null,
        cell4: null,
        cell5: 'X',
        cell6: 'O',
        cell7: null,
        cell8: 'O',
        cell9: 'X',
      };

      mockingoose(SingleplayerGame).toReturn(_pre_game, 'findOne');
      
      return SingleplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        expect(game.findEmptySide([null,  'X', null,
                                    'X', null, null,
                                   null,  'O', null])).toEqual(5);
        expect(game.findEmptySide([null,  'X', null,
                                    'X', null,  'O',
                                   null, null, null])).toEqual(7);
        expect(game.findEmptySide([null,  'O', null,
                                   null, null,  'X',
                                   null,  'O', null])).toEqual(3);
        expect(game.findEmptySide([null, null, null,
                                    'X', null,  'X',
                                   null,  'O', null])).toEqual(1);
        expect(game.findEmptySide([null,  'O', null,
                                   null, null,  'X',
                                   null,  'O', null])).toEqual(3);
        expect([1,5].includes(game.findEmptySide([null, null, null,
                                                   'X', null, null,
                                                   null, 'O', null]))).toBeTruthy();
        expect([1,3,5,7].includes(game.findEmptySide([null, null, null,
                                                      null, null, null,
                                                      null, null, null]))).toBeTruthy();
      });
    });
  });

  // fuzzy test difficulty hard.

});
