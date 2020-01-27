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
}

