
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//Adding event listener keypress to document:
$(document).keypress(function() {
  if (!started)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
//Adding event listener click to btn class:
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

//Function to check answer:
function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
      if (userClickedPattern.length === gamePattern.length)
      {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
    else
    {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

//Function for nextSequence:
function nextSequence()
{
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// animatePress function:
function animatePress(currentColor)
{
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
// playSound function:
function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// startOver function:
function startOver()
{
  level = 0;
  gamePattern = [];
  started = false;
}
