

class Asteroid {
    constructor(x, y, dx, dy, sizeMultiplier = 1) {
        this.position = createVector(x, y);
        this.velocity = createVector(dx, dy);
        this.velocity.setMag(random(AST_VEL_MAG_MIN, AST_VEL_MAG_MAX));
        this.radius = AST_INITIAL_RADIUS;
        this.sizeMultiplier = sizeMultiplier;

        this.totalPoints = floor(random(AST_POINTS_MIN, AST_POINTS_MAX));
        this.offsets = [];
        let offsetSum = 0;
        for (let i = 0; i < this.totalPoints; i++) {
            let o = random(AST_OFFSET_MIN, AST_OFFSET_MAX)
            this.offsets.push(o);
            offsetSum += o;
        }
        this.offsetAvg = offsetSum / this.totalPoints;
        this.resetDist = DIST_TO_RESET_ASTEROID * random(0.7, 1);  //!HARD CODED
    }

    reset() {
        let src = asteroid_generation_areas.random().getRandPos();
        let dest = asteroid_target_region.getRandPos();

        this.position.x = src.x;
        this.position.y = src.y;
        this.velocity.x = dest.x - src.x;
        this.velocity.y = dest.y - src.y;
        this.velocity.setMag(AST_VEL_MAG_MIN, AST_VEL_MAG_MAX);
        this.totalPoints = floor(random(AST_POINTS_MIN, AST_POINTS_MAX));
        this.offsets = [];
        let offsetSum = 0;
        for (let i = 0; i < this.totalPoints; i++) {
            let o = random(AST_OFFSET_MIN, AST_OFFSET_MAX)
            this.offsets.push(o);
            offsetSum += o;
        }
        this.offsetAvg = offsetSum / this.totalPoints;
    }

    update() {
        this.position.add(this.velocity);
    }
    render() {
        push();
        noFill();
        stroke(255);
        translate(this.position.x, this.position.y);
        beginShape();
        for (let i = 0; i < this.totalPoints; i++) {
            let a = map(i, 0, this.totalPoints, 0, TWO_PI);
            let r = this.radius + this.offsets[i];
            let x = r * cos(a);
            let y = r * sin(a);
            vertex(x * this.sizeMultiplier, y * this.sizeMultiplier);
        }
        endShape(CLOSE);
        // ellipse(0, 0, (this.radius + this.offsetAvg) * AST_LASER_COLLISION_MULT * 2 * this.sizeMultiplier);
        // ellipse(0, 0, (this.radius + this.offsetAvg) * 2 * this.sizeMultiplier);
        pop();


    }

    break() {
        let smallerAsteroids = [];
        // we will allow the astoroid to break twice
        if (this.sizeMultiplier > 0.25) {
            let a = this.velocity.heading();
            let b = a + PI / 4;
            let c = a - PI / 4;
            let r = this.velocity.mag();
            smallerAsteroids.push(new Asteroid(this.position.x, this.position.y, r * cos(a + PI / 4), r * sin(a + PI / 4), this.sizeMultiplier / 2));
            smallerAsteroids.push(new Asteroid(this.position.x, this.position.y, r * cos(a - PI / 4), r * sin(a - PI / 4), this.sizeMultiplier / 2));
        }
        return smallerAsteroids;
    }
}

let asteroids = [];