class Game {
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
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100, 100, 20, 20)
    car2 = createSprite(300, 100, 20, 20)
    car3 = createSprite(500, 100, 20, 20)
    car4 = createSprite(700, 100, 20, 20)

    cars = [car1, car2, car3, car4]

  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      
      var index = 0
      var x = 0
      var y
      
      for(var plr in allPlayers){

        index = index + 1
        x = x + 200
        y = displayHeight - allPlayers[plr].distance
        
        cars [index - 1].x = x
        cars [index - 1].y = y

        if (index === player.index){
          camera.position.x = displayWidth/2
          camera.position.y = cars[index - 1].y

          cars[index - 1].shapeColor = "red"
        }
       
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    drawSprites()
  }
}
