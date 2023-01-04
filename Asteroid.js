

class Asteroid {
    constructor(x,y,dx,dy,size){
        this.position = createVector(x,y);
        this.velocity = createVector(dx, dy);
        this.velocity.setMag(random(AST_VEL_MAG_MIN, AST_VEL_MAG_MAX));
        this.size = size;
    }
    update(){
        this.position.add(this.velocity);
        console.log(this.position.x, this.position.y);
    }
    render(){
        fill(255);
        ellipse(this.position.x, this.position.y, this.size);
    }
}