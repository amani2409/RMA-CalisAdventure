var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    transparent: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            fps: 120,
            debug: false
        }
    },
    scene: [titleScreen, level1Scene, transitionScene, lostScreen, level2Scene, winScreen]
};

var game = new Phaser.Game(config);
