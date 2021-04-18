var game = {
  app: document.querySelector('#app'),
  divPlayer: document.querySelector('#player'),
  divDealer: document.querySelector('#dealer'),
  dicesPlayer: document.querySelectorAll('#player .dice'),
  dicesDealer: document.querySelectorAll('#dealer .dice'),
  menu: document.querySelector('.menu'),
  scores: document.querySelector('.scores'),
  scorePlayer: document.querySelector('.scorePlayer'),
  scoreDealer: document.querySelector('.scoreDealer'),
  menuBtn: document.querySelector('.menuBtn'),
  playBtn: document.querySelector('.playBtn'),
  lis: document.querySelectorAll('li'),

  diceArray: [], // tableau qui stock tous les dés
  scoreArrayPlayer: [],
  scoreArrayDealer: [],
  // générer un nombre pseudo-aléatoire
  randomNumber: function () {
    return Math.floor(Math.random() * 6 + 1);
  },

  // selection et création du nombre de dés
  createDice: function (nbrDice, player, dealer) {
    // Création des Dés (x2 parceque 2joueurs)
    for (var i = 0; i < nbrDice * 2; i++) {
      var divDice = document.createElement('div');
      divDice.className = 'dice';

      if (i < nbrDice) {
        // distribution de la moitié des Dés à Player
        player.appendChild(divDice);
      } else {
        // distribution de l'autre moitié à Dealer
        dealer.appendChild(divDice);
      }
      game.diceArray.push(divDice);
    }
  },

  // fonction qui modifie le background-position en fonction d'un nombre pseudo-aléatoire
  diceRoller: function () {
    //on itère dans l'Array qui contient les Dés pour lancer
    //un Math.random() sur chaque Dés individuellement
    for (var i = 0; i < game.diceArray.length; i++) {
      var randomNbr = game.randomNumber();
      game.diceArray[i].style.backgroundPositionX = `${
        (randomNbr - 1) * -100
      }px`;
      if (i < game.diceArray.length / 2) {
        game.scoreArrayPlayer.push(randomNbr);
      } else {
        game.scoreArrayDealer.push(randomNbr);
      }
    }
    game.scorePlayer.textContent = game.scoreArrayPlayer.reduce(
      (sum, current) => sum + current
    );
    game.scoreDealer.textContent = game.scoreArrayDealer.reduce(
      (sum, current) => sum + current
    );
  },

  gameInit: function () {
    // disparition du plateau de jeux + affichage du menu
    game.menu.style.display = 'block';
    game.scores.style.display = 'none';
    game.menuBtn.style.display = 'none';
    game.playBtn.style.display = 'none';
    game.app.style.display = 'none';
  },

  play: function (nbrDice) {
    // disparition du menu + affichage plateau de jeux
    game.menu.style.display = 'none';
    game.scores.style.display = '';
    game.menuBtn.style.display = '';
    game.playBtn.style.display = '';
    game.app.style.display = '';
    // param1: nrb de dés par joueurs, param2 Player, param3: Dealer
    game.createDice(nbrDice, game.divPlayer, game.divDealer);
    // jetté de Dès au clique sur le bouton "Lancez les Dés !"
  },
};

// Menu : choix du nombre de dés
game.gameInit();

// Click, choix du nombre de dés
game.lis.forEach((li) => {
  li.addEventListener('click', () => {
    var nbrDice = +li.textContent;
    game.play(nbrDice);
  });
});

// Click, retour au menu du chois du nombre de dés
game.menuBtn.addEventListener('click', () => {
  game.divPlayer.innerHTML = '';
  game.divDealer.innerHTML = '';
  game.diceArray = [];
  game.scoreArrayPlayer = [];
  game.scoreArrayDealer = [];
  game.scorePlayer.textContent = '0';
  game.scoreDealer.textContent = '0';

  game.gameInit();
});

// Click, relancer les dés !
game.playBtn.addEventListener('click', () => {
  game.diceRoller();
  checkWinner(100);
});

function checkWinner(limit) {
  if (
    +game.scoreDealer.textContent >= limit ||
    +game.scorePlayer.textContent >= limit
  ) {
    if (+game.scorePlayer.textContent > +game.scoreDealer.textContent) {
      alert("O'clock l'emporte Haut la Main !!!");
      game.playBtn.style.display = 'none';
    } else {
      alert('Hmmpf..! les machines triches de toutes façon...');
      game.playBtn.style.display = 'none';
    }
  }
}
