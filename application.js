(function(React) {
  "use strict";
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
}(window.React));
