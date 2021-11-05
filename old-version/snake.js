
       // key listeners
       document.addEventListener('keydown', keyPush);

       // canvas
       const canvas = document.querySelector("canvas");
       const title = document.querySelector("h1");
       const ctx = canvas.getContext("2d");

       // player
       const snakeSize = 50;
       
       const tileCountY = canvas.height / snakeSize;
       const tileCountX = canvas.width / snakeSize;


       let snakePosX = 0;
       let snakePosY = canvas.height/2;
       let snakeSpeed = snakeSize;
       let snakeLenght = 2

       let velocityX = 1;
       let velocityY = 0;

       let fps = 10;
       let score = 0;

       let tail = [];

       // food

       let foodPosX = 300;
       let foodPosY = 100;

       // loop
       function gameLoop() {
        drawStuff();
        moveStuff();
        setTimeout(gameLoop, 1000 / fps);

       }
       resetFood();
        gameLoop();

        // move it
        function moveStuff() {

        snakePosX += velocityX * snakeSpeed;
        snakePosY += velocityY * snakeSpeed;

        // collisions
        if (snakePosX > canvas.width - snakeSize) {
           snakePosX = 0
        }
        if (snakePosX < 0) {
            snakePosX = canvas.width;
        }
        if (snakePosY > canvas.width - snakeSize) {
           snakePosY = 0
        }
        if (snakePosY < 0) {
            snakePosY = canvas.width;
        }

        tail.push( { x: snakePosX, y: snakePosY} )

        tail = tail.slice(-1 * snakeLenght);

        //food collision
        if ( snakePosY === foodPosY && snakePosX === foodPosX) {

            score++;
            snakeLenght++;
            title.textContent = score;
            resetFood();
       }
       }

       if (score === 1) {
           ;
       }

       // draw everything
       function drawStuff() {

           rectangle("#ffbf00", 0, 0, canvas.width, canvas.height);

           drawGrid()

           tail.forEach( snakePart =>
           rectangle("#555", snakePart.x, snakePart.y, snakeSize, snakeSize)
           )

           rectangle("black", snakePosX, snakePosY, snakeSize, snakeSize);

           rectangle("#bada55", foodPosX, foodPosY, snakeSize, snakeSize);

       }

       // draw rectangle
       function rectangle(color, x, y, width, height) {

           ctx.fillStyle = color;
           ctx.fillRect(x, y, width, height);

       }

       // keyboard
       function keyPush(event) {
           switch(event.key) {

               case 'ArrowUp':
                   if (velocityY != 1) {
                   velocityY = -1;
                   velocityX = 0;
           }
                   break;

               case 'ArrowDown':
                   if (velocityY != -1) {
                   velocityY = 1;
                   velocityX = 0;
                   }
                   break;

               case 'ArrowLeft':
                   if (velocityX != 1) {
                   velocityY = 0;
                   velocityX = -1;
                   }
                   break;

               case 'ArrowRight':
                   if (velocityX != -1) {
                   velocityY = 0;
                   velocityX = 1;
                   }
                   break;

           }
           
       }
       function drawGrid() {

        for (let i = 0; i < canvas.height/snakeSize; i++) {
               for( let j = 0; j <canvas.height/snakeSize; j++) {
                   rectangle("white",snakeSize * j, snakeSize * i, snakeSize - 1, snakeSize - 1)
               }
           }
           
       }
       function resetFood() {
        foodPosX = Math.floor(Math.random() * tileCountX) * snakeSize;
        foodPosY = Math.floor(Math.random() * tileCountY) * snakeSize;
       }