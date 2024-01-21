var titleScreen = new Phaser.Scene("titleScreen");
var level1Scene = new Phaser.Scene("level1");
var level2Scene = new Phaser.Scene("level2");
var endScreen = new Phaser.Scene("endScreen");

titleScreen.preload = function () {
    this.load.setBaseURL("assets");
    this.load.image("main", "start.png");
}

titleScreen.create = function () {
    this.add.image(400, 300, 'main');

    this.add.text(config.width / 2, config.height / 3, 'Willkommen bei Calis adventure \n\nUm Level 2 freizuschalten \nmusst du Level 1 abschließen.', {
        fontSize: 32,
        color: '#ffffff'
    }).setShadow(4, 4, "#000000", 2, false, true).setOrigin(0.5);

    var level1Text = this.add.text(config.width / 2, config.height / 2 + 70, 'Level 1', {
        fontSize: 32,
        color: '#ffffff'
    }).setShadow(4, 4, "#000000", 2, false, true).setOrigin(0.5);

    level1Text.setInteractive();
    level1Text.on('pointerdown', function (pointer) {
        this.scene.start('level1');
    }, this);

    // Füge Text für Level 2 hinzu
    var level2Text = this.add.text(config.width / 2, config.height / 2 + 120, 'Level 2', {
        fontSize: 32,
        color: '#ffffff'
    }).setShadow(4, 4, "#000000", 2, false, true).setOrigin(0.5);

    // if(level2able){
        level2Text.setInteractive();
    // }
    level2Text.on('pointerdown', function (pointer) {
        this.scene.start('level2');
    }, this);

}

endScreen.create = function () {
    this.add.image(400, 300, 'main');

    //add some text
    this.add.text(config.width / 2, config.height / 2 + 70, 'GAME OVER\nCLICK TO RESTART', {
        fontSize: 32,
        color: '#ffffff',
        align: 'center'
    }).setShadow(4, 4, "#000000", 2, false, true).setOrigin(0.5);

    this.input.on('pointerdown', function (pointer) {
        //shut down this scene and start up the game scene
        endScreen.scene.start('gameold.html');
        //restart the scene to reset all the variables!
        level1Scene.scene.restart();
    });
}

level1Scene.preload = function () {
    this.load.setBaseURL("assets");
    this.load.image('background', 'background.png');
    this.load.image('ground', 'ground.png');
    this.load.image('carrot', 'carrot.png');


    // good plants: dandelion, gaenseblümchen, basilikum
    // no good plants: tulpe, lilie, efeu

    // good plant:
    this.load.image('daisy', 'daisy.png');
    this.load.image('dandelion', 'dandelion.png');
    this.load.image('basil', 'basil.png');

    // bad plant:
    this.load.image('ivy', 'ivy.png');
    this.load.image('tulip', 'tulip.png');
    this.load.image('lily', 'lily.png');

    this.load.spritesheet('bunny', 'bunnysprite.png', {frameWidth: 80, frameHeight: 50}); //created my own bunny spritesheet

    // NPC
    this.load.spritesheet('bunnyNPC', 'bunnyspriteNpc.png', {frameWidth: 54, frameHeight: 50});
    this.load.spritesheet('fox', 'fox.png', {frameWidth: 36, frameHeight: 21}); // from https://opengameart.org/content/fox-wolf-pack-rework

}


