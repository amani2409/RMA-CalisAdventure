/* Level 1 Scene */
var level1Scene = new Phaser.Scene('level1');

level1Scene.preload = function () {
    this.load.setBaseURL("assets/images");
    this.load.image('background', '/backgroundScenes/background.png');
    this.load.image('ground', '/backgroundScenes/ground.png');
    this.load.image('carrot', 'carrot.png');

    // player
    this.load.spritesheet('bunny', '/sprites/bunnysprite.png', {frameWidth: 80, frameHeight: 50}); //created my own bunny spritesheet

    // good plant:
    this.load.image('daisy', '/plants/daisy.png');
    this.load.image('dandelion', '/plants/dandelion.png');
    this.load.image('basil', '/plants/basil.png');

    // bad plant:
    this.load.image('ivy', '/plants/ivy.png');
    this.load.image('tulip', '/plants/tulip.png');
    this.load.image('lily', '/plants/lily.png');

    this.load.image('setting', 'setting.png');

    // exit
    this.load.image('nest', 'nest.png');

    // NPC
    this.load.spritesheet('fox', '/sprites/fox.png', {frameWidth: 36, frameHeight: 21}); // from https://opengameart.org/content/fox-wolf-pack-rework
}


level1Scene.create = function () {
    resetValues();
    levelactive = 1;
    neededCarrots = 5;

    /* background */
    var background = this.add.sprite(config.width / 2, 300, 'background');
    background.alpha = 0.8;
    background.setScrollFactor(0.2);

    /* ground = plattforms */
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 580, 'ground').setScale(2).refreshBody();
    platforms.create(1000, 580, 'ground').setScale(2).refreshBody();
    platforms.create(1600, 580, 'ground').setScale(2).refreshBody();
    platforms.create(580, 580, 'ground').setScale(2).refreshBody();

    // healthbar
    healthText = this.add.text(16, 16, 'Health: 100', {fontSize: '32px', fill: '#000'});
    healthText.setScrollFactor(0);

    // counts carrots
    carrotsText = this.add.text(16, 45, 'Carrots: 0/' + neededCarrots, {fontSize: '32px', fill: '#000'});
    carrotsText.setScrollFactor(0);

    /* Creating NPCs */
    npcPlants = this.physics.add.group();

    daisy = createNPC(this, 800, 480, 'daisy', 0.03, 'Ich bin Daisy. Mich kannst du mit Q essen und ich gebe dir Leben.', false, false);
    dandelion = createNPC(this, 1600, 500, 'dandelion', 0.05, 'Ich bin Dandelion. Mich kannst du essen!', false, false);
    tulip = createNPC(this, 1300, 500, 'tulip', 0.03, 'Ich bin Tulip. Mich solltest du nicht essen!', true, false);
    nest = createNPC(this, 500, 300, 'nest', 0.02, null, false, false);

    npcPlants.add(daisy);
    npcPlants.add(dandelion);
    npcPlants.add(tulip);
    npcPlants.add(nest);

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'bunny');

    //  Player physics properties
    player.setBounce(0.2);
    player.setOrigin(.5, .5);
    player.setDrag(1);
    player.setCollideWorldBounds(true);


    /* Fox NPC walking left */
    fox = this.physics.add.sprite(1500, 400, 'fox').setScale(3);
    fox.setCollideWorldBounds(true);

    this.anims.create({
        key: 'foxWalkingLeft',
        frames: this.anims.generateFrameNumbers('fox', {start: 3, end: 5}),
        frameRate: 10,
        repeat: -1
    });

    fox.anims.play('foxWalkingLeft', true);
    fox.body.velocity.x = -80;
    fox.previousX = fox.x;

    if(fox.x < 0){
        fox.setActive(false).setVisible(false);
    }

    // //  Our player animations, turning, walking left, walking right and cower
    // let animationsCreated = false;
    //
    // function createAnimation() {
    //     if (!animationsCreated) {
    //         // Deine Animationsdefinitionen hier...
    //
    //         animationsCreated = true;
    //     }
    // }

// In deinen Level-Szenen rufe die createAnimation-Funktion einmal auf
    createAnimation.call(this);

    cursors = this.input.keyboard.createCursorKeys();

    // key input
    // Q to eat -> same sprite as down
    keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    // //  Input Events
    // cursors = this.input.keyboard.createCursorKeys();
    //
    // // key input
    // // Q to eat -> same sprite as down
    // keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    //  Some carrots to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    carrots = this.physics.add.group({
        key: 'carrot',
        repeat: 20,
        setXY: {x: 12, y: 0, stepX: 170}
    });

    carrots.children.iterate(function (child) {
        //  Gives each carrot a slightly different bounce
        child.setScale(0.2);
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.world.setBounds(0, 0, 2000, 580);

    //  Collision
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(carrots, platforms);
    this.physics.add.collider(fox, platforms);
    this.physics.add.collider(npcPlants, platforms);

    // Overlapping
    this.physics.add.overlap(player, carrots, function (player, plant) {
        collectCarrots.call(this, player, plant, neededCarrots);
    }, null, this);
    addOverlap(this, player, fox, hitFox);
    addOverlap(this, player, npcPlants, collectPlants.bind(this));
    addOverlap(this, player, nest, collectPlants.bind(this));

    // camera following
    setCamera.call(this);

}

level1Scene.update = function () {
    updateLevelScene.call(this);
}


/* https://labs.phaser.io/edit.html?src=src/game%20objects/text/speech%20bubble.js&v=3.70.0
 *  changed a little bit
 */
level1Scene.createSpeechBubble = function (x, y, width, height, quote, alert, bunnyNPC) {

    const bubbleWidth = width;
    const bubbleHeight = height;
    const bubblePadding = 10;
    const arrowHeight = bubbleHeight / 4;

    const bubble = this.add.graphics({x: x, y: y});


    //  Bubble shadow
    bubble.fillStyle(0x222222, 0.5);
    bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

    //  Bubble color
    bubble.fillStyle(0xffffff, 1);

    //  Bubble outline line style
    bubble.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    //  Calculate arrow coordinates
    const point1X = Math.floor(bubbleWidth / 7);
    const point1Y = bubbleHeight;
    const point2X = Math.floor((bubbleWidth / 7) * 2);
    const point2Y = bubbleHeight;
    const point3X = Math.floor(bubbleWidth / 3);
    const point3Y = Math.floor(bubbleHeight + arrowHeight);

    //  Bubble arrow shadow
    bubble.lineStyle(4, 0x222222, 0.5);
    bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

    //  Bubble arrow fill
    bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
    bubble.lineStyle(2, 0x565656, 1);
    bubble.lineBetween(point2X, point2Y, point3X, point3Y);
    bubble.lineBetween(point1X, point1Y, point3X, point3Y);

    var color;
    if (alert) {
        color = '#FF0000FF';
    } else {
        color = '#000000';
    }

    const content = this.add.text(0, 0, quote, {
        fontFamily: 'Arial',
        fontSize: 20,
        color: color,
        align: 'center',
        wordWrap: {width: bubbleWidth - (bubblePadding * 2)}
    });

    const b = content.getBounds();
    content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));
}