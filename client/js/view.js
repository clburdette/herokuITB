var view = {

ticks : 0,                                                //tracks frames elapsed
secs : 0,                                                 //tracks seconds elapsed
mins : 0,                                                 //tracks minutes elapsed
playerScore : 0,                                          //player's actual score
displayedScore : 0,                                       //displayed score for score incrementation animation
multiplier : 1,                                           //score multiplier

makeUILayer : function()
{
  view.uiCanvas = document.getElementById("UI");          //canvas for displaying various user information elements
  view.uiContext = view.uiCanvas.getContext('2d');        //context for that canvas
}
,
updateUI : function()                                     
{
  view.updateTimer();
  if(view.displayedScore < view.playerScore){view.displayedScore++;}
  if(view.multiplier >= 9){view.multiplier = 9;}          //cap multiplier at 9
  view.updateUIElements();
}
,
updateTimer : function()                                  
{
  view.ticks++;                                           //ticks each frame at 50fps
  if(view.ticks >= 50)                                    //TODO 50fps based on interval loop. change from current magic number
  {                                                       //to reference to interval time        
    view.secs++;
    view.ticks = 0;
  }
  if(view.secs >= 60)                                         
  {
    view.mins++;                                          //temp difficulty increase for each minute played on server side.
    view.secs=0;
  }
}
,
updateUIElements : function()                             //set up time played for display and then display UI elements
{
  var secsDisplay;
  var minsDisplay;
  if(view.displayedScore < view.playerScore)
  {
    if((view.playerScore-view.displayedScore)>99){view.displayedScore+=10;}
    view.displayedScore++;
  }
  if(view.secs >= 10)
  {
    secsDisplay = view.secs.toString();
  }
  else
  {
    secsDisplay = "0" + view.secs.toString();
  }
  if(view.mins >= 10)
  {
    minsDisplay = view.mins.toString();
  }
  else
  {
    minsDisplay = "0" + view.mins.toString();
  }
  view.displayUIElement('25px Arial','white','hull: ' + player.health.toString(),10,30);                //hull display
  view.displayUIElement('25px Arial','white','time: ' + minsDisplay + ':' + secsDisplay, 442.5, 30);    //timer display
  if(view.multiplier > 1)
  {
    view.displayUIElement('25px Arial','white','X' + view.multiplier + ' MULTIPLIER', 630, 30);         //mulitplier display
  }
  view.displayUIElement('25px Arial','white','score: ' + view.scoreDisplay(), 417.5, 60);               //score display
  view.displayUIElement('25px Arial','white','health: ' + patientHealth, 875, 30);                      //health display
}
,
displayUIElement : function(font,color,statement,xPos,yPos)                                             //function for displaying an element in the UIlayer
{
  view.uiContext.font = font;        
  view.uiContext.fillStyle = color;
  view.uiContext.fillText(statement, xPos, yPos);
}
,
scoreDisplay : function()                                 //set up score to be displayed as a 7 digit number
{                                                         //refactor to do this on start, and then when max
  var maxScoreDigits = 1000000;                           //digit changes, rather than every frame.
  var scorePwr = 0;
  var scoreDis = "";
  if(view.playerScore == 0){scoreDis = "0000000";}
  else
  {
   while(maxScoreDigits > view.displayedScore)
   {
     scorePwr++;
     maxScoreDigits = maxScoreDigits/10;
   }
   for (var i=0; i < scorePwr; i++)
   {
     scoreDis += "0";
   }
   scoreDis += view.displayedScore.toString();
  }
  
  return scoreDis;
}
};                                                  
//updated from CSE322 to use for CSE4050
  


