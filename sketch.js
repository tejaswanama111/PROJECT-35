var  dog, dogImg, happyDog, database, foodS, foodStock;

function preload()
{
  dogImg = loadImage("images/dog.png");
  happyDog = loadImage("images/dog1.png");
}

function setup() {
  createCanvas(500, 500);

  dog = createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale= 0.3;

  reset = createButton('Reset');
  reset.position(770,70)

  database = firebase.database();
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  reset.mousePressed(()=>{
    updateFood(20);
  });

  drawSprites();

  textSize(17);
  fill("white");
  text("Food Remaining : " + foodS, 10,50);
}

function readStock(data){
  foodS = data.val();
}

function updateFood(food){
  database.ref('/').update({
    Food : food
  });
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}
