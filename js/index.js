// Global Animation Setting
window.requestAnimFrame = 
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000/60);
};

// Global Canvas Setting
var canvas = document.getElementById('particle');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight/2;

// Particles Around the Parent
function Particle(x, y, distance) {
  this.angle = Math.random() * 2 * Math.PI;
  this.radius = Math.random() * 3; 
  this.opacity =  (Math.random() * 5 + 2)/10;
  this.distance = (1/this.opacity)*distance;
  this.speed = this.distance*0.00009;
  
  this.position = {
    x: x + this.distance * Math.cos(this.angle),
    y: y + this.distance * Math.sin(this.angle)
  };
  
  this.draw = function() {
    ctx.fillStyle = "rgba(127,0,255," + this.opacity + ")";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
    ctx.fill();
    ctx.closePath();
  }
  this.update = function() {
    this.angle += this.speed; 
    this.position = {
      x: x + this.distance * Math.cos(this.angle),
      y: y + this.distance * Math.sin(this.angle)
    };
    this.draw();
  }
}

function Emitter(x, y) {
  this.position = { x: x, y: y};
  this.radius = 30;
  this.count = 3000;
  this.particles = [];
  
  for(var i=0; i< this.count; i ++ ){
    this.particles.push(new Particle(this.position.x, this.position.y, this.radius));
  }
}


Emitter.prototype = {
  draw: function() {
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius*1.4, 0, Math.PI*2, false);
    ctx.fill();
    ctx.closePath();    
  },
  update: function() {  
   for(var i=0; i< this.count; i++) {
     this.particles[i].update();
   }
    this.draw(); 
  }
}


var emitter = new Emitter(canvas.width/2, canvas.height/2);

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  emitter.update();
  requestAnimFrame(loop);
}

loop();

window.onresize = function() {
  emitter.position.x = window.innerWidth / 2;
  emitter.position.y = window.innerHeight/4;
  delete emitter.particles;
  emitter.particles = [];
  for(var i=0; i< emitter.count; i ++ ){
    emitter.particles.push(new Particle(emitter.position.x, emitter.position.y, emitter.radius));
  }
  // var emitter = new Emitter(canvas.width/2.7, canvas.height/2);
}

function fillWithStars(id, amount)
{
  const starDiv = document.getElementById(id);
  const starAmount = parseFloat(amount);
  const starAmountInt = parseInt(starAmount); 
  const starAmountDiff = starAmount - starAmountInt;
  for(let i = 0; i < starAmountInt; i++)
    starDiv.innerHTML += "<i class='fas fa-star'></i>";
  if(starAmountDiff != 0 && starAmountDiff < 0.5)
    starDiv.innerHTML += "<i class='fas fa-star-half-alt'></i>";
  else if(starAmountDiff != 0 && starAmountDiff >= 0.5)
    starDiv.innerHTML += "<i class='fas fa-star'></i>";
  for(i = 0; i < parseInt(10 - starAmount); i++)
    starDiv.innerHTML += "<i class='far fa-star'></i>";
}
fillWithStars("c-sharp", 7.4);
fillWithStars("cpp", 6.8);
fillWithStars("java", 4);
fillWithStars("html-css", 8.4);
fillWithStars("js", 5.6);
fillWithStars("python", 3);