level1Scene.create = function () {
    //  A simple background for our game
    var background = this.add.sprite(config.width / 2, 300, 'background');
    background.alpha = 0.8;
    background.setScrollFactor(0.2);

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 580, 'ground').setScale(2).refreshBody();
    platforms.create(1000, 580, 'ground').setScale(2).refreshBody();
    platforms.create(1600, 580, 'ground').setScale(2).refreshBody();
    platforms.create(580, 580, 'ground').setScale(2).refreshBody();
    platforms.create(150, 240, 'ground');


    /* setting plants */
    daisy = this.physics.add.sprite(800, 480, 'daisy').setScale(0.03);
    daisy.setOrigin(.5, .5);
    daisy.speechbubbleShown = false;

    dandelion = this.physics.add.sprite(1600, 500, 'dandelion').setScale(0.05);
    dandelion.setOrigin(.5, .5);
    dandelion.speechbubbleShown = false;


    tulip = this.physics.add.sprite(1300, 500, 'tulip').setScale(0.03);
    tulip.setOrigin(.5, .5);
    tulip.speechbubbleShown = false;


    /* Add in next Level */
    // basil = this.physics.add.sprite(800, 500, 'basil').setScale(0.05);
    // basil.setOrigin(.5, .5);

    // ivy = this.physics.add.sprite(1300, 500, 'ivy').setScale(0.05);
    // ivy.setOrigin(.5, .5);

    // lily = this.physics.add.sprite(1300, 500, 'lily').setScale(0.05);
    // lily.setOrigin(.5, .5);


    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'bunny');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setOrigin(.5, .5);
    player.setDrag(1);
    player.setCollideWorldBounds(true);


    //  Our player animations, turning, walking left and walking right.
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
    bunnyNPC = this.physics.add.sprite(650, 500, 'bunnyNPC').setScale(1.5);
    bunnyNPC.setCollideWorldBounds(true);

    this.anims.create({
        key: 'bunnyNPCwalking',
        frames: this.anims.generateFrameNumbers('bunnyNPC', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    // Fox NPC walking left
    fox = this.physics.add.sprite(1500, 400, 'fox').setScale(3);
    fox.setCollideWorldBounds(true);
    fox.speechbubbleShown = false;


    this.anims.create({
        key: 'foxWalkingLeft',
        frames: this.anims.generateFrameNumbers('fox', {start: 3, end: 5}),
        frameRate: 10,
        repeat: -1
    });

    fox.anims.play('foxWalkingLeft', true);
    fox.body.velocity.x = -80;
    fox.previousX = fox.x;

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    //  Some carrots to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    carrots = this.physics.add.group({
        key: 'carrot',
        repeat: 20,
        setXY: {x: 12, y: 0, stepX: 170}
    });

    carrots.children.iterate(function (child) {
        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    //  The healthbar
    healthText = this.add.text(16, 16, 'Health: 100', {fontSize: '32px', fill: '#000'});
    healthText.setScrollFactor(0);
    carrotsText = this.add.text(16, 45, 'Carrots: 0', {fontSize: '32px', fill: '#000'});
    carrotsText.setScrollFactor(0);


    this.physics.world.setBounds(0, 0, 2000, 580);

    //  Collide the player and the carrots with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(carrots, platforms);
    this.physics.add.collider(fox, platforms);
    this.physics.add.collider(bunnyNPC, platforms);
    this.physics.add.collider(daisy, platforms);
    this.physics.add.collider(dandelion, platforms);
    this.physics.add.collider(tulip, platforms);

    /* Add in next Level */

    // this.physics.add.collider(basil, platforms);
    // this.physics.add.collider(ivy, platforms);
    // this.physics.add.collider(lily, platforms);

    //  Checks to see if the player overlaps with any of the carrots, if he does call the collectPlants function
    this.physics.add.overlap(player, carrots, collectCarrots, null, this);

    this.physics.add.overlap(player, fox, hitFox, null, this);
    this.physics.add.overlap(player, daisy, collectPlants, null, this);
    this.physics.add.overlap(player, dandelion, collectPlants, null, this);
    this.physics.add.overlap(player, tulip, collectPlants, null, this);


    this.physics.add.overlap(bunnyNPC, fox, showBunnyNPCSpeechbubble, null, this);
    this.physics.add.overlap(bunnyNPC, daisy, showBunnyNPCSpeechbubble, null, this);
    this.physics.add.overlap(bunnyNPC, dandelion, showBunnyNPCSpeechbubble, null, this);
    this.physics.add.overlap(bunnyNPC, tulip, showBunnyNPCSpeechbubble, null, this);


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
    if (isPlayerMoving && bunnyNPC.x === 1600) {
        // bunnyNPC.anims.play('bunnyNPCwalking', false);
        bunnyNPC.x = 1600;
    }
    if (isPlayerMoving) {
        bunnyNPC.anims.play('bunnyNPCwalking', true);
        bunnyNPC.x = player.x + 550;

    } else {
        bunnyNPC.anims.play('bunnyNPCwalking', false);
    }

}


level1Scene.createSpeechBubble = function (x, y, width, height, quote, alert) {

    console.log('entering createSpeechBubble!!! #####');
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
    if(alert){
        color = '#FF0000FF';
    }
    else {
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

    bubble.setScrollFactor(0);
    content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));

    content.setScrollFactor(0);

    // Faden Sie die Speechbubble aus
    var tween = level1Scene.tweens.add({
        targets: [content, bubble],
        alpha: 0,
        ease: 'Linear',
        duration: 1500,
        onComplete: function () {
            // Nach dem Ausfaden, setzen Sie die Alpha zurück und machen Sie die Speechbubble unsichtbar
            [content, bubble].forEach(function (element) {
                element.setAlpha(1);
                element.setVisible(false);
            });
        }
    });

    // Setzen Sie die Speechbubble sichtbar, da sie in der Tween-Kette möglicherweise unsichtbar gemacht wurde
    [content, bubble].forEach(function (element) {
        element.setVisible(true);
    });

}


level2Scene.preload = function () {
    this.load.setBaseURL("assets");
    this.load.image('background', 'backgroundscene2.jpg');
    this.load.image('ground', 'ground.png');
    this.load.image('carrot', 'carrot.png');


    // good plants: dandelion, gaenseblümchen, basilikum
    // no good plants: tulpe, lilie, efeu

    // good plant:
    this.load.image('daisy', 'daisy.png');
    this.load.image('dandelion', 'dandelion.png');
    this.load.image('basil', 'basil.png');

    // bad plant:
    this.load.image('ivy', 'ivy.png');
    this.load.image('tulip', 'tulip.png');
    this.load.image('lily', 'lily.png');

    this.load.spritesheet('bunny', 'bunnysprite.png', {frameWidth: 80, frameHeight: 50}); //created my own bunny spritesheet

    // NPC
    this.load.spritesheet('fox', 'fox.png', {frameWidth: 36, frameHeight: 21}); // from https://opengameart.org/content/fox-wolf-pack-rework
}

level2Scene.create = function () {
    //  A simple background for our game
    var background = this.add.sprite(config.width / 2, 300, 'background').setScale(3);
    background.alpha = 0.8;
    background.setScrollFactor(0.2);

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 580, 'ground').setScale(2).refreshBody();
    platforms.create(1000, 580, 'ground').setScale(2).refreshBody();
    platforms.create(1600, 580, 'ground').setScale(2).refreshBody();
    platforms.create(580, 580, 'ground').setScale(2).refreshBody();
    // platforms.create(150, 240, 'ground');


    /* setting plants */
    daisy = this.physics.add.sprite(800, 480, 'daisy').setScale(0.03);
    daisy.setOrigin(.5, .5);
    daisy.speechbubbleShown = false;

    dandelion = this.physics.add.sprite(1600, 500, 'dandelion').setScale(0.05);
    dandelion.setOrigin(.5, .5);
    dandelion.speechbubbleShown = false;


    tulip = this.physics.add.sprite(1300, 500, 'tulip').setScale(0.03);
    tulip.setOrigin(.5, .5);
    tulip.speechbubbleShown = false;


    /* Add in next Level */
    // basil = this.physics.add.sprite(800, 500, 'basil').setScale(0.05);
    // basil.setOrigin(.5, .5);

    // ivy = this.physics.add.sprite(1300, 500, 'ivy').setScale(0.05);
    // ivy.setOrigin(.5, .5);

    // lily = this.physics.add.sprite(1300, 500, 'lily').setScale(0.05);
    // lily.setOrigin(.5, .5);


    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'bunny');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setOrigin(.5, .5);
    player.setDrag(1);
    player.setCollideWorldBounds(true);


    //  Our player animations, turning, walking left and walking right.
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


    // Fox NPC walking left
    fox = this.physics.add.sprite(1500, 400, 'fox').setScale(3);
    fox.setCollideWorldBounds(true);
    fox.speechbubbleShown = false;


    this.anims.create({
        key: 'foxWalkingLeft',
        frames: this.anims.generateFrameNumbers('fox', {start: 3, end: 5}),
        frameRate: 10,
        repeat: -1
    });

    fox.anims.play('foxWalkingLeft', true);
    fox.body.velocity.x = -80;
    fox.previousX = fox.x;

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    //  Some carrots to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    carrots = this.physics.add.group({
        key: 'carrot',
        repeat: 20,
        setXY: {x: 12, y: 0, stepX: 170}
    });

    carrots.children.iterate(function (child) {
        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    //  The healthbar
    healthText = this.add.text(16, 16, 'Health: 100', {fontSize: '32px', fill: '#000'});
    healthText.setScrollFactor(0);
    carrotsText = this.add.text(16, 45, 'Carrots: 0', {fontSize: '32px', fill: '#000'});
    carrotsText.setScrollFactor(0);


    this.physics.world.setBounds(0, 0, 2000, 580);

    //  Collide the player and the carrots with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(carrots, platforms);
    this.physics.add.collider(fox, platforms);
    this.physics.add.collider(daisy, platforms);
    this.physics.add.collider(dandelion, platforms);
    this.physics.add.collider(tulip, platforms);

    /* Add in next Level */

    // this.physics.add.collider(basil, platforms);
    // this.physics.add.collider(ivy, platforms);
    // this.physics.add.collider(lily, platforms);

    //  Checks to see if the player overlaps with any of the carrots, if he does call the collectPlants function
    this.physics.add.overlap(player, carrots, collectCarrots, null, this);

    this.physics.add.overlap(player, fox, hitFox, null, this);
    this.physics.add.overlap(player, daisy, collectPlants, null, this);
    this.physics.add.overlap(player, dandelion, collectPlants, null, this);
    this.physics.add.overlap(player, tulip, collectPlants, null, this);


    /* Add in next Level */

    // this.physics.add.overlap(player, basil, collectGoodPlants, null, this);
    // this.physics.add.overlap(player, ivy, collectBadPlants, null, this);
    // this.physics.add.overlap(player, lily, collectBadPlants, null, this);


    camera = this.cameras.main;
    camera.setBounds(0, 0, 2000, 580);
    camera.startFollow(player, true, 0.05, 0, -200, 120);
    camera.setFollowOffset(-200, 120);


}

level2Scene.update = function () {
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

}