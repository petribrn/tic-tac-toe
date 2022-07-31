const X_MARK = 'X'
const O_MARK = 'O'

const FIRST_PLAYER = 'FIRST_PLAYER'
const SECOND_PLAYER = 'SECOND_PLAYER'

class TicTacWinPossibilities {
  static generate() {
    const winPossibilities = [];

    winPossibilities.push(...this._buildColumnWinPossibilities());
    winPossibilities.push(...this._buildRowWinPossibilities());
    winPossibilities.push(...this._buildDiagonalWinPossibilities());

    return winPossibilities;
  }

  static getWinningCondition(board, marker, winPossibilities) {
    for (let cellsToWin of winPossibilities) {
      let winCellMatchedCount = 0;

      for (let cell of cellsToWin) {
        if (board[cell.x][cell.y] === marker) {
          winCellMatchedCount += 1;
        } else {
          break;
        }
      }

      if (winCellMatchedCount === 3) {
        return cellsToWin;
      }
    }

    return null;
  }

  static _buildColumnWinPossibilities() {
    const winPossibilities = []
    for (let columnIndex = 0; columnIndex < 3; columnIndex += 1 ) {
      winPossibilities.push([
        { x: columnIndex, y: 0 }, 
        { x: columnIndex, y: 1 }, 
        { x: columnIndex, y: 2 }
      ]);
    }
    return winPossibilities;
  }

  static _buildRowWinPossibilities() {
    const winPossibilities = []
    for (let rowIndex = 0; rowIndex < 3; rowIndex += 1 ) {
      winPossibilities.push([
        { x: 0, y: rowIndex }, 
        { x: 1, y: rowIndex }, 
        { x: 2, y: rowIndex }
      ]);
    }
    return winPossibilities;
  }

  static _buildDiagonalWinPossibilities() {
    const winPossibilities = [];

    winPossibilities.push([
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ])

    winPossibilities.push([
      { x: 2, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 2 },
    ])

    return winPossibilities;
  }
}

class TicTacToeNodes {
  static getCell(position) {
    return document.getElementById(`cell-${position.x}-${position.y}`)
  }

  static getStartGameButton() {
    return document.getElementById('init-game-button')
  }

  static getChangePlayerNamesButton() {
    return document.getElementById('change-players-names')
  }

  static getUpdatePlayersButton() {
    return document.getElementById('update-players')
  }

  static getPlayersForm() {
    return document.getElementById('players-form')
  }

  static getPlayersInputs() {
    const firstPlayerInput = document.getElementById('player-1-name')
    const secondPlayerInput = document.getElementById('player-2-name')

    return [firstPlayerInput, secondPlayerInput]
  }

  static getScoreboard() {
    const scoreboard = document.getElementById('scoreboard')

    const firstPlayerName = document.getElementById('first-player-name')
    const firstPlayerScore = document.getElementById('first-player-score')

    const secondPlayerName = document.getElementById('second-player-name')
    const secondPlayerScore = document.getElementById('second-player-score')

    return {
      node: scoreboard,
      players: {
        first: {
          name: firstPlayerName,
          score: firstPlayerScore
        },
        second: {
          name: secondPlayerName,
          score: secondPlayerScore
        }
      },
    }
  }

  static getNodesWithPosition() {
    const nodesWithPosition = [];

    for (let columnIndex = 0; columnIndex < 3; columnIndex += 1) {
      for (let rowIndex = 0; rowIndex < 3; rowIndex += 1) {
        nodesWithPosition.push({
          node: this.getCell({ x: columnIndex, y: rowIndex }),
          position: { x: columnIndex, y: rowIndex }
        });
      }
    }

    return nodesWithPosition;
  }

  static getResetMatchButton() {
    return document.getElementById('reset-match')
  }

  static getResetScoreboardButton() {
    return document.getElementById('reset-scoreboard')
  }

  static getAnnouncer() {
    return document.getElementById('announcer-section');
  }
}

class TicTacToeRenderer {
  renderCell(position, marker) {
    const cellDiv = TicTacToeNodes.getCell(position);
    cellDiv.textContent = marker || ""
  }

  highlightWinningCells(winningCells) {
    winningCells.forEach(cellPosition => {
      const cellDiv = TicTacToeNodes.getCell(cellPosition);
      cellDiv.classList.add('border-success');
      cellDiv.classList.add('border-3');
      cellDiv.classList.add('text-success');
    })
  }

  renderBoard() {
    for (let columnIndex = 0; columnIndex < 3; columnIndex += 1) {
      for (let rowIndex = 0; rowIndex < 3; rowIndex += 1) {
        this.renderCell({ x: columnIndex, y: rowIndex });
        this.resetHighlight({ x: columnIndex, y: rowIndex });
      }
    }
  }

  hidePlayersForm() {
    const playersForm = TicTacToeNodes.getPlayersForm();
    playersForm.style.setProperty('display', 'none', 'important');
  }

  showPlayersForm() {
    const playersForm = TicTacToeNodes.getPlayersForm();
    playersForm.style.setProperty('display', 'block', 'important')
  }

