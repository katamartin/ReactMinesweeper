(function(React) {
  "use strict";
  var Tile = React.createClass({
    render: function() {
      var tile = this.props.tile;
      var klass = "tile";
      var text = "";
      if (tile.explored) {
        klass += " explored";
        if (tile.bombed) {
          klass += " bombed";
          text += "\u2622";
        } else {
          var count = tile.adjacentBombCount();
          text +=  count > 0 ? count : " ";
        }
      } else if (tile.flagged) {
        klass += " flagged";
        text += "\u2691";
      } else {
        text += " "
      }
      return(<div onClick={this.handleClick} className={klass}>{text}</div>);
    },

    handleClick: function(event) {
      event.preventDefault();
      this.props.updateGame(this.props.position, event.altKey);
    }
  });

  var Board = React.createClass({
    render: function() {
      var that = this;
      return (
        <div>
        {
          that.props.board.grid.map(function(row, i) {
            return (
              <div className="row" key={i}>
              {
                row.map(function(tile, j) {
                  return (
                    <Tile
                      tile={tile}
                      position={tile.pos}
                      updateGame={that.props.updateGame}
                      key={[i,j]} />
                  );
                })
              }
              </div>
            );
          })
        }
        </div>
      )
    }
  });

  var Game = React.createClass({
    getInitialState: function() {
      var board = new Minesweeper.Board(10, 10);
      board.explored = false;
      return {board: board, won: false, over: false};
    },

    updateGame: function(pos, flagging) {
      var tile = this.state.board.grid[pos[0]][pos[1]];
      if (flagging) {
        tile.toggleFlag();
      } else if (!this.state.board.explored) {
        this.ensureSafeExploration(pos);
      } else {
        tile.explore();
      }

      if (this.state.board.won()) {
        this.setState({won: true, over: true});
      } else if (this.state.board.lost()) {
        this.setState({won: false, over: true});
      } else {
        this.setState({won: false, over: false});
      }
    },

    ensureSafeExploration: function(pos) {
      var board = this.state.board;
      var tile = board.grid[pos[0]][pos[1]];
      while (tile.bombed) {
        board = new Minesweeper.Board(10, 10);
        tile = board.grid[pos[0]][pos[1]];
      }
      tile.explore();
      board.explored = true;
      this.setState({board: board});
    },

    newGame: function(event) {
      event.preventDefault();
      this.setState(this.getInitialState());
    },

    render: function() {
      var modal = "";
      if (this.state.over) {
        var message = this.state.won? "You won!" : "You lost!";
        modal = <div className="modal-back">
                  <div className="modal">{message}
                    <button onClick={this.newGame}>Play Again?</button>
                  </div>
                </div>;
      }
      return(
        <div>
          {modal}
          <Board board={this.state.board} updateGame={this.updateGame} />
        </div>
      );
    }
  });

  React.render(
    <Game />,
    document.getElementById('content')
  );
}(window.React));
