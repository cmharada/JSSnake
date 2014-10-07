/*global Snakes*/
(function() {
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }
  
  var View = Snakes.View = function ($el) {
    this.board = new Snakes.Board();
    this.el = $el;
    this.buildBoard();
    this.addListener();
    var that = this;
    setInterval(function() {
      that.step();
    }, 500);
  };
  
  View.prototype.step = function() {
    this.board.snake.move();
    this.drawBoard();
  };
  
  View.prototype.buildBoard = function() {
    for(var i = 0; i < Snakes.DIMS; i++) {
      var $row = $("<div>");
      $row.addClass("row");
      for (var j = 0; j < Snakes.DIMS; j++) {
        var $square = $("<div>");
        $square.addClass("square");
        if (i === Snakes.DIMS / 2 && j === Snakes.DIMS / 2 - 1) {
          $square.addClass("snake");
        }
        $square.data("coords", [Snakes.DIMS - j - 1, i]);
        $row.append($square);
      }
      this.el.append($row);
    }
  };
  
  View.prototype.drawBoard = function() {
    var $squares = $(".square");
    var lastTail = this.board.snake.lastSegment;
    var newHead = this.board.snake.segments[0];
    $squares.each(function(i, square) {
      var $square = $(square);
      if (newHead.equals($square.data("coords")) || lastTail.equals($square.data("coords"))) {
        $square.toggleClass("snake");
      }
    });
  };
  
  View.prototype.addListener = function() {
    var that = this;
    $("body").on('keydown', function (event) {
      switch(event.keyCode) {
      case 37:
        console.log("E");
        that.board.snake.turn("E");
        break;
      case 38:
        console.log("N");
        that.board.snake.turn("N");
        break;
      case 39:
        console.log("W");
        that.board.snake.turn("W");
        break;
      case 40:
        console.log("S");
        that.board.snake.turn("S");
        break;
      }
    });
  };
})();