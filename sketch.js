var santa, santaImg, gift, gift1, gift2, giftsgroup, giftsound, monstersound, bg, monster, monstergroup, monsterImg, restart, restartImg;
var start, startImg;

var gamestate = 0;
var giftspicked = 0;
var monsterpicked = 0;

function preload(){
    bg = loadImage('images/bg.jpg');
    santaImg = loadImage('images/s.png');
    gift1 = loadImage('images/gift1.png');
    monsterImg = loadImage('images/monster.png');
    restartImg = loadImage('images/restart.png');
    startImg = loadImage('images/button.png');

    giftsound = loadSound('sounds/gift.mp3');
    monstersound = loadSound('sounds/monster.mp3');
}

function setup(){
    createCanvas(windowWidth, windowHeight);

    santa = createSprite(windowWidth/2,windowHeight/2,50,50);
    santa.addImage(santaImg);
    santa.scale = 0.06;

    restart = createSprite(windowWidth/2 + 35, windowHeight/2 - 60, 50, 50);
    restart.addImage(restartImg);
    restart.scale = 0.6;

    start = createSprite(windowWidth/2 + 45, windowHeight/2 + 65, 50, 50);
    start.addImage(startImg);
    start.scale = 0.48;

    giftsgroup = createGroup();
    monstergroup = createGroup();
    
}

function draw(){
    background(255);

    imageMode(CENTER);
    image(bg,windowWidth/2,windowHeight/2, windowWidth, windowHeight);

    if(gamestate != 0){
        start.visible = false;
    }

    if(gamestate == 0){
        restart.visible = false;
        santa.visible = false;
        start.visible = true;

        if(mousePressedOver(start) && gamestate == 0){
            gamestate = 1;
        }

        textSize(32);
        fill('green');
        text('Secret Santa Game by Bhavin Shah', windowWidth/2 - 200, 50);

        textSize(32);
        fill('red');
        text('Rules', windowWidth/2 - 10, 150);

        textSize(28);
        fill('cyan');
        text('The objective of the game is to collect the gifts and to prevent the monsters.', windowWidth/2 - 450, 200);
        text('If you collect 20 gifts you will win and if the monsters attack you 20 times you will lose.', windowWidth/2 - 500, 250);
        text('Wherever you take the cursor, the Santa will move accordingly.', windowWidth/2 - 400, 300);
       
        textSize(32);
        fill('orange');
        text('Good Luck!', windowWidth/2 - 35, 350);

        push();
        stroke('brown');
        strokeWeight(4);
        line(windowWidth/2 - 250,60,windowWidth/2 + 360, 60);
        pop();
    }

    if(gamestate == 1){

        restart.visible = false;
        santa.visible = true;
        santa.x = mouseX;
        santa.y = mouseY;

        spawnGifts();
        spawnMonsters();

        if(santa.isTouching(giftsgroup)){
            giftsgroup.destroyEach();
            giftspicked = giftspicked + 1;
            giftsound.play();
        }

        if(santa.isTouching(monstergroup)){
            monstergroup.destroyEach();
            monsterpicked = monsterpicked + 1;
            monstersound.play();
        }

        if(giftspicked >= 20){
            gamestate = 2;
        }

        if(monsterpicked >= 20){
            gamestate = 2;
        }
    }

    if(gamestate == 2){
        
        restart.visible = true;
        
        santa.destroy();
        monstergroup.destroyEach();
        giftsgroup.destroyEach();

        if (mousePressedOver(restart)){
            Restart();
        }
    }

    if(gamestate == 2 && monsterpicked == 20){

        restart.x = windowWidth/2 + 35;
        restart.y = windowHeight/2 - 60;

        textSize(32);
        fill('green');
        text('Game Over!', windowWidth/2 - 50, windowHeight/2);
        text('You Lose!', windowWidth/2 - 35, windowHeight/2 + 50); 
        text('Try again next time!', windowWidth/2 - 100, windowHeight/2 + 100);
    }

    if(gamestate == 2 && giftspicked == 20){

        restart.x = windowWidth/2 + 35;
        restart.y = windowHeight/2 - 60;

        textSize(32);
        fill('cyan');
        text('Game Over!', windowWidth/2 - 50, windowHeight/2);
        text('You Won!', windowWidth/2 - 30, windowHeight/2 + 50);
    }

    drawSprites();
   
    if(gamestate != 0){
        
        textSize(28);
        fill('red');
        text('Total Gifts picked: ' + giftspicked, 30, 50);
        text('Monsters Attacked: ' + monsterpicked, windowWidth - 290, 50);

    }
    
}

function Restart(){

    gamestate = 0;
    giftspicked = 0;
    monsterpicked = 0;
    santa.visible = true;

    santa = createSprite(windowWidth/2,windowHeight/2,50,50);
    santa.addImage(santaImg);
    santa.scale = 0.06;
   
}


function spawnMonsters(){

    if(World.frameCount % 70 === 0){
        var monster = createSprite(random(100,windowWidth - 100),0,50,50);
        monster.velocityY = 8;
        monster.addImage(monsterImg);
        monster.scale = 0.1;
        monster.lifetime = 900;
        monstergroup.add(monster);
     }
  
  
    }
    
  
  function spawnGifts() {
    
    // To spawn the clouds after every 60th frame
   if (World.frameCount %  60 === 0 ){
        var gift = createSprite(random(100,windowWidth - 100),0,50,50);
        gift.velocityY = 7;
        gift.scale = 0.0215;
        gift.addImage(gift1);
        gift.lifetime = 900;
        giftsgroup.add(gift);
     
  }
  }

  