function settingButton() {
    homemenu = this.add.text(config.width / 2, config.height / 3, 'Return to Homescreen.', {
        fontSize: 32,
        color: '#ffffff'
    }).setShadow(4, 4, "#000000", 2, false, true).setOrigin(0.5);

    homemenu.setInteractive();

    homemenu.on('pointerdown', function (pointer) {
        //shut down this scene and start up the game scene
        endScreen.scene.start('titleScreen');
        //restart the scene to reset all the variables!
        this.scene.restart();
    });
}
