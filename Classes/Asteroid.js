

class Asteroid {
    constructor(x,y,dx,dy, sizeMultiplier = 1){
        this.position = createVector(x,y);
        this.velocity = createVector(dx, dy);
        this.velocity.setMag(random(AST_VEL_MAG_MIN, AST_VEL_MAG_MAX));
        this.radius = AST_INITIAL_RADIUS;
        this.sizeMultiplier = sizeMultiplier;

        this.totalPoints = floor(random(AST_POINTS_MIN, AST_POINTS_MAX));
        this.offsets = [];
        for (let i = 0; i < this.totalPoints; i++) {
            this.offsets.push(random(AST_OFFSET_MIN, AST_OFFSET_MAX));
        }
        this.resetDist = DIST_TO_RESET_ASTEROID * random(1,1.5);  //!HARD CODED
    }
    update(){
        this.position.add(this.velocity);
    }
    render(){
        push();
        noFill();
        stroke(255);
        translate(this.position.x, this.position.y);
        beginShape();
        for( let i = 0; i<this.totalPoints; i++){
            let a = map(i, 0, this.totalPoints, 0, TWO_PI);
            let r = this.radius + this.offsets[i];
            let x = r*cos(a);
            let y = r*sin(a);
            vertex(x * this.sizeMultiplier, y * this.sizeMultiplier);
        }
        endShape(CLOSE);
        pop();
    }
    
    break() {
        let smallerAsteroids = [];
        if(this.sizeMultiplier > 0.5){
            smallerAsteroids.push(new Asteroid(this.position.x, this.position.y, this.velocity.x, this.velocity.y, this.sizeMultiplier/2));
            smallerAsteroids.push(new Asteroid(this.position.x, this.position.y, this.velocity.x, this.velocity.y, this.sizeMultiplier/2));
        }
        return smallerAsteroids;
    }
}