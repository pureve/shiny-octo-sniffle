/*
get the canvas from HTML
*/
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

//context.scale(20, 20);

const matrixL = [
  [0, 1, 0],
  [0, 1, 0],
  [0, 1, 1]
];

const matrixZ = [
  [0, 0, 0],
  [2, 2, 0],
  [0, 2, 2]
];

const matrixS = [
  [0, 0, 0],
  [0, 3, 3],
  [3, 3, 0]
];

const matrixT = [
  [0, 0, 0],
  [4, 4, 4],
  [0, 4, 0]
];

const matrixI = [
  [0, 5, 0, 0],
  [0, 5, 0, 0],
  [0, 5, 0, 0],
  [0, 5, 0, 0]
];

const matrixO = [
  [6 ,6],
  [6 ,6]
];

const matrixJ = [
  [0, 7, 0],
  [0, 7, 0],
  [7, 7, 0]
];


const player = {
  pos: {x:6, y:0},
  matrix : matrixL,
}
/**
 * Draws given matrix(shape) which positioned in given offset
 * @param matrix given matrix, which represents the shape
 * @param position
 *  */
function drawMatrix(matrix, position) {

// checks if the shape is out of field. If yes, then stops it to slide.
  if(matrix.length+position.y > 20) player.pos.y--;
  if(matrix[0].lenght+position.x > 12 ) player.pos.x--;
  if(matrix[0].lenght+position.x < 0 ) player.pos.x++;


  for(var i=0; i<matrix.length; i++){
    for(var j=0; j<matrix[0].length; j++){
      if(matrix[i][j]==1){
        // if the it is L-shape then draws the L shape image
        const image = new Image(40, 60);
        image.src= 'L-Shape.png';
        context.drawImage(image ,(1 + position.x)*20, position.y*20);
      }
      // ..... Other Shapes
    }
  }
}

/**
 * Cleans old frame and draws new frame with updated player variable
 */
function draw(){
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(player.matrix, player.pos);
}

var lastTime = 0;
var dropInterval = 1000;
var dropCounter = 0;

/**
 * Slides down the shape vertical every second and updates the frame
 */
function update(time = 0){
  const deltaTime = time -lastTime;
  lastTime = time;

  dropCounter+= deltaTime;

// if 1 second is gone
  if(dropCounter > dropInterval) {
    player.pos.y++;
    dropCounter = 0;
  }

  draw();
  requestAnimationFrame(update);
}

/**
 * If button clicked, then the shape moves left or right or drop faster
 */
document.addEventListener('keydown', event => {
  if(event.keyCode == 37){
    player.pos.x--;
  }else
  if(event.keyCode == 39){
    player.pos.x++;
  } else
  if(event.keyCode == 40){
    player.pos.y++;
    dropCounter = 0;
  }
});

update();
