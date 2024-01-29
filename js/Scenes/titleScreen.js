var titleScreen = new Phaser.Scene('titleScreen');

titleScreen.preload = function () {
    this.load.setBaseURL('assets/images/backgroundScenes/');
    this.load.image('main', 'start.png');
    this.load.image('win', 'winscreen.png');
    this.load.image('lost', 'lostscene.png');
}

titleScreen.create = function () {
    this.add.image(400, 300, 'main');

    this.add.text(config.width / 2, config.height / 3, 'Willkommen bei Calis adventure \n\nUm Level 2 freizuschalten \nmusst du Level 1 abschließen.', {
        fontSize: 32,
        color: '#ffffff'
    }).setShadow(4, 4, '#000000', 2, false, true).setOrigin(0.5);

    var level1Text = this.add.text(config.width / 2, config.height / 2 + 70, 'Level 1', {
        fontSize: 32,
        color: '#ffffff'
    }).setShadow(4, 4, '#000000', 2, false, true).setOrigin(0.5);

    level1Text.setInteractive();
    level1Text.on('pointerdown', function (pointer) {
        this.scene.start('level1');
    }, this);

    var level2Text = this.add.text(config.width / 2, config.height / 2 + 120, 'Level 2', {
        fontSize: 32,
        color: '#ffffff'
    }).setShadow(4, 4, '#000000', 2, false, true).setOrigin(0.5);

    if(level2able){
        level2Text.setInteractive();
    }
    level2Text.on('pointerdown', function (pointer) {
        this.scene.start('level2');
    }, this);

}