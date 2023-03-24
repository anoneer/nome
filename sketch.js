var JOGAR = 1;
var FIM = 0;
var estadoDeJogo = JOGAR;
var rex, rexcorre, rexcolide;
var piso, pisoimg, pisoinvisivel;
var nuvem, gruponevem;
var nuvemimg;
var obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6, obstaculo;
var grupoobstaculos;
var pontos;
var gameover, gameoverimg, restart, restartimg;
var checkpoint, morrer, pular;

function preload(){
  rexcorre = loadAnimation("trex1.png","trex3.png", "trex4.png");
  rexcolide = loadAnimation("trex_collided.png");
  pisoimg = loadImage("ground2.png");
  nuvemimg = loadImage("cloud.png");
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");


gameoverimg = loadImage("gameOver.png");
restartimg = loadImage("restart.png");
checkpoint = loadSound("checkpoint.mp3");
morrer = loadSound("die.mp3");
pular = loadSound("jump.mp3");
}

function setup(){
  createCanvas(600,200);
  rex = createSprite(50, 160, 20, 50);
  rex.addAnimation("corre", rexcorre);
  rex.addAnimation("colidido", rexcolide)
  rex.scale = 0.5;
  rex.x = 50;
  piso = createSprite(200, 180, 400, 20);
  piso.addImage("piso",pisoimg);
  piso.x = piso.width/2;
  pisoinvisivel = createSprite(200, 190, 400, 10);
  pisoinvisivel.visible = false;
  pontos = 0;
  gruponuvem = new Group();
  grupoobstaculos = new Group();
  gameover = createSprite(300, 100);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.5;
  gameover.visible = false;
  
  restart = createSprite(300, 140);
  restart.addImage(restartimg);
  restart.scale = 0.5;
  restart.visible = false;
}

function draw(){
  rex.setCollider("circle",0,1,40);
  background("white");
  text("pontuação: "+pontos, 500,50);
  if(estadoDeJogo === JOGAR){
    pontos = pontos+Math.round(getFrameRate()/60);
    if(pontos>0&&pontos%100===0){
      checkpoint.play();
    }
    piso.velocityX = -(5.5+3*pontos/100);
    if(piso.x<0){
      piso.x = piso.width/2;
    }
    if(keyDown("space")&& rex.y >=160){
    rex.velocityY = -10;
    pular.play();
  }
  rex.velocityY = rex.velocityY +0.5;
  criarnuvens();
  criarobstaculos();
  
  if(grupoobstaculos.isTouching(rex)){
  estadoDeJogo = FIM;
  morrer.play();
}
}
  else if(estadoDeJogo === FIM){
    piso.velocityX = 0;
    rex.velocityY = 0;
    gameover.visible = true;
    restart.visible = true;
    grupoobstaculos.setLifetimeEach(-1);
    gruponuvem.setLifetimeEach(-1);
    grupoobstaculos.setVelocityXEach(0);
    gruponuvem.setVelocityXEach(0);
    rex.changeAnimation("colidido", rexcolide);
  }
   
  rex.collide(pisoinvisivel);
  piso.depth = rex.depth+1;
if(mousePressedOver(restart)){
  reset();
}
  drawSprites ();

}
function criarnuvens( ){
  if(frameCount % 60 === 0){
  nuvem = createSprite(600,100,40,10);
  nuvem.addImage(nuvemimg);
  nuvem.y = Math.round(random(10,130));
  nuvem.scale= 0.5;
  nuvem.velocityX = -6;
  nuvem.lifetime = 120;
  nuvem.depth = rex.depth;
  rex.depth = rex.depth+1;
  gruponuvem.add(nuvem);
}
 }
function criarobstaculos(){
  if(frameCount % 60 === 0){
    obstaculo = createSprite(990, 165, 10, 40);
    obstaculo.velocityX = -(6+3*pontos/100);
    var rand = Math.round(random(1, 6));
  switch(rand){
    case 1: obstaculo. addImage(obstaculo1);
    break;
    case 2: obstaculo. addImage(obstaculo2);
    break;
    case 3: obstaculo. addImage(obstaculo3);
    break;
    case 4: obstaculo. addImage(obstaculo4);
    break;
    case 5: obstaculo. addImage(obstaculo5);
    break;
    case 6: obstaculo. addImage(obstaculo6);
    break;
  }
  obstaculo.scale = 0.5;
  obstaculo.lifetime = 200;
  grupoobstaculos.add(obstaculo);
  }
}
function reset(){
  estadoDeJogo = JOGAR;
  gameover.visible = false;
  restart.visible = false;
  gruponuvem.destroyEach();
  grupoobstaculos.destroyEach();
  rex.changeAnimation("corre",rexcorre);
  pontos = 0;
}