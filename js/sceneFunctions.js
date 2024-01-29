function restartGame(scene) {
    scene.scene.start('transitionScene');
}

function switchLevelScene(scene) {
    if(levelactive === 1){
        level2able = true;
        scene.scene.start('transitionScene');
    }
    else if(levelactive === 2){
        scene.scene.start('winScreen');
    }
}



