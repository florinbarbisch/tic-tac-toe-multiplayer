const mockingoose = require('mockingoose');
const User = require('./User');
const MultiplayerGame = require('./MultiplayerGame');

describe('test mongoose MultiplayerGame model', () => {
  it('player should not be able to play against himself', () => {
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
        player1: user,
        player2: null,
        movingPlayer: null,
        winner: 'Ongoing',
        openForRandom: true,
        cell1: 'X',  cell2: null, cell3: null,
        cell4: null, cell5: null, cell6: null,
        cell7: null, cell8: null, cell9: null,
      };
      mockingoose(MultiplayerGame).toReturn(_pre_game, 'findOne');

      return expect(MultiplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        game.setPlayer2(user)
      })).rejects.toThrowErrorMatchingSnapshot('player can\'t play against him-/herself');
    });
  });
  
  it('should set the second player', () => {
    const user1 = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };
    const user2 = {
      _id: '383627afcfdc7ae36bff8a78',
      username: 'musterfrau',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    const userFinderMock = query => {
      expect(query.getQuery()).toMatchSnapshot('findById query');
      if (query.getQuery()._id === '621f4b0f1c74d43035c8dcb5') { return user1; }
      if (query.getQuery()._id === '383627afcfdc7ae36bff8a78') { return user2; }
      return null;
    };

    mockingoose(User).toReturn(userFinderMock, 'findOne');
    
    return Promise.all([
      User.findById('621f4b0f1c74d43035c8dcb5'),
      User.findById('383627afcfdc7ae36bff8a78'),
    ]).then(users => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player1: users[0],
        player2: null,
        movingPlayer: null,
        winner: 'Ongoing',
        openForRandom: true,
        cell1: 'X',  cell2: null, cell3: null,
        cell4: null, cell5: null, cell6: null,
        cell7: null, cell8: null, cell9: null,
      };
      mockingoose(MultiplayerGame).toReturn(_pre_game, 'findOne');

      jest.useFakeTimers()
      return MultiplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        game.setPlayer2(users[1]);
        expect(game.player2).toEqual(users[1]);
        expect(game.movingPlayer).toEqual(users[1]);
        expect(game.openForRandom).toEqual(false);
      });
    });
  });

  it('move should play the players move and set X as the winner', () => {
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
        player1: user,
        player2: null,
        movingPlayer: user,
        winner: 'Ongoing',
        openForRandom: false,
        cell1: 'X',  cell2: 'O', cell3: null,
        cell4: null, cell5: 'X', cell6: 'X',
        cell7: null, cell8: 'O', cell9: 'O',
      };
      mockingoose(MultiplayerGame).toReturn(_pre_game, 'findOne');

      jest.useFakeTimers()
      return MultiplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        game.move(user, 3);
        expect(game.cell4).toEqual('X');
        expect(game.winner).toEqual('X');
      });
    });
  });

  it('should set the winner to X if X is the winner', () => {
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
        player1: user,
        player2: null,
        movingPlayer: user,
        winner: 'Ongoing',
        openForRandom: false,
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
      mockingoose(MultiplayerGame).toReturn(_pre_game, 'findOne');

      jest.useFakeTimers()
      return MultiplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        game.saveWinner('X');
        expect(game.winner).toEqual('X');
      });
    });
  });

  it('should set the winner to O if O is the winner', () => {
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
        player1: user,
        player2: null,
        movingPlayer: user,
        winner: 'Ongoing',
        openForRandom: false,
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
      mockingoose(MultiplayerGame).toReturn(_pre_game, 'findOne');

      jest.useFakeTimers()
      return MultiplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        game.saveWinner('O');
        expect(game.winner).toEqual('O');
      });
    });
  });

  it('should set the winner to D if D is the winner', () => {
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
        player1: user,
        player2: null,
        movingPlayer: user,
        winner: 'Ongoing',
        openForRandom: false,
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
      mockingoose(MultiplayerGame).toReturn(_pre_game, 'findOne');

      jest.useFakeTimers()
      return MultiplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        game.saveWinner('D');
        expect(game.winner).toEqual('D');
      });
    });
  });

  it('should set the winner to Ongoing if the winner is not X,O or D', () => {
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
        player1: user,
        player2: null,
        movingPlayer: user,
        winner: 'Ongoing',
        openForRandom: false,
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
      mockingoose(MultiplayerGame).toReturn(_pre_game, 'findOne');

      jest.useFakeTimers()
      return MultiplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        game.saveWinner(null);
        expect(game.winner).toEqual('Ongoing');
      });
    });
  });

  it('should set the field if a move is played', () => {
    const user1 = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };
    const user2 = {
      _id: '383627afcfdc7ae36bff8a78',
      username: 'musterfrau',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    const userFinderMock = query => {
      expect(query.getQuery()).toMatchSnapshot('findById query');
      if (query.getQuery()._id === '621f4b0f1c74d43035c8dcb5') { return user1; }
      if (query.getQuery()._id === '383627afcfdc7ae36bff8a78') { return user2; }
      return null;
    };

    mockingoose(User).toReturn(userFinderMock, 'findOne');
    
    return Promise.all([
      User.findById('621f4b0f1c74d43035c8dcb5'),
      User.findById('383627afcfdc7ae36bff8a78'),
    ]).then(users => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player1: users[0],
        player2: users[1],
        movingPlayer: users[0],
        winner: 'Ongoing',
        openForRandom: false,
        cell1: 'X',  cell2: 'O', cell3: null,
        cell4: null, cell5: 'X', cell6: 'X',
        cell7: null, cell8: 'O', cell9: 'O',
      };
      
      mockingoose(MultiplayerGame).toReturn(_pre_game, 'findOne');

      return expect(MultiplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        game.playMove(users[0], 2);
        expect(game.cell3).toBe('X');
        expect(game.movingPlayer).toBe(users[1]);

        game.playMove(users[1], 6);
        expect(game.cell7).toBe('O');
        expect(game.movingPlayer).toBe(users[0]);
        
        // check if other cells are unchanged
        expect(game.cell1).toBe('X');
        expect(game.cell2).toBe('O');
        expect(game.cell4).toBe(null);
        expect(game.cell5).toBe('X');
        expect(game.cell6).toBe('X');
        expect(game.cell8).toBe('O');
        expect(game.cell9).toBe('O');
      }));
    });
  });
  
  it('should throw an error if the cell is not empty', () => {
    const user1 = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };
    const user2 = {
      _id: '383627afcfdc7ae36bff8a78',
      username: 'musterfrau',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    const userFinderMock = query => {
      expect(query.getQuery()).toMatchSnapshot('findById query');
      if (query.getQuery()._id === '621f4b0f1c74d43035c8dcb5') { return user1; }
      if (query.getQuery()._id === '383627afcfdc7ae36bff8a78') { return user2; }
      return null;
    };

    mockingoose(User).toReturn(userFinderMock, 'findOne');
    
    return Promise.all([
      User.findById('621f4b0f1c74d43035c8dcb5'),
      User.findById('383627afcfdc7ae36bff8a78'),
    ]).then(users => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player1: users[0],
        player2: users[1],
        movingPlayer: users[0],
        winner: 'Ongoing',
        openForRandom: false,
        cell1: 'X',  cell2: 'O', cell3: null,
        cell4: null, cell5: 'X', cell6: 'X',
        cell7: null, cell8: 'O', cell9: 'O',
      };
      
      mockingoose(MultiplayerGame).toReturn(_pre_game, 'findOne');

      return expect(MultiplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        game.playMove(users[0], 0);
      })).rejects.toThrowErrorMatchingSnapshot("cell not empty");
    });
  });
  
  it('should throw an error if it\'s the other players turn', () => {
    const user1 = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };
    const user2 = {
      _id: '383627afcfdc7ae36bff8a78',
      username: 'musterfrau',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    const userFinderMock = query => {
      expect(query.getQuery()).toMatchSnapshot('findById query');
      if (query.getQuery()._id === '621f4b0f1c74d43035c8dcb5') { return user1; }
      if (query.getQuery()._id === '383627afcfdc7ae36bff8a78') { return user2; }
      return null;
    };

    mockingoose(User).toReturn(userFinderMock, 'findOne');
    
    return Promise.all([
      User.findById('621f4b0f1c74d43035c8dcb5'),
      User.findById('383627afcfdc7ae36bff8a78'),
    ]).then(users => {
      const _pre_game = {
        _id: '621f4aa81c74d43035c8dcb3',
        player1: users[0],
        player2: users[1],
        movingPlayer: users[0],
        winner: 'Ongoing',
        openForRandom: false,
        cell1: 'X',  cell2: 'O', cell3: null,
        cell4: null, cell5: 'X', cell6: 'X',
        cell7: null, cell8: 'O', cell9: 'O',
      };
      
      mockingoose(MultiplayerGame).toReturn(_pre_game, 'findOne');

      return expect(MultiplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        game.playMove(users[1], 3);
      })).rejects.toThrowErrorMatchingSnapshot("not your turn");
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
        player1: user,
        player2: null,
        movingPlayer: user,
        winner: 'Ongoing',
        openForRandom: false,
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
        for: {
          _id: '621f4b0f1c74d43035c8dcb5',
          username: 'mustermann',
        },
        player: {
          _id: '621f4b0f1c74d43035c8dcb5',
          username: 'mustermann',
        },
        opponent: null,
        yourTurn: true,
        winner: 'Ongoing',
        statusText: null,
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

      mockingoose(MultiplayerGame).toReturn(_pre_game, 'findOne');

      return MultiplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(game => {
        expect(JSON.parse(JSON.stringify(game.toJSONFor(user)))).toMatchObject(_post_game);
      });
    });
  });

  it('should return the correct status for the given user', () => {
    const user1 = {
      _id: '621f4b0f1c74d43035c8dcb5',
      username: 'mustermann',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };
    const user2 = {
      _id: '383627afcfdc7ae36bff8a78',
      username: 'musterfrau',
      salt: '541c7d6fbc0c32c2321cc4d7e008db68',
      hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
    };

    const userFinderMock = query => {
      expect(query.getQuery()).toMatchSnapshot('findById query');
      if (query.getQuery()._id === '621f4b0f1c74d43035c8dcb5') { return user1; }
      if (query.getQuery()._id === '383627afcfdc7ae36bff8a78') { return user2; }
      return null;
    };

    mockingoose(User).toReturn(userFinderMock, 'findOne');
    
    return Promise.all([
      User.findById('621f4b0f1c74d43035c8dcb5'),
      User.findById('383627afcfdc7ae36bff8a78'),
    ]).then(users => {
      const game1 = {
        _id: '86d4461256c8d4e70184d354',
        player1: users[0],
        player2: users[1],
        movingPlayer: users[1],
        winner: 'Ongoing',
        openForRandom: false,
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
      const game2 = {
        _id: 'c2c9563b27e8afbe18f92e70',
        player1: users[0],
        player2: users[1],
        movingPlayer: null,
        winner: 'D',
        openForRandom: false,
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
      const game3 = {
        _id: 'bf59287d2616493ccdbb9538',
        player1: users[0],
        player2: users[1],
        movingPlayer: null,
        winner: 'X',
        openForRandom: false,
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
      const game4 = {
        _id: '971070ea196624f4a42f26e3',
        player1: users[0],
        player2: users[1],
        movingPlayer: null,
        winner: 'O',
        openForRandom: false,
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
      
      const gameFinderMock = query => {
        expect(query.getQuery()).toMatchSnapshot('findById query');
        if (query.getQuery()._id === '86d4461256c8d4e70184d354') { return game1; }
        if (query.getQuery()._id === 'c2c9563b27e8afbe18f92e70') { return game2; }
        if (query.getQuery()._id === 'bf59287d2616493ccdbb9538') { return game3; }
        if (query.getQuery()._id === '971070ea196624f4a42f26e3') { return game4; }
        return null;
      };

      mockingoose(MultiplayerGame).toReturn(gameFinderMock, 'findOne');

      return Promise.all([
        MultiplayerGame.findById('86d4461256c8d4e70184d354'),
        MultiplayerGame.findById('c2c9563b27e8afbe18f92e70'),
        MultiplayerGame.findById('bf59287d2616493ccdbb9538'),
        MultiplayerGame.findById('971070ea196624f4a42f26e3'),
      ]).then(games => {
        expect(JSON.parse(JSON.stringify(games[0].getStatusFor(users[0])))).toBeNull();
        expect(JSON.parse(JSON.stringify(games[0].getStatusFor(users[1])))).toBeNull();
        expect(JSON.parse(JSON.stringify(games[1].getStatusFor(users[0])))).toBe('Draw!');
        expect(JSON.parse(JSON.stringify(games[1].getStatusFor(users[1])))).toBe('Draw!');
        expect(JSON.parse(JSON.stringify(games[2].getStatusFor(users[0])))).toBe('You won!');
        expect(JSON.parse(JSON.stringify(games[2].getStatusFor(users[1])))).toBe('You lost!');
        expect(JSON.parse(JSON.stringify(games[3].getStatusFor(users[0])))).toBe('You lost!');
        expect(JSON.parse(JSON.stringify(games[3].getStatusFor(users[1])))).toBe('You won!');
      });
    });
  });

  it('should return the an array with all the cells', () => {
    const _doc = {
      _id: '621f4aa81c74d43035c8dcb3',
      player1: {
        _id: '621f4b0f1c74d43035c8dcb5',
        username: 'mustermann',
        salt: '541c7d6fbc0c32c2321cc4d7e008db68',
        hash: '489b1c8e3c4d5783fead628a0bde64c1fa7d1e65084dfea4a42f36eaf99be18053b20b15454f6c13ebf26c2de5296783222ebe3b845b00646a12b972917792785c17ed0717a903a0f63d86f38e0bf7d1ddfbfe5a6a39041ac3d6d0698626481a92bdc0139ee3ee1806df66198f9df1c169e0d526e461a049839115b159ab172b8375f2bcc5c85c60df27094b20ee9a027f64dc28165f2f83bd7b62c8c3fec613d892d4ccb5f4b028911884eacbb19385d50307357df27db3fa455efae65a21c094f910a18d2c31b0f9d6c4124cf30b77e5734712759e2ef17b29533d9eac9080829738df85e6f5b0a3db142d67b865955e3d7546a3794882a40327df71c2334424d0f1a278cb29d54b2f830b2500fd28e9f45f977f6ab907b6d63ae37111d5221977a7ab0e4dbb554e3043d0160c8368c96f0da9a46959332d1890290973a73bb1aff07771e65d779383cc552def153f08b48756fde57582da04873689e9d945af80481b8a34dcaca5cdf1addb922be4888da2ffbd454cc0faffe656e99d0d5e89fa4f49d683aac1d86e1bb6281e4659d2fdb230bcd8621db7196508b0e9985a6c2ebfcbe2129e725f54a4ece1fe68ce2532002c60d9f977688938f8f908a8722f00281b6ad3c83791c6f1672311be97232f35d48e44d4f7eaa5a559ffd1d0fcd127f16e99d683f941e42fbbcf21268d13f545e8110b361b2b18fa5f1cd239ce',
      },
      player2: null,
      movingPlayer: '621f4b0f1c74d43035c8dcb5',
      winner: 'Ongoing',
      openForRandom: false,
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

    mockingoose(MultiplayerGame).toReturn(_doc, 'findOne');

    return MultiplayerGame.findById('621f4aa81c74d43035c8dcb3').exec().then(doc => {
      expect(JSON.parse(JSON.stringify(doc.getBoard()))).toMatchObject(board);
    });
  });

});