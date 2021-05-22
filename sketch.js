var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var g, obstaclesGroup, FoodGroup,bananaImage, banana, gameOverText,obstacles, obImg, spawnFood, spawnObstacles;
var score;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png")
  g = loadImage("gameOver.png");
  obImg=loadImage("stone.png");
  c = loadImage("1.jpg")
}

function setup() {
  createCanvas(800,400);
  
  FoodGroup=createGroup();
  obstaclesGroup=createGroup();

  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;

  score=0;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  cimg = createSprite(600,50,20,30);
  cimg.addImage(c);
  cimg.scale = 0.3;
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  

  spawnFood();
  spawnObstacles();

  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score = score+2;
      player.scale+= +0.03;
     
    }
  }

  drawSprites();
  fill("purple");
  textSize(20);
  text("SCORE - "+ score,40,40);

  if(obstaclesGroup.isTouching(player)){
    gameState = END;
  }else if(gameState === END){
    backgr.velocityX=0;
    player.visible=false;

    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();
     
    //textSize(40);
    //fill("red");
    //stroke("pink");
    //strokeWeight(1);
    //text("GAME OVER",210,200,100,50)
    gameOverText = createSprite(300,200,50,20);
    gameOverText.addImage(g);
  }
}
function spawnFood(){
      
  if(frameCount%90 === 0){
    var banana = createSprite(600,250,40,10);
    banana.addImage(bananaImage);
    banana.y = random(120,200);
    banana.scale=0.05;
    banana.velocityX =-4;

    banana.lifetime= 300;
    player.depth = banana.depth+1;
    FoodGroup.add(banana)
  }
  
}
function spawnObstacles(){
if(frameCount%120 === 0){
  var obstacles = createSprite(600,300,40,10);
  obstacles.addImage(obImg);
  obstacles.x = random(250,700);
  obstacles.scale=0.2;
  obstacles.velocityX =-4;

  obstacles.lifetime= 300;
  player.depth = obstacles.depth+1;
  obstaclesGroup.add(obstacles)
}
}
