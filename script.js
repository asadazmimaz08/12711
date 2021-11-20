var colorSequence=["green","red","blue","yellow"];
var randomGeneratedSequence=[];
var userPickedSequence=[];
var level=0;
var game=false;

$(document).keypress(function(){
  if(game==false)
  {
    if($("body").hasClass("game-over"))
    {
      $("body").removeClass("game-over");
    }

    var audio=new Audio("simonGame.mp3");
    audio.play();
    game=true;
    level=0;
    level++;
    $("#level-title").text("LEVEL "+ level);
    setTimeout(randomColorAdder,2500);
  }
})

$(".btn").click(function(){
  if(game==true)
  {
    var userPickedColor= this.id;
    pressed(userPickedColor);
    userPickedSequence.push(userPickedColor);
    checker();
  }
})


function randomColorAdder(){
  var randomNumber=Math.floor(Math.random()*3+1);
  var randomColor=colorSequence[randomNumber];
  $("."+randomColor).fadeOut("fast").fadeIn("fast");
  buttonAudio(randomColor);
  randomGeneratedSequence.push(randomColor);
}

function checker(currentIndex){
  var currentIndex=userPickedSequence.length-1;
  if(randomGeneratedSequence[currentIndex]===userPickedSequence[currentIndex])
  {
    if(randomGeneratedSequence.length===userPickedSequence.length)
    {
      userPickedSequence=[];
      level++;
      $("#level-title").text("LEVEL "+ level);
      setTimeout(randomColorAdder,1000);
    }
  }
  else {
    setTimeout(wrongAudio,1000);
    gameOver();


  }
}

function gameOver(){
  setTimeout(function(){
    var audio= new Audio("gameOver.mp3");
    audio.play();
  },2000)
  game=false;
  userPickedSequence=[];
  randomGeneratedSequence=[];
  $("body").addClass("game-over");
  setTimeout(function(){
    $("#level-title").text("PRESS ANY KEY TO RESTART");
  },800);
}

function pressed(userPickedColor){
  $("#"+userPickedColor).addClass("pressed");
  buttonAudio(userPickedColor);
  setTimeout(function(){
      $("#"+userPickedColor).removeClass("pressed");
  },100);
}

function buttonAudio(color){
  audio= new Audio(color+".mp3");
  audio.play();
}

function wrongAudio(){
  var audio= new Audio("wrong.mp3");
  audio.play();
}
