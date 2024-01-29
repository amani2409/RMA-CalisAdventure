/* Level 1 Scene */
var level1Scene = new Phaser.Scene('level1');

level1Scene.preload = function () {
    this.load.setBaseURL("assets/images");
    this.load.image('background', '/backgroundScenes/background.png');
    this.load.image('ground', '/backgroundScenes/ground.png');
    this.load.image('carrot', 'carrot.png');

    // good plants: dandelion, daisy, basil
    // no good plants: ivy, tulip, lily

    // good plant:
    this.load.image('daisy', '/plants/daisy.png');
    this.load.image('dandelion', '/plants/dandelion.png');
    this.load.image('basil', '/plants/basil.png');

    // bad plant:
    this.load.image('ivy', '/plants/ivy.png');
    this.load.image('tulip', '/plants/tulip.png');
    this.load.image('lily', '/plants/lily.png');

    this.load.image('setting', 'setting.png');


    this.load.image('nest', 'nest.png');

    this.load.spritesheet('bunny', '/sprites/bunnysprite.png', {frameWidth: 80, frameHeight: 50}); //created my own bunny spritesheet

    // NPC
    // this.load.spritesheet('bunnyNPC', 'bunnyspriteNpc.png', {frameWidth: 54, frameHeight: 50});
    this.load.spritesheet('fox', '/sprites/fox.png', {frameWidth: 36, frameHeight: 21}); // from https://opengameart.org/content/fox-wolf-pack-rework

}


level1Scene.create = function () {
    resetValues();
    levelactive = 1;

    neededCarrots = 5;

    // showTextOnly.call(this,'Sammel 10 Karroten,\num das Level abzuschließen!');

    //  background
    var background = this.add.sprite(config.width / 2, 300, 'background');
    background.alpha = 0.8;
    background.setScrollFactor(0.2);


    // ground
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 580, 'ground').setScale(2).refreshBody();
    platforms.create(1000, 580, 'ground').setScale(2).refreshBody();
    platforms.create(1600, 580, 'ground').setScale(2).refreshBody();
    platforms.create(580, 580, 'ground').setScale(2).refreshBody();


    /* setting plants */
    daisy = this.physics.add.sprite(800, 480, 'daisy').setScale(0.03);
    daisy.setOrigin(.5, .5);
    daisy.speechbubbleShown = false;
    var daisyText = level1Scene.createSpeechBubble(daisy.x - 100, daisy.y - 270, 140, 160, 'Ich bin Daisy. Mich kannst du mit Q essen und ich gebe dir Leben.', false, false);

    dandelion = this.physics.add.sprite(1600, 500, 'dandelion').setScale(0.05);
    dandelion.setOrigin(.5, .5);
    dandelion.speechbubbleShown = false;
    var dandelionText = level1Scene.createSpeechBubble(dandelion.x - 100, dandelion.y - 200, 140, 160, 'Ich bin Dandelion. Mich kannst du essen!', false, false);


    tulip = this.physics.add.sprite(1300, 500, 'tulip').setScale(0.03);
    tulip.setOrigin(.5, .5);
    tulip.speechbubbleShown = false;
    var tulipText = level1Scene.createSpeechBubble(tulip.x - 100, tulip.y - 270, 140, 160, 'Ich bin Tulip. Mich solltest du nicht essen!', true, false);

    // nest = this.physics.add.sprite(1800, 300, 'nest').setScale(0.02);
    const nestGroup = this.physics.add.group();
    nest = nestGroup.create(600, 200, 'nest').setScale(0.02);
    nest.setOrigin(.5, .5);

    nest.setCollideWorldBounds(true);



    // if(daisy.disableBody(true, true)){
    //     daisyText.disableBody(true, true);
    // }


    /* Add in next Level */
    // basil = this.physics.add.sprite(800, 500, 'basil').setScale(0.05);
    // basil.setOrigin(.5, .5);

    // ivy = this.physics.add.sprite(1300, 500, 'ivy').setScale(0.05);
    // ivy.setOrigin(.5, .5);

    // lily = this.physics.add.sprite(1300, 500, 'lily').setScale(0.05);
    // lily.setOrigin(.5, .5);


    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'bunny');

    //  Player physics properties
    player.setBounce(0.2);
    player.setOrigin(.5, .5);
    player.setDrag(1);
    player.setCollideWorldBounds(true);


    //  Our player animations, turning, walking left, walking right and cower
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('bunny', {start: 0, end: 2}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{key: 'bunny', frame: 5}],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('bunny', {start: 3, end: 5}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'down',
        frames: [{key: 'bunny', frame: 6}],
        frameRate: 20
    });

    // helping NPC
    // bunnyNPC = this.physics.add.sprite(650, 500, 'bunnyNPC').setScale(1.5);
    // bunnyNPC.setCollideWorldBounds(true);
    // level1Scene.createSpeechBubble(bunnyNPC.x - 100, bunnyNPC.y - 270, 140, 160, 'Ich bin dein HelperBunny und führe dich durch das 1. Level durch.', false, true);


    // this.anims.create({
    //     key: 'bunnyNPCwalking',
    //     frames: this.anims.generateFrameNumbers('bunnyNPC', {start: 0, end: 1}),
    //     frameRate: 10,
    //     repeat: -1
    // });

    // Fox NPC walking left
    fox = this.physics.add.sprite(1500, 400, 'fox').setScale(3);
    fox.setCollideWorldBounds(true);
    fox.speechbubbleShown = false;
    level1Scene.createSpeechBubble(fox.x - 100, fox.y - 270, 140, 160, 'Ich bin Fox.', true, true);

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


    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    // key input
    // Q to eat -> same sprite as down
    keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

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

    //  The healthbar
    healthText = this.add.text(16, 16, 'Health: 100', {fontSize: '32px', fill: '#000'});
    healthText.setScrollFactor(0);

    // counts carrots
    carrotsText = this.add.text(16, 45, 'Carrots: 0/' + neededCarrots, {fontSize: '32px', fill: '#000'});
    carrotsText.setScrollFactor(0);


    this.physics.world.setBounds(0, 0, 2000, 580);

    //  Collide the player and the carrots with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(carrots, platforms);
    this.physics.add.collider(fox, platforms);
    // this.physics.add.collider(bunnyNPC, platforms);
    this.physics.add.collider(daisy, platforms);
    this.physics.add.collider(dandelion, platforms);
    this.physics.add.collider(tulip, platforms);
    this.physics.add.collider(nestGroup, platforms);



    /* Add in next Level */

    // this.physics.add.collider(basil, platforms);
    // this.physics.add.collider(ivy, platforms);
    // this.physics.add.collider(lily, platforms);

    //  Checks to see if the player overlaps with any of the carrots, if he does call the collectPlants function
    this.physics.add.overlap(player, carrots, function (player, plant) {
        collectCarrots.call(this, player, plant, neededCarrots);
    }, null, this);

    this.physics.add.overlap(player, fox, hitFox, null, this);
    this.physics.add.overlap(player, daisy, collectPlants, null, this);
    this.physics.add.overlap(player, dandelion, collectPlants, null, this);
    this.physics.add.overlap(player, tulip, collectPlants, null, this);
    this.physics.add.overlap(player, nest, collectPlants, null, this);


    // this.physics.add.overlap(bunnyNPC, fox, showBunnyNPCSpeechbubble, null, this);
    // this.physics.add.overlap(bunnyNPC, daisy, showBunnyNPCSpeechbubble, null, this);
    // this.physics.add.overlap(bunnyNPC, dandelion, showBunnyNPCSpeechbubble, null, this);
    // this.physics.add.overlap(bunnyNPC, tulip, showBunnyNPCSpeechbubble, null, this);


    /* Add in next Level */

    // this.physics.add.overlap(player, basil, collectGoodPlants, null, this);
    // this.physics.add.overlap(player, ivy, collectBadPlants, null, this);
    // this.physics.add.overlap(player, lily, collectBadPlants, null, this);


    camera = this.cameras.main;
    camera.setBounds(0, 0, 2000, 580);
    camera.startFollow(player, true, 0.05, 0, -200, 120);
    camera.setFollowOffset(-200, 120);


}

