(function(React) {
  "use strict";
  var Tile = React.createClass({
    render: function() {
      return(<div>" T "</div>);
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
              <div key={i}>
              {
                row.map(function(tile, j) {
                  return (
                    <Tile position={tile.pos} updateGame={that.updateGame} key={[i,j]}/>
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
