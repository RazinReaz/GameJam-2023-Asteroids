class Ship {
  constructor(x, y, color = 51) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.heading = 0;

    this.moveDirection = 0; //+1 == forward, 0 == stationary, -1 == backward
    this.turnDirection = 0; //-1 == right, 0 == forward, +1 == left

    this.boostForce = 0.2;
    this.turnSpeed = 0.1;

    this.radius = 10;
    this.color = 51;
    this.health = 5;
  }

  reset() {
    this.x = SCREEN_CENTER_X;
    this.y = SCREEN_CENTER_Y;
    this.vx = 0;
    this.vy = 0;
    this.heading = 0;
    this.moveDirection = 0;
    this.turnDirection = 0; 
    this.radius = 10;
    this.color = 51;
    this.health = 5;
  }


  update() {
    this.heading += this.turnDirection * this.turnSpeed;

    let force = this.moveDirection * this.boostForce;
    this.vx += force * cos(this.heading);
    this.vy += force * sin(this.heading);
    this.vx *= FRICTION;
    this.vy *= FRICTION;

    let nextx = this.x + this.vx;
    let nexty = this.y + this.vy;

    // check for boundaries with nexy and nexty
    if (nextx > this.radius && nextx < SCREEN_WIDTH - this.radius)
      this.x = nextx;
    if (nexty > this.radius && nexty < SCREEN_HEIGHT - this.radius)
      this.y = nexty;
  }

  render() {
    push();
    {
      strokeWeight(4);
      stroke(this.color);
      fill(51);
      translate(this.x, this.y);
      rotate(this.heading);
      triangle(-this.radius, this.radius / 2, -this.radius, -this.radius / 2, this.radius, 0);
      this.renderFlame(this.moveDirection);
    }
    pop();
    this.renderHealth();
  }

  renderFlame(moveDirection) {
    noStroke();
    if (moveDirection == +1) {
      fill(255, 102, 102);
      triangle(-this.radius, -this.radius / 3, -this.radius, this.radius / 3, -this.radius * 4, 0);
      fill(255, 255, 0);
      triangle(-this.radius, -this.radius / 4, -this.radius, this.radius / 4, -this.radius * 3, 0);
    }
  }

  renderHealth() {
    for(let i = 0; i< this.health; i++){
      this.drawHeart(20+i*25, 25, 5);
    }
  }

  drawHeart(x, y, s) {
    push();
    translate(x, y);
    noStroke();
    fill(255,11,11);
    beginShape();
    vertex(0,0);
    vertex(s,-s);
    vertex(2*s,0);
    vertex(0,2*s);
    vertex(-2*s,0);
    vertex(-s,-s);
    endShape(CLOSE);
    pop();
  }

  shoot() {
    if (Laser_Limiter_Counter == 0){
      lasers.unshift(new Laser(this));
      Laser_Limiter_Counter = 1;
    }
  }


  hits(asteroid) {
    // can be made much more accurate
    let d = dist(this.x, this.y, asteroid.position.x, asteroid.position.y);
    return d < this.radius * 0.9 + (asteroid.radius + asteroid.offsetAvg) * asteroid.sizeMultiplier;
  }

  decreaseHealth() {
    // ! LEVEL CHANGE
    if(Collision_timer_counter == 0) {
      this.health = max(0, this.health - 1);
      Collision_timer_counter++;
    }
  }

}