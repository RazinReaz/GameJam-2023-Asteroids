const SCREEN_WIDTH = 900;
const SCREEN_HEIGHT = 700;
const SCREEN_CENTER_X = SCREEN_WIDTH / 2;
const SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;

const PROGRESSBAR_X = 200;
const PROGRESSBAR_Y = 20;
const PROGRESSBAR_WIDTH = 500;
const PROGRESSBAR_HEIGHT = 15;

const FRICTION_INIT = 0.99;
const FRICTION_PUSH = 0.85;

// for asteroids
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
const NEW_ASTEROID_COUNT = 4;

// for ship
const SHIP_INIT_HEALTH = 5;
const SHIP_NORMAL_BOOST_FORCE = 0.2;
const SHIP_PUSH_BOOST_FORCE = 0.02;

// for laser
const MAX_LASER_AMOUNT = 30;
const LASER_SPEED = 5;
const LASER_LIMITER = 15;

// for health
const COLLISION_TIMER_LIMITER = 150;

// for levels
const TARGET_POINTS_LEVEL_1 = 1000;
const TARGET_POINTS_LEVEL_2 = 800;
const TARGET_POINTS_LEVEL_3 = PROGRESSBAR_WIDTH;
const LEVEL_3_TAUNT_INIT = -1000;
const LEVEL_3_HINT1_OFFS = -5000;
const LEVEL_3_HINT2_OFFS = -7000;

let global_w = 0;

let Laser_Limiter_Counter = 0;
let Collision_timer_counter = 0;

let points = 0;
let state = 0;
let level = 0;

let Friction = FRICTION_INIT;
let Level_3_hint_t = LEVEL_3_TAUNT_INIT;
let gameOverMessage;
// fonts
let menuFont;
let storyFont;
// sounds
let laserSound;
let asteroidSound;
let bgSound;
let gameOverSound;
let levelClearedSound;
let decreaseHealthSound;

let bgLoopOn= false;