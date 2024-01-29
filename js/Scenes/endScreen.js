var endScreen = new Phaser.Scene('endScreen');

endScreen.create = function () {
    this.add.image(400, 300, 'lost');

    resetValues();

    this.add.text(config.width / 2, config.height / 3, 'GAME OVER\nVersuche es erneut\noder\nkehre ins Hauptmenü', {
        fontSize: 32,
        color: '#ffffff',
        align: 'center'
    }).setShadow(4, 4, '#000000', 2, false, true).setOrigin(0.5);

    var restart = this.add.text(config.width / 2, config.height / 2 + 70, 'Erneut versuchen', {
        fontSize: 32,
        color: '#ffffff',
        align: 'center'
    }).setShadow(4, 4, '#000000', 2, false, true).setOrigin(0.5);


    var homescreen = this.add.text(config.width / 2, config.height / 2 + 100, 'Zum Hauptmenü zurück.', {
        fontSize: 32,
        color: '#ffffff'
    }).setShadow(4, 4, '#000000', 2, false, true).setOrigin(0.5);

    restart.setInteractive();

    // should restart this level which was lost
    restart.on('pointerdown', function (pointer) {
        endScreen.scene.start('level' + levelactive);
    });
    homescreen.setInteractive();

    homescreen.on('pointerdown', function (pointer) {
        endScreen.scene.start('titleScreen');
    });
}