// Pop up window
var settings = document.getElementsByClassName("settings")[0];

// Buttons for openning settings menu
var settings_btn = document.getElementById("settings_btn");

// Close settings button
var close_btn = document.getElementsByClassName("close")[0];

var gameMode_form = document.getElementById("gameMode_form");
var difficulty_form = document.getElementById("difficulty_form");
var playFirst_form = document.getElementById("playFirst_form");
var Algorithm_form = document.getElementById("Algorithm_form");

settings_btn.onclick = function() {
  settings.style.display = "block";
}

close_btn.onclick = function() {
  settings.style.display = "none";
  setSettings();
}

// Close settings menu when clicking outside of it
window.onclick = function(event) {
  if (event.target == settings) {
    settings.style.display = "none";
    setSettings();
  }
}

function setSettings(){
  setGameMode();
  setDifficulty();
  setPlayFirst();
  setAlgorithm();

  console.log(GAME_MODE);
    console.log(DEPTH);
    console.log(PLAY_FIRST);
    console.log(ALGORITHM);
}

function setGameMode(){
  for(let i = 0; i < gameMode_form.elements.length; ++i){
    var option = gameMode_form.elements[i];
    if(option.checked)
      GAME_MODE = option.id;
  }
}

function setDifficulty(){
  for(let i = 0; i < difficulty_form.elements.length; ++i){
    var option = difficulty_form.elements[i];
    if(option.checked){
      switch (option.id){
        case "EASY":
          DEPTH = 4;
        break;
        case "MEDIUM":
          DEPTH = 6;
        break;
        case "HARD":
          DEPTH = 8;
        break;
      }
    }
  }
}

function setPlayFirst(){
  for(let i = 0; i < playFirst_form.elements.length; ++i){
    var option = playFirst_form.elements[i];
    if(option.checked)
      PLAY_FIRST = option.id;
  }
}

function setAlgorithm(){
  for(let i = 0; i < Algorithm_form.elements.length; ++i){
    var option = Algorithm_form.elements[i];
    if(option.checked)
      ALGORITHM = option.id;
  }
}

function defaultSettings(){
  GAME_MODE = gameMode_form.elements[0].id;
  DEPTH = 4;
  PLAY_FIRST = playFirst_form.elements[0].id;
  ALGORITHM = Algorithm_form.elements[0].id;
}
