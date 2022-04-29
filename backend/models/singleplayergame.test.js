const mockingoose = require('mockingoose');
const User = require('./user');
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
        game.playMove(true, 8).catch(err => {
          
        expect(err).rejects.toEqual({
          error: 'cell not empty',
        });
      });
      
      });
    });
  });
});
