var transitionScene = new Phaser.Scene('transitionScene');

transitionScene.create = function () {
    this.add.image(400, 300, 'lost');

    this.add.text(config.width / 2, config.height / 2, 'Du bist gestorben!', {
        fontSize: 32,
        color: '#ffffff'
    }).setShadow(4, 4, '#000000', 2, false, true).setOrigin(0.5);

    this.time.delayedCall(2000, function () {
        this.scene.start('lostScreen');
    }, [], this);
};