level1Scene.update = function () {
    if (gameOver) {
        return;
    }

    if (cursors.left.isDown || cursors.right.isDown) {
        isPlayerMoving = true;
    } else {
        isPlayerMoving = false;
    }

    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);

    } else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);

    } else if (cursors.down.isDown) {
        player.setVelocityX(0);

        player.anims.play('down');
    } else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (keyQ.isDown) {
        player.setVelocityX(0);

        player.anims.play('down');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }

    // should run only if player is walking
    // should have a gap between Player and the NPC -> should be at the right side of the pic
    // if (isPlayerMoving && bunnyNPC.x === 1600) {
    //     // bunnyNPC.anims.play('bunnyNPCwalking', false);
    //     bunnyNPC.x = 1600;
    // }
    // if (isPlayerMoving) {
    //     bunnyNPC.anims.play('bunnyNPCwalking', true);
    //     bunnyNPC.x = player.x + 550;
    //
    // }
    // else {
    //     bunnyNPC.anims.play('bunnyNPCwalking', false);
    // }

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


    //
    const b = content.getBounds();
    content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));



    //
    // if (bunnyNPC) {
    //     bubble.setScrollFactor(0);
    //     content.setScrollFactor(0);
    //
    //     // Faden Sie die Speechbubble aus
    //     var tween = level1Scene.tweens.add({
    //         targets: [content, bubble],
    //         alpha: 0,
    //         ease: 'Linear',
    //         duration: 3000,
    //         onComplete: function () {
    //             // Nach dem Ausfaden, setzen Sie die Alpha zurück und machen Sie die Speechbubble unsichtbar
    //             [content, bubble].forEach(function (element) {
    //                 element.setAlpha(1);
    //                 element.setVisible(false);
    //             });
    //         }
    //     });
    //
    //     // Setzen Sie die Speechbubble sichtbar, da sie in der Tween-Kette möglicherweise unsichtbar gemacht wurde
    //     [content, bubble].forEach(function (element) {
    //         element.setVisible(true);
    //     });
    // }

}