  showChangePlayerNamesButton() {
    const changePlayerNamesButton = TicTacToeNodes.getChangePlayerNamesButton();
    changePlayerNamesButton.style.setProperty('display', 'flex', 'important')
  }

  hideChangePlayerNamesButton() {
    const changePlayerNamesButton = TicTacToeNodes.getChangePlayerNamesButton();
    changePlayerNamesButton.style.setProperty('display', 'none', 'important')
  }

  showUpdatePlayersButton() {
    const updatePlayersButton = TicTacToeNodes.getUpdatePlayersButton();
    updatePlayersButton.style.setProperty('display', 'flex', 'important')
  }

  hideUpdatePlayersButton() {
    const updatePlayersButton = TicTacToeNodes.getUpdatePlayersButton();
    updatePlayersButton.style.setProperty('display', 'none', 'important')
  }

  renderAnnouncer(message) {
    const announcer = TicTacToeNodes.getAnnouncer();
    announcer.textContent = message;
  }

  showAnnouncer() {
    const announcer = TicTacToeNodes.getAnnouncer();
    announcer.style.setProperty('display', 'flex', 'important');
  }

  disableCells() {
    for (let columnIndex = 0; columnIndex < 3; columnIndex += 1) {
      for (let rowIndex = 0; rowIndex < 3; rowIndex += 1) {
        this.renderCell({ x: columnIndex, y: rowIndex });
      }
    }
  }
  
  resetHighlight(position) {
    const cellDiv = TicTacToeNodes.getCell(position)
    cellDiv.classList.remove('border-success');
    cellDiv.classList.remove('border-3');
    cellDiv.classList.remove('text-success');
  }

  showScoreboard() {
    const scoreboard = TicTacToeNodes.getScoreboard().node;
    scoreboard.style.setProperty('display', 'flex', 'important');
  }

  renderScoreboard(playersNameAndScore) {
    const scoreboard = TicTacToeNodes.getScoreboard();

    scoreboard.players.first.name.textContent = playersNameAndScore.firstPlayer.name;
    scoreboard.players.first.score.textContent = playersNameAndScore.firstPlayer.score;

    scoreboard.players.second.name.textContent = playersNameAndScore.secondPlayer.name;
    scoreboard.players.second.score.textContent = playersNameAndScore.secondPlayer.score;
  }

  getPlayerNames() {
    const playersInputs = TicTacToeNodes.getPlayersInputs();
    
    return [
      playersInputs[0].value, 
      playersInputs[1].value
    ]
  }

  showResetMatchButton() {
    const resetMatchButton = TicTacToeNodes.getResetMatchButton();
    resetMatchButton.style.setProperty('display', 'flex', 'important');
  }

  hideStartGameButton() {
    const startGameButton = TicTacToeNodes.getStartGameButton();
    startGameButton.style.setProperty('display', 'none', 'important');
  }
}

class TicTacToe {
  constructor() {
    this.board = null;
    this.players = { [FIRST_PLAYER]: null, [SECOND_PLAYER]: null };
    this.renderer = new TicTacToeRenderer();
    this.firstToPlayId = SECOND_PLAYER;
    this.currentPlayerId = this.firstToPlayId;
    this.gameStopped = true;
    this.gameFinishedState = null;
  }

  initialize() {
    this._initializeBoard();
    this._setupListerners();
    this._setupWinPossibilities();
  }

  startGame() {
    this.gameStopped = false;
    this.gameFinishedState = null;

    this._initializeBoard();
    this._switchFirstPlayer();
    this.currentPlayerId = this.firstToPlayId;

    const firstToPlay = this.players[this.firstToPlayId];
    this.renderer.renderAnnouncer(`Vez de ${firstToPlay.name}`);
    this.renderer.hideStartGameButton();
    this.renderer.showAnnouncer();
    this.renderer.renderBoard();
    this.renderer.hidePlayersForm();
    this.renderer.renderScoreboard(this._buildScoreboardData());
    this.renderer.showScoreboard();
    this.renderer.showChangePlayerNamesButton();
    this.renderer.showResetMatchButton();
  }

  updatePlayerNamesToInputs() {
    const playersNames = this.renderer.getPlayerNames();
    this.updatePlayerNames(playersNames[0], playersNames[1]);
  }

  updatePlayerNames(firstPlayerName, secondPlayerName) {
    this.players[FIRST_PLAYER].name = firstPlayerName;
    this.players[SECOND_PLAYER].name = secondPlayerName;
  }

  resetScoreboard() {
    this.players[FIRST_PLAYER].score = 0;
    this.players[SECOND_PLAYER].score = 0;
    this.renderer.renderScoreboard(this._buildScoreboardData());
  }

  setPlayers(firstPlayerName, secondPlayerName) {
    const firstPlayer = new Player(firstPlayerName);
    const secondPlayer = new Player(secondPlayerName);

    this.players = {
      [FIRST_PLAYER]: firstPlayer,
      [SECOND_PLAYER]: secondPlayer,
    };

    this._setupPlayerMarkers();
  }

