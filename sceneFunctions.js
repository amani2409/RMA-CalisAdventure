var titleScreen = new Phaser.Scene('titleScreen');
var level1Scene = new Phaser.Scene('level1');
var level2Scene = new Phaser.Scene('level2');
var transitionScene = new Phaser.Scene('transitionScene');
var endScreen = new Phaser.Scene('endScreen');
var winScreen = new Phaser.Scene('winScreen');


titleScreen.preload = function () {
    this.load.setBaseURL('assets');
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

    restart.on('pointerdown', function (pointer) {
        if(this.scene.key === 'level1'){
            endScreen.scene.start('level1');
        }
        if(this.scene.key === 'level2'){
            endScreen.scene.start('level2');
        }
    });
    // scene.scene.start('endScreen');
    homescreen.setInteractive();

    homescreen.on('pointerdown', function (pointer) {
        endScreen.scene.start('titleScreen');
    });
}

transitionScene.create = function () {
    this.add.image(400, 300, 'lost');

    this.add.text(config.width / 2, config.height / 2, 'Du bist gestorben!', {
        fontSize: 32,
        color: '#ffffff'
    }).setShadow(4, 4, '#000000', 2, false, true).setOrigin(0.5);

    this.time.delayedCall(2000, function () {
        this.scene.start('endScreen');
    }, [], this);
};

function restartGame(scene) {
    scene.scene.start('transitionScene');
}

winScreen.create = function () {
    this.add.image(400, 300, 'win');
    this.add.text(config.width / 2, config.height / 2 + 70, 'Du hast gewonnen! Willst du von vorne anfangen oder ins Hauptmenü kehren? ', {
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

    restart.on('pointerdown', function (pointer) {
        this.scene.start('level1');
    });

    var homescreen = this.add.text(config.width / 2, config.height / 3, 'Zum Hauptmenü', {
        fontSize: 32,
        color: '#ffffff'
    }).setShadow(4, 4, '#000000', 2, false, true).setOrigin(0.5);


    homescreen.setInteractive();

    homescreen.on('pointerdown', function (pointer) {
        this.scene.start('titleScreen');
        this.scene.restart();
    });
}


