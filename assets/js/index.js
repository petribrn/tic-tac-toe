const X_MARK = 'X'
const O_MARK = 'O'

const FIRST_PLAYER = 'FIRST_PLAYER'
const SECOND_PLAYER = 'SECOND_PLAYER'

class TicTacToeNodes {
  static getCell(position) {
    return document.getElementById(`cell-${position.x}-${position.y}`)
  }

  static getStartGameButton() {
    return document.getElementById('init-game-button')
  }

  static getStartUpdatePlayersButton() {
    return document.getElementById('start-update-players')
  }

  static getUpdatePlayersButton() {
    return document.getElementById('update-players')
  }

  static getPlayersForm() {
    return document.getElementById('players-form')
  }
}

class TicTacWinPossibilities {
  static generate() {
    const winPossibilities = [];

    winPossibilities.push(...this._buildColumnWinPossibilities());
    winPossibilities.push(...this._buildRowWinPossibilities());
    winPossibilities.push(...this._buildDiagonalWinPossibilities());

    return winPossibilities;
  }

  static getWinningCondition(board, marker, winPossibilities) {
    for (let cellsToWin in winPossibilities) {
      let winCellMatchedCount = 0;

      for (let cell in cellsToWin) {
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

  hidePlayerRegister() {
    console.log('hide')
    const playersForm = TicTacToeNodes.getPlayersForm();
    playersForm.style.display = 'none !important';
  }

  showPlayerRegister() {
    // TODO
  }

  showWinScreen(winnerName) {
    // TODO
  }

  showTieScreen() {
    // TODO
  }

  disableCells() {
    for (let columnIndex = 0; columnIndex < 3; columnIndex += 1) {
      for (let rowIndex = 0; rowIndex < 3; rowIndex += 1) {
        this.renderCell({ x: columnIndex, y: rowIndex });
      }
    }
  }

  updateScore(players) {}
  
  resetHighlight(position) {
    const cellDiv = TicTacToeNodes.getCell(position)
    cellDiv.classList.remove('border-success');
    cellDiv.classList.remove('border-3');
    cellDiv.classList.remove('text-success');
  }

  renderScore(player) {}
}

class TicTacToe {
  constructor() {
    this.board = null;
    this.players = { [FIRST_PLAYER]: null, [SECOND_PLAYER]: null };
    this.renderer = new TicTacToeRenderer();
    this.firstToPlay = SECOND_PLAYER;
  }

  initialize() {
    this._initializeBoard();
    this._setupListerners();
    this._setupWinPossibilities();
  }

  startGame() {
    this.board = this._initializeBoard();
    this._switchFirstPlayer();
    
    this.renderer.renderBoard();
    this.renderer.hidePlayerRegister();
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

  updatePlayerNames(firstPlayerName, secondPlayerName) {
    this.players[FIRST_PLAYER].name = firstPlayerName;
    this.players[SECOND_PLAYER].name = secondPlayerName;
  }

  mark(player, position) {
    this.board[position.x][position.y] = player.marker;
    this._renderCell(position);

    const hasWon = TicTacWinPossibilities.getWinningCondition(this.board, player.marker, this.winPossibilities);
    if (hasWon) {
      this.onWon(player);
      return;
    }

    const isInTie = this._isAllMarked();
    if(isInTie) {
      this.onTie();
      return;
    }
  }

  onWon(winnerPlayerPosition) {
    const winnerPlayer = this.players[winnerPlayerPosition];
    winnerPlayer.score += 1;

    this.renderer.showWinScreen(winnerPlayer.name);
  }

  onTie() {
    this.renderer.showTieScreen();
  }

  _switchFirstPlayer() {
    if (this.firstToPlay === FIRST_PLAYER) {
      this.firstToPlay = SECOND_PLAYER
    } else {
      this.firstToPlay = FIRST_PLAYER
    }
  }

  _isAllMarked() {
    const markedCount = 0;

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
      this.startGame();
    }
    // TODO
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
    this.players.first.marker = X_MARK;
    this.players.second.marker = O_MARK;
  }
}

class Player {
  constructor(name, score, marker) {
    this.name = name
    this.score = score
    this.marker = marker || null;
  }
}

const game = new TicTacToe();
game.initialize();