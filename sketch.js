var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameoverimg,restartimg
var diesound,checkpointsound,jumpsound
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  gameoverimg =loadImage("gameOver.png")
  restartimg = loadImage("restart.png")
  groundImage = loadImage("ground2.png");
  diesound = loadSound("die.mp3")
  jumpsound = loadSound("jump.mp3")
  checkpointsound = loadSound("checkpoint.mp3")
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  //trex.debug = true
  trex.setCollider("circle",0,0,45);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  
  score = 0;
  
  console.log("Hello"+5)
}

function draw() {
  background(180);
  //displaying score - string concatenation
  text("Score: "+ score, 500,50);
  
  console.log(trex.y)
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -4 - score/100
    //scoring
    score = Math.round(frameCount/3);
    
    //assignment - assigns the value 
    //comparison - checks 
    if(score%100===0 && score>0){
      checkpointsound.play();
    }
  
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 161) {
        trex.velocityY = -13;
        jumpsound.play();
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END; 
        diesound.play()
    }
  }
   else if (gameState === END) {
     ground.velocityX = 0;
     //diesound.play()
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);

     obstaclesGroup.setLifetimeEach(-1)
     cloudsGroup.setLifetimeEach(-1)
     trex.velocityY=0
     trex.changeAnimation("collided")
     var gameover=createSprite(300,100)
     var restart=createSprite(300,130)
     gameover.addImage(gameoverimg)
     restart.addImage(restartimg)
     restart.scale=0.4
     gameover.scale=0.7
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(610,165,10,40);
   
   //Game adaptivity
   obstacle.velocityX = -6 - score/100;
   //To see their collider
   //obstacle.debug = true;

    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
   if (frameCount % 60 === 0) {
     cloud = createSprite(610,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 210;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}

