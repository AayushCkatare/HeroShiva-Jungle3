var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bg,bgImg;
var C1,C1Img;
var obstacle,Ob1Img;
var Ob2,Ob2Img;
var Ob3,Ob3Img;
var Ob4,Ob4Img;
var invisibleGround;
var diamond,diamondImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstaclesGroup;
var score=0;
var diamondGroup;



function preload()
{
  bgImg = loadImage("Images/Forest2.png")
  C1Img = loadAnimation("Images/C1.png","Images/C2.png","Images/C3.png","Images/C4.png","Images/C5.png")
  Ob1Img = loadImage("Images/Ob1.png")
  Ob2Img = loadImage("Images/Ob2.png")
  Ob3Img = loadImage("Images/Ob3.png")
  Ob4Img = loadImage("Images/Ob4.png")
  diamondImg = loadImage("Images/Diamond.png")

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = createSprite(displayWidth/2-20, displayHeight/2-40 ,20,20);
  bg.scale = 2;
  bg.addImage(bgImg)
  bg.x = bg.width/2;
  bg.velocityX = -4;
  
 // creating Character
  C1 = createSprite(40,585,20,20)
  C1.scale = 0.5;
  C1.addAnimation("running", C1Img);
  
 
  invisibleGround = createSprite(displayWidth/2,displayHeight,width,170);
  invisibleGround.visible = true;

  obstaclesGroup=new Group();
  diamondGroup=new Group();

   score=0;

}

function draw() {
  background(bgImg);  
  //console.log("1")
  textSize(20);
  fill("black")
  text("Score: "+ score, displayWidth-200,100)
  console.log(score)

if(gameState===PLAY)
{ 
  
  //console.log("play")
  if(bg.x<0)
  {
   bg.x=bg.width/2;
  }

  if(keyDown("space")) {
    C1.velocityY = -12;
  }

  C1.velocityY = C1.velocityY + 0.8
  
  C1.collide(invisibleGround);
  
  
  if(diamondGroup.isTouching(C1))
  {
   for(var i=0; i<diamondGroup.length; i++)
   {
     if(diamondGroup[i].isTouching(C1))
     {
      diamondGroup[i].destroyEach();
      score=score+1;
      console.log(score)
     }
   }
  }




  spawnObstacles();

 spawnDiamond();

 //Changing GameState to END
  if(obstaclesGroup.isTouching(C1)){
    console.log("2")
    gameState = END;

    console.log("end")
}  
}

else if(gameState === END)
     {
       bg.velocityX=0;
       C1.velocityY=0;

     }
 

  drawSprites();

}

function spawnObstacles() {
  if(frameCount % 90 === 0) {
    var obstacle = createSprite(550,displayHeight-140,20,20);
    //obstacle.debug = true;
    obstacle.velocityX = -4
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(Ob1Img);
              break;
      case 2: obstacle.addImage(Ob2Img);
              break;
      case 3: obstacle.addImage(Ob3Img);
              break;
      case 4: obstacle.addImage(Ob4Img);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    
    //adjust the depth
    obstacle.depth = C1.depth;
    C1.depth = C1.depth + 1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


function spawnDiamond() {
  if(frameCount % 100 === 0) {
    var diamond = createSprite(550,random([140,200,250]),20,20);
    //obstacle.debug = true;
    diamond.velocityX = -4
    diamond.addImage(diamondImg);
    //generate random obstacles
    /*var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(Ob1Img);
              break;
      case 2: obstacle.addImage(Ob2Img);
              break;
      case 3: obstacle.addImage(Ob3Img);
              break;
      case 4: obstacle.addImage(Ob4Img);
              break;
      default: break;
    }*/
    
    //assign scale and lifetime to the obstacle           
    diamond.scale = 1 ;
    diamond.lifetime = 300;
    
    //adjust the depth
    diamond.depth = C1.depth;
    C1.depth = C1.depth + 1;
    //add each obstacle to the group
    //obstaclesGroup.add(obstacle);
  }
}