  mark(position) {
    if (this.gameStopped) return;
    if (this.board[position.x][position.y]) return;

    const playerId = this.currentPlayerId;
    const player = this.players[playerId];
    this._switchPlayerRound();

    const newPlayer = this.players[this.currentPlayerId];

    this.board[position.x][position.y] = player.marker;
    this.renderer.renderCell(position, player.marker);
    this.renderer.renderAnnouncer(`Vez de ${newPlayer.name}`);

    const winningCondition = TicTacWinPossibilities.getWinningCondition(this.board, player.marker, this.winPossibilities);
    if (winningCondition) {
      this.onWon(playerId, winningCondition);
      return;
    }

    const isInTie = this._isAllMarked();
    if(isInTie) {
      this.onTie();
      return;
    }
  }

  onWon(winnerPlayerId, winningCondition) {
    this.gameStopped = true;
    this.gameFinishedState = {
      state: 'won',
      player: this.players[winnerPlayerId],
    }

    const winnerPlayer = this.players[winnerPlayerId];
    winnerPlayer.score += 1;

    this.renderer.renderScoreboard(this._buildScoreboardData());
    this.renderer.renderAnnouncer(`${winnerPlayer.name} venceu!`);
    this.renderer.highlightWinningCells(winningCondition);
  }

  onTie() {
    this.gameStopped = true;
    this.gameFinishedState = {
      state: 'tie'
    }

    this.renderer.renderAnnouncer(`Empate!`);
  }

  onClickChangePlayerNamesButton() {
    this.renderer.hideChangePlayerNamesButton();
    this.renderer.showPlayersForm();
    this.renderer.showUpdatePlayersButton();
  }

  onClickUpdatePlayersButton() {
    this.updatePlayerNamesToInputs();
    this.renderer.renderScoreboard(this._buildScoreboardData());

    const message = this.gameFinishedState ? 
      this.gameFinishedState.state === 'won' ? 
        `${this.gameFinishedState.player.name} venceu!` : 
        `Empate!`
      : `Vez de ${this.players[this.currentPlayerId].name}`;

    this.renderer.renderAnnouncer(message);

    this.renderer.showChangePlayerNamesButton();
    this.renderer.hidePlayersForm();
    this.renderer.hideUpdatePlayersButton();
  }

  _buildScoreboardData() {
    return {
      firstPlayer: {
        name: this.players[FIRST_PLAYER].name,
        score: this.players[FIRST_PLAYER].score
      },
      secondPlayer: {
        name: this.players[SECOND_PLAYER].name,
        score: this.players[SECOND_PLAYER].score
      },
    }
  }

  _switchFirstPlayer() {
    if (this.firstToPlayId === FIRST_PLAYER) {
      this.firstToPlayId = SECOND_PLAYER
    } else {
      this.firstToPlayId = FIRST_PLAYER
    }
  }

  _switchPlayerRound() {
    if (this.currentPlayerId === FIRST_PLAYER) {
      this.currentPlayerId = SECOND_PLAYER
    } else {
      this.currentPlayerId = FIRST_PLAYER
    }
  }

  _isAllMarked() {
    let markedCount = 0;

    for (let columnIndex = 0; columnIndex < 3; columnIndex += 1) {
      for (let rowIndex = 0; rowIndex < 3; rowIndex += 1) {
        if (this.board[columnIndex][rowIndex] !== null) {
          markedCount += 1;
        }
      }
    }

    return markedCount === 9;
  }

  _setupListerners() {
    TicTacToeNodes.getStartGameButton().onclick = (event) => {
      event.preventDefault();
      
      const playersNames = this.renderer.getPlayerNames();
      this.setPlayers(playersNames[0], playersNames[1]);
      
      this.startGame();
    }
    
    TicTacToeNodes.getNodesWithPosition().forEach(({ node, position }) => {
      node.onclick = (event) => {
        event.preventDefault();
        this.mark(position);
      }
    })

    TicTacToeNodes.getResetMatchButton().onclick = () => {
      this.startGame();
    }

    TicTacToeNodes.getResetScoreboardButton().onclick = () => {
      this.resetScoreboard();
    }

    TicTacToeNodes.getChangePlayerNamesButton().onclick = () => {
      this.onClickChangePlayerNamesButton();
    }

    TicTacToeNodes.getUpdatePlayersButton().onclick = () => {
      this.onClickUpdatePlayersButton();
    }
  }

  _setupWinPossibilities() {
    this.winPossibilities = TicTacWinPossibilities.generate();
  }

  _initializeBoard() {
    const board = []
    for (let columnIndex = 0; columnIndex < 3; columnIndex += 1) {
      const column = []
      for (let rowIndex = 0; rowIndex < 3; rowIndex += 1) {
        column.push(null);
      }
      board.push(column);
    }
    this.board = board;
  }

  _setupPlayerMarkers() {
    this.players[FIRST_PLAYER].marker = X_MARK;
    this.players[SECOND_PLAYER].marker = O_MARK;
  }
}

class Player {
  constructor(name, score, marker) {
    this.name = name || ""
    this.score = score || 0
    this.marker = marker || null;
  }
}

const game = new TicTacToe();
game.initialize();