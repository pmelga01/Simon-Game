var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomNumber;
var started = false;
var gameLost = false;

var levelNumber = 0;
var patternCounter = 0;


$(document).keypress(function(){
    if (!started) {
        nextSequence();
        started = true;
        $("h1").text("Level " + levelNumber);
    }
    
});



        
        $(".btn").click(function(){
            if (started){
                patternCounter++;
                var userChosenColor = $(this).attr("id");
                userClickedPattern.push(userChosenColor);
                
                playSound(userChosenColor);
                animatePress(userChosenColor);
                
                checkAnswer(userClickedPattern.length - 1); //if length is 1, check first [0]
                
            };
        });

    




function nextSequence(){
    randomNumber = Math.floor((Math.random() * 4));
    
    
    var randomChosenColor = buttonColors[randomNumber];


    gamePattern.push(randomChosenColor);


    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
    levelNumber++;
    $("#level-title").text("Level " + levelNumber);
}


function playSound(name){
    
    var audioFileOfChosenColor = "sounds/" + name + ".mp3";
    var audioButton = new Audio(audioFileOfChosenColor);
    audioButton.play();
    
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed"); 
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function(){
                    userClickedPattern = [];  //prepare user for next round
                    nextSequence();           //call next round
                }, 1000);
            }
    } else {
        console.log("wrong");
        gameLost = true;
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        
        //Make the screen go red when the user inputs incorrect pattern
        $("body").addClass("game-over");
        
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 300);
        
        // notify user of Game Over
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        //reset the values of the game in order to restart
        startOver();
    }
    
}


function startOver() {
    levelNumber = 0;
    started = false;
    gameLost = false;
    
    
    gamePattern = [];
    userClickedPattern = [];
}

