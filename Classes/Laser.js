class Laser {
    constructor(ship) {
        this.x = ship.x;
        this.y = ship.y;
        this.prevx = 0;
        this.prevy = 0;
        this.heading = ship.heading;
        this.speed = LASER_SPEED;
    }

    update() {
        let dx = this.speed * cos(this.heading);
        let dy = this.speed * sin(this.heading);
        this.prevx = this.x;
        this.prevy = this.y;
        this.x += dx;
        this.y += dy;
    }
    render() {
        push();
        strokeWeight(4);
        stroke(255);
        ellipse(this.x, this.y, 1);
        pop();
    }

    hits(asteroid) {
        let d = dist(this.x, this.y, asteroid.position.x, asteroid.position.y);
        if (d < (asteroid.radius + asteroid.offsetAvg) * AST_LASER_COLLISION_MULT * asteroid.sizeMultiplier) {
            return true;
        }
        // the next part is useful if laser speed is fast
        let midx = (this.x + this.prevx) / 2;
        let midy = (this.y + this.prevy) / 2;

        d = dist(midx, midy, asteroid.position.x, asteroid.position.y);
        if (d < (asteroid.radius + asteroid.offsetAvg) * AST_LASER_COLLISION_MULT * asteroid.sizeMultiplier)
            return true;
        return false;
    }

    inside(x, y, w, h) {
        return x < this.x && this.x < x+w && y < this.y && this.y < y+h;
    }
}

let lasers = [];