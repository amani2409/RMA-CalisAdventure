var winScreen = new Phaser.Scene('winScreen');

winScreen.create = function () {
    resetValues(this);

    this.add.image(400, 300, 'win');
    this.add.text(config.width / 2, config.height / 3, 'Du hast gewonnen!\n\nWillst du von vorne anfangen\noder ins Hauptmenü kehren? ', {
        fontSize: 32,
        color: '#ffffff',
        align: 'center'
    }).setShadow(4, 4, '#000000', 2, false, true).setOrigin(0.5);

    var restart = this.add.text(config.width / 2, config.height / 2 + 70, 'Von vorne beginnen', {
        fontSize: 32,
        color: '#ffffff',
        align: 'center'
    }).setShadow(4, 4, '#000000', 2, false, true).setOrigin(0.5);

    restart.setInteractive();
    getHover(restart);
    restart.on('pointerdown', function (pointer) {
        winScreen.scene.start('level1');
    });

    var homescreen = this.add.text(config.width / 2, config.height / 2 + 100, 'Zum Hauptmenü', {
        fontSize: 32,
        color: '#ffffff'
    }).setShadow(4, 4, '#000000', 2, false, true).setOrigin(0.5);

    homescreen.setInteractive();
    getHover(homescreen);
    homescreen.on('pointerdown', function (pointer) {
        winScreen.scene.start('titleScreen');
    });
}