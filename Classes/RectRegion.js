const AST_GEN_DIST_X = 100;
const AST_GEN_DIST_Y = 100;
const AST_GEN_WIDTH = 50;
const AST_GEN_HEIGHT = 50;
const AST_TGT_WIDTH = 400;
const AST_TGT_HEIGHT = 200;


class RectRegion{
    constructor(upleftx, uplefty, rangex, rangey){
        this.upleftx = upleftx;
        this.uplefty = uplefty;
        this.rangex = rangex;
        this.rangey = rangey;
    }

    // returns a pair of random x,y values inside the region
    getRandPos(){
        let x = this.upleftx + random(this.rangex);
        let y = this.uplefty + random(this.rangey);
        return {x,y};
    }
    render(){
        rect(this.upleftx, this.uplefty, this.rangex, this.rangey);
    }
}

let asteroid_generation_areas = [];
let asteroid_target_region = new RectRegion(SCREEN_WIDTH/2 - AST_TGT_WIDTH, SCREEN_HEIGHT/2 - AST_TGT_HEIGHT, AST_TGT_WIDTH*2, AST_TGT_HEIGHT*2);

function createAsteroidGenerationAreas(){
    asteroid_generation_areas.push(new RectRegion(-AST_GEN_DIST_X, -AST_GEN_DIST_Y, AST_GEN_WIDTH, AST_GEN_HEIGHT));
    asteroid_generation_areas.push(new RectRegion(SCREEN_CENTER_X, -AST_GEN_DIST_Y, AST_GEN_WIDTH, AST_GEN_HEIGHT));
    asteroid_generation_areas.push(new RectRegion(SCREEN_WIDTH+AST_GEN_DIST_X, -AST_GEN_DIST_Y, AST_GEN_WIDTH, AST_GEN_HEIGHT));
    asteroid_generation_areas.push(new RectRegion(-AST_GEN_DIST_X, SCREEN_CENTER_Y, AST_GEN_WIDTH, AST_GEN_HEIGHT));
    asteroid_generation_areas.push(new RectRegion(SCREEN_WIDTH+AST_GEN_DIST_X, SCREEN_CENTER_Y, AST_GEN_WIDTH, AST_GEN_HEIGHT));
    asteroid_generation_areas.push(new RectRegion(-AST_GEN_DIST_X, SCREEN_HEIGHT+AST_GEN_DIST_Y, AST_GEN_WIDTH, AST_GEN_HEIGHT));
    asteroid_generation_areas.push(new RectRegion(SCREEN_CENTER_X, SCREEN_HEIGHT+AST_GEN_DIST_Y, AST_GEN_WIDTH, AST_GEN_HEIGHT));
    asteroid_generation_areas.push(new RectRegion(SCREEN_WIDTH+AST_GEN_DIST_X, SCREEN_HEIGHT+AST_GEN_DIST_Y, AST_GEN_WIDTH, AST_GEN_HEIGHT));
}



