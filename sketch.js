let pos;
let bCount = 0;
let Geld = 1000;
let Power = 100;
let Respekt = 10;
let cCount = 0;
let landLord = 0;
let olLandLord = 0;
let olbCount = 0;
let olGeld = 0;
let olMagen = 0;
let olRespekt = 0;
let GameOver = false;
let olGameOver = false;
let quests = [];
let posts = ["ja","nein"];
let n = 220;
let R = 10;
let mem = [];
let History = [];
let locked = false;
let cLock = 0;
let Joker = "";

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.position(CENTER);
  rectMode(CENTER);
  pos = createVector(width/2,height/2);
  Quests();
}

function draw() {
  background(220);
  fill(0);
  textSize(28);
  textAlign(CENTER,CENTER); 
  tree(); 
  clickBreak();
}


 // prevents doubleclicks by misstake. 
function clickBreak(){
  if(locked==true&&cLock<30){
  cLock +=1;
  }else{
  cLock = 0;
  locked = false;
  }

}

// steers most of thr game 

function tree(){
  
  //compares current quest with non repeat memory 
  for(let i = 0; i < mem.length;i++){ 
    if(bCount == mem[i]){
    bCount = (round(random(5,quests.length/7))*7)-7;  
 
    } 
  } 
  // checks start and game conditions
  if(Geld < 0 || Power < 0 || Respekt<0){
   gameOver();    
  }else
  if(Power != 0){
    if(0==bCount){
     text("Hi",pos.x,pos.y); // start sceen
      }else{
       text(quests[bCount],pos.x,pos.y,width*0.9,height*0.9); // questions
       yesNo();
           if(bCount>14){
           hud();
           }
          }
        }else{
           gameOver();
        }
}

// function old memories the values to calc for the next step
function old(){
  olbCount = bCount;
  olGeld = Geld;
  olPower = Power;
  olRespekt = Respekt;
  olGameOver = GameOver
  olLandLord = landLord;
}

//  gameOver init
function gameOver(){
   GameOver = true;
   text("Level "+cCount+"",width/2,20);
   text("Game Over",pos.x,pos.y);  
   text("reset?",pos.x,height-height/4);  
     yesNo(); 
}
 
// awnsering 
function yesNo(){   
   n -=1;
   fill(n);
   text("ja",width*0.2,height-height/8);  
   text("nein",width*0.8,height-height/8);
}

// screen info 
function hud(){
  textSize(13);
  if(bCount>21){fill(0)}
  text("Level "+cCount+"",width/2,20);
  text(Joker,width*0.75,20);
  text("Geld = "+Geld+""+"€",60,20);
  text("Power = "+Power+""+"%",60,35);
  text("Respekt = "+Respekt+""+"Punkte",60,50);
  if(bCount==49){
  textSize(22);
  text("("+olLandLord+"€)",width/2,50);
  }
}
// input events
function mousePressed(){
  
  if(!locked){
    History.push(bCount,Geld,Power,Respekt);
    old();
      if(bCount>14){
      Power -= 1;
      cCount += 1;
      landLord -= 15;

      }

      if (mem.length > 10){ // deletes non repeat memory by length of 10
      mem.shift();
      }

      if(bCount>35){
       mem.push(bCount);
       }else{
       bCount += 7;
      }
    // yes and no, weight parser
    if(mouseX<width/2 ){
    posts = "ja";
      if(olGameOver){
      GameOver = false;
      bCount = 0;
      cCount = 0;
      Geld = 1000;
      Power = 100;
      Respekt = 10; 
      landLord = 0;
      R = 10;
      History = [];
      }
        if(olbCount==49){
        Geld += landLord;
        landLord = 0;
        }
      Geld += quests[olbCount+1];
      Power += quests[olbCount+2];
      Respekt += quests[olbCount+3];
        }else{
            posts = "nein";
              if(olGameOver){
                GameOver = false;
                cCount -= 2;
                Joker += "X ";
                bCount = History[History.length-8];
                Geld = History[History.length-7];
                Power = History[History.length-6];
                Respekt = History[History.length-5]; 

              }
              if(olbCount==49){
              R += 1;
              Respekt -= R;
              } 
            Geld += quests[olbCount+4];
            Power += quests[olbCount+5];
            Respekt += quests[olbCount+6];
            }
    if(Power > 100){
    Power = 100;
    }
    n = 220;
  }  
  locked = true;
  
}