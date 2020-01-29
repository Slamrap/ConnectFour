// Pop up window
var settings = document.getElementsByClassName("settings")[0];

// Buttons for openning settings menu
var settings_btn = document.getElementById("settings_btn");

// Close settings button
var close_btn = document.getElementsByClassName("close")[0];


settings_btn.onclick = function() {
    settings.style.display = "block";
}

close_btn.onclick = function() {
    settings.style.display = "none";
}

// Close settings menu when clicking outside of it
window.onclick = function(event) {
  if (event.target == settings) {
    settings.style.display = "none";
  }
}
