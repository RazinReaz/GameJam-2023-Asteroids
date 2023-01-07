const SCREEN_WIDTH = 900;
const SCREEN_HEIGHT = 700;
const SCREEN_CENTER_X = SCREEN_WIDTH / 2;
const SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;

const PROGRESSBAR_WIDTH = 500;
const PROGRESSBAR_HEIGHT = 15;

const DIST_TO_RESET_ASTEROID = 1000;

const AST_INITIAL_RADIUS = 50;
const AST_VEL_MAG_MIN = 1;
const AST_VEL_MAG_MAX = 4;
const AST_POINTS_MIN = 15;
const AST_POINTS_MAX = 20;
const AST_OFFSET_MIN = 0;
const AST_OFFSET_MAX = 20;
const AST_LASER_COLLISION_MULT = 1.05;

const ASTEROID_COUNT = 4;
const FRICTION = 0.99;
const NEW_ASTEROID_COUNT = 2;


const MAX_LASER_AMOUNT = 30;
const LASER_SPEED = 5;
const LASER_LIMITER = 15;

// for health
const COLLISION_TIMER_LIMITER = 150;

// for levels
const LEVEL_1_TARGET_POINTS = 500;

let Laser_Limiter_Counter = 0;
let Collision_timer_counter = 0;
let points = 0;
let state = 0;

// fonts
let menuFont;
let storyFont;