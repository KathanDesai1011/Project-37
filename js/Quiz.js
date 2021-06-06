class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("Orange")

    //write code to show a heading for showing the result of Quiz
    var title = createElement("h1")
    title.html("Result of the Quiz");
    title.position(350,0)

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();


    //write condition to check if contestantInfor is not undefined
    if(allContestants != undefined){
      fill("Blue");
      textSize(20);
      text("  NOTE : Contestant who gave the correct answer is highlighted in green", 130, 230);
      var displayPosition = 275
      for(var plr in allContestants){
        var correctAns = "2";
        if(correctAns === allContestants[plr].answer){
          fill("Green")
        }
        else{
          fill("Red")
        }
        textSize(15);
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 200, displayPosition)
        displayPosition = displayPosition + 20;
      }
    }
    
  }

}
