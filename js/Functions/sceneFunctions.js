function restartGame(scene) {
    resetValues(scene);
    scene.scene.start('transitionScene');
}

function switchLevelScene(scene) {
    resetValues(scene);
    if (levelactive === 1) {
        level2able = true;
        scene.scene.start('level2');
    } else if (levelactive === 2) {
        scene.scene.start('winScreen');
    }
}

function playMusic(music) {
    if (musicPlaying) {
        music.stop();
        music.destroy();
        musicPlaying = false;
    }

    music.play({
        volume: 0.3,
    });
    musicPlaying = true;

}


