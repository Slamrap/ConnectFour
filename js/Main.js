var start_btn = document.getElementById("start_btn");
var startMenu_div = document.getElementsByClassName("startMenu")[0];
var game_div = document.getElementsByClassName("game")[0];


window.onload = function(event) {
    startMenu_div.style.display = "flex";
    settings.style.display = "none";
    game_div.style.display = "none";
}

start_btn.onclick = function() {
    game_div.style.display = "block";
    settings.style.display = "none";
    startMenu_div.style.display = "none";
    createBoard();
}

function createBoard(){
    var gameBoardDiv = document.getElementsByClassName("gameBoard")[0];

    var table = document.createElement('table');
  
    var tableBody = document.createElement('tbody');
    table.appendChild(tableBody);
  
    for (var i = 0; i < GRID_ROWS; i++) {
      var tr = document.createElement('tr');
      tableBody.appendChild(tr);
  
      for (var j = 0; j < GRID_COLS; j++) {
         
        var cell = document.createElement("div");
        cell.className = 'cell';


        var td = document.createElement('td');  
        td.appendChild(cell);
        tr.appendChild(td);
      }
    }
    gameBoardDiv.appendChild(table);
}

