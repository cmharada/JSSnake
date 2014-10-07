/*global Snakes*/

(function () {
  "use strict";
  
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }
  
  var Snake = Snakes.Snake = function() {
    this.dir = "N";
    this.segments = [new Coord()];
    this.lastSegment = null;
  };
  
  Snakes.DIMS = 20;
  
  Snake.prototype.move = function() {
    var currentHead = this.segments[0];
    this.lastSegment = this.segments.pop();
    var newHead = currentHead.nextSquare(this.dir);
    this.segments.unshift(newHead);
  };
  
  Snake.prototype.checkCollisions = function() {
    if (this.segments[0].outOfBounds) {
      
    }
  };
  
  Snake.prototype.turn = function(dir) {
    this.dir = dir;
  };
  
  Snake.prototype.getLastTail = function() {
    if (this.lastSegment) {
      return [this.lastSegment.x, this.lastSegment.y];
    } else {
      return null;
    }
  };
  
  Snake.prototype.getHead = function() {
    return [this.segments[0].x, this.segments[0].y];
  };
  
  var Coord = Snakes.Coord = function(arr) {
    if (typeof arr === "undefined") {
      this.x = this.startingCoord()[0];
      this.y = this.startingCoord()[1];
    } else {
      this.x = arr[0];
      this.y = arr[1];
    }
  };
  
  Coord.prototype.startingCoord = function() {
    return [Snakes.DIMS / 2, Snakes.DIMS / 2];
  };
  
  Coord.prototype.equals = function(pos) {
    return this.x === pos[0] && this.y === pos[1];
  };
  
  Coord.prototype.nextSquare = function(dir) {
    switch(dir) {
    case "N":
      return new Coord([this.x, this.y - 1]);
    case "E":
      return new Coord([this.x + 1, this.y]);
    case "S":
      return new Coord([this.x, this.y + 1]);
    case "W":
      return new Coord([this.x - 1, this.y]);
    }
  };
  
  Coord.prototype.outOfBounds = function() {
    if (this.x < 0 || this.y < 0 || this.x >= Snakes.DIMS || this.y >= Snakes.DIMS) {
      return true;
    } else {
      return false;
    }
  };
  
  var Board = Snakes.Board = function() {
    this.snake = new Snakes.Snake();
    this.apples = [];
  };
  
  Board.prototype.render = function() {
    var rendering = [];
    for (var i = 0; i < Snakes.DIMS; i++) {
      var row = [];
      for (var j = 0; j < Snakes.DIMS; j++) {
       row.push(".");
      }
      rendering.push(row);
    }
    for (var k = 0; k < this.snake.segments.length; k++) {
      var x = this.snake.segments[k].x;
      var y = this.snake.segments[k].y;
      rendering[y][x] = "S";
    }
    for (var r = 0; r < rendering.length; r++) {
      rendering[r] = rendering[r].join(" ");
    }
    console.log(rendering.join("\n"));
  };
  
  
})();