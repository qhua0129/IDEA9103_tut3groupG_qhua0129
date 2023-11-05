let img;
let fragments = [];
let rectArray = []
let gridSize = 10; // Size of each square in the grid
function preload() {
  img = loadImage("artwork.jpg"); // Load the image
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Set the canvas size to the window size
  img.resize(windowWidth, windowHeight); // Resize the image to fill the canvas
  noStroke();
  img.loadPixels();

  

  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      let index = (x + y * img.width) * 4;
      
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      
      let col = color(r, g, b);
      
      // Draw a rectangle with a random width and height
      let w = random(gridSize / 2, gridSize * 1.5);
      let h = random(gridSize / 2, gridSize * 1.5);
      fragments.push(new ShoutRect(x, y, w, h, col));
    }
  }
}

function draw() {
  background(255)
  // No need to redraw the image in every frame
  for (let i = 0; i < fragments.length; i++) {
    let frag = fragments[i];
    frag.show();
    frag.move();
    if(frag.x>width || frag.x<-50|| frag.y>height || frag.y<-50){
      fragments.splice(i,-1)
    }
  }
}


// rect class
class ShoutRect {
  constructor(x, y, w, h, col) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = col;
    this.static = false;
    this.speed = 1
    this.angle = random(PI*2)
  }
  show() {
    noStroke();
    fill(this.col);
    if(mouseIsPressed && this.x>mouseX-50 && this.x<mouseX+50 && this.y>mouseY-50 && this.y<mouseY+50){
      this.static = true
    }
    rect(this.x, this.y, this.w, this.h);
  }
  move(){
    if(this.static){
      this.speed+=0.1;
      this.x+=this.speed*cos(this.angle)
      this.y+=this.speed*sin(this.angle)
    }
  }
}
function keyPressed(){  
  // add several rect in a random area
  let px = random(width)
  let py  = random(height)
  for (let x = px; x < px+100; x += gridSize) {
    for (let y =py; y < py+100; y += gridSize) {

      
      let col = img.get(random(width),random(height))
      
      // Draw a rectangle with a random width and height
      let w = random(gridSize / 2, gridSize * 1.5);
      let h = random(gridSize / 2, gridSize * 1.5);
      fragments.push(new ShoutRect(x, y, w, h, col));
    }
  }
}