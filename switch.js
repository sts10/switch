// This week's game is called SWITCH! (It is a one player game.)

// The game is played on a one-dimensional board 9 units long, placed either horizontally or vertically. 
//(Let's assume it is horizontal for the rest of this description.)

// The game starts with four red tokens and four black tokens grouped together on the left and right side of the board, respectively. 
//The 9th space on the board (the middle space) starts off empty.

// Each turn, the player can move any one token to an unoccupied adjacent space or jump over exactly one token
//(of either color) to land on an unoccupied space.

// Game Objective: Switch the pieces so that the black tokens are all on the left side of the board 
// and the red tokens are on the right, in the shortest amount of time and shortest number of moves possible.
"use strict";
window.onload = function(){
  // initialize global variables
  var board_array = [];
  var white_position = 0;
  var number_of_moves = 0;

  // set-up game board for the first time. 
  resetGame();

  var board = document.getElementById("board");

  board.addEventListener("click", function(evt){
    var e = evt.target; //get the target element that was clicked
    if(e.nodeName.toLowerCase() === "canvas"){ // only trigger if a canvas element was clicked
      var canvas = document.getElementById(e.id);
      var context = canvas.getContext("2d");

      var clicked_box_index = e.id - 1;

      // check if move is valid
      if (board_array[clicked_box_index].can_move){
        // 1: update board_array
        board_array[white_position].color = board_array[clicked_box_index].color;
        board_array[clicked_box_index].color = "white";
        white_position = clicked_box_index;

        // 2: update all can_move booleans
        updateCanMoveBooleans();

        // 3: call our super cool redrawCanvases function
        redrawCanvases();

        // 4: update number_of_moves
        updateNumberOfMoves();

        // 5: Check if player has won. 
        if (checkIfWin()){
          alert("You won! It took you " + number_of_moves + " moves.");
          resetGame();
        }
      }
    }
  });

  function updateCanMoveBooleans(){
    for(var i=0; i< 9; i++){
      if (white_position-2 <= i && i <= white_position + 2){
        board_array[i].can_move = true;
      } else {
        board_array[i].can_move = false; 
      }
    }
    board_array[white_position].can_move = false; // new white position cannot move
  }

  function redrawCanvases(){
    for (var i = 1; i <= 9; i++) {
      var canvas = document.getElementById(i.toString());
      var context = canvas.getContext("2d");

      if (board_array[i-1].color == "white"){ // if color == "white" clear the rectangle
        context.clearRect (0 , 0 , 51 , 51);
      } else { // else it must be blue or red, so assign fillStyle to .color
        context.beginPath();
        context.arc(25,25,25,0,2*Math.PI,true); //draws circles
        context.fillStyle = board_array[i-1].color; //sets circle color to red or blue
        context.fill();
      }
    }
  }

  function updateNumberOfMoves(){
    number_of_moves++; 
    var numberOfMovesTextBox = document.getElementById("number_of_moves");
    numberOfMovesTextBox.innerHTML = number_of_moves;
  }

  function checkIfWin(){
    var correct_dots = 0;
    for (var i=0; i < 9; i++){
      if (i<=3 && board_array[i].color == "blue"){
        correct_dots++;
      }
      if (i>4 && i <= 8 && board_array[i].color == "red"){
        correct_dots++;
      }
    }

    if (correct_dots == 8){
      return true;
    } else {
      return false;
    }
  }

  function resetGame(){
    number_of_moves = 0;

    var numberOfMovesTextBox = document.getElementById("number_of_moves");
    numberOfMovesTextBox.innerHTML = number_of_moves;

    for (var i = 1; i <= 9; i++) {
      if (i == 5) continue;
      var canvas = document.getElementById(i.toString());

      var context = canvas.getContext("2d");
      context.beginPath();
      context.arc(25,25,25,0,2*Math.PI,true); //draws circles
      context.fillStyle = (i<5) ? "#f00" : "#00f"; //sets circle color to red or blue
      context.fill();
    }

    board_array = [
      { // each object in this array represents one of the 9 boxes
        color: "red",
        can_move: false
      },
      {
        color: "red",
        can_move: false
      },
      {
        color: "red",
        can_move: true
      },
      {
        color: "red",
        can_move: true
      },
      {
        color: "white",
        can_move: false,
      },
      {
        color: "blue",
        can_move: true,
      },
      {
        color: "blue",
        can_move: true,
      },
      {
        color: "blue",
        can_move: false,
      },
      {
        color: "blue",
        can_move: false,
      }
    ];

    white_position = 4;
  }

};
