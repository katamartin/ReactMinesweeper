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
          text += "&#9762;";
        } else {
          var count = tile.adjacentBombCount();
          text +=  count > 0 ? count : " ";
        }
      } else if (tile.flagged) {
        klass += "flagged";
        text += "&#9873;";
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
      return {board: board, won: false, over: false};
    },

    updateGame: function() {
      // console.log("hey");
    },

    render: function() {
      return(
        <Board board={this.state.board} updateGame={this.updateGame}/>
      );
    }
  });

  React.render(
    <Game />,
    document.getElementById('content')
  );
}(window.React));
