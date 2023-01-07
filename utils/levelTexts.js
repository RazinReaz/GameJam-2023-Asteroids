function menu() {
  background(51);
  textFont(menuFont);
  textSize(SCREEN_WIDTH/10);
  textAlign(CENTER);
  text('Asteroids', SCREEN_CENTER_X, SCREEN_CENTER_Y-SCREEN_HEIGHT/10);
  textSize(SCREEN_WIDTH/30);
  text('Click to start', SCREEN_CENTER_X, SCREEN_CENTER_Y+SCREEN_HEIGHT/50);
  textSize(SCREEN_WIDTH/40);
  text('How to play', SCREEN_CENTER_X, SCREEN_CENTER_Y+SCREEN_HEIGHT/5);
  text('Use arrow keys to move and space to shoot', SCREEN_CENTER_X, SCREEN_CENTER_Y+1.25*SCREEN_HEIGHT/5);
  fill(255);
}

function dialoguesTextFormatting(line1, line2, line3) {
  background(51);
  textFont(storyFont);
  textSize(SCREEN_WIDTH/40);
  textAlign(CENTER);
  text(line1, SCREEN_CENTER_X, SCREEN_CENTER_Y-SCREEN_HEIGHT/10);
  text(line2, SCREEN_CENTER_X, SCREEN_CENTER_Y);
  text(line3, SCREEN_CENTER_X, SCREEN_CENTER_Y+SCREEN_HEIGHT/10);
}

function level1Text() { 
  dialoguesTextFormatting('It has been years, decades actually, since I saw another human face.', 
    'Floating, drifting into the unknown.');
}

function level1End() {
  dialoguesTextFormatting('That is how it is, living out here. Surviving actually.',
    'You never know what is gonna get you first, ', 
    'chunks of space-rock, or your loneliness.');
}

function level2Text() {
  dialoguesTextFormatting('No, still nothing. No comms. I baffle myself at times, how do still I hope?', 
    'Is there any end to this misery? Any end to this unending progress?');
}

function level2End() {
  dialoguesTextFormatting('I have to keep going. I have to keep moving. I have to keep surviving.', 
    'But where do I go?, I keep asking myself, moving on and on and on.');
}

function level3Text() {
  dialoguesTextFormatting('So you mean to tell me,', 
    'there is a way out? But wait...', 
    'Who ARE you?');
}

function level3Mid() {
  dialoguesTextFormatting('Is there s', 
    'lvl 3 mid');
}

function gameCleared() {
  dialoguesTextFormatting('Thank you, whoever you are...', 
    'I am finally free. I am finally home.','THANK YOU!');
}





function mouseClicked() {
  if (state == MENU) {
    state = LEVEL_1_TEXT;
  } else if (state == LEVEL_1_TEXT) { // GAME hobe
    state = LEVEL_1_END;
  } else if (state == LEVEL_1_END) {
    state = LEVEL_2_TEXT;
  } else if (state == LEVEL_2_TEXT) {
    state = LEVEL_2_END;
  } else if (state == LEVEL_2_END) {
    state = LEVEL_3_TEXT;
  } else if (state == LEVEL_3_TEXT) {
    state = LEVEL_3_MID;
  } else if (state == LEVEL_3_MID) {
    state = GAME_CLEARED;
  } else if (state == GAME_CLEARED) {
    // state = MENU;
    state = GAME_OVER; // test
  }
}