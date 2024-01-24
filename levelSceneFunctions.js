/* Level 1 Scene */

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

    this.load.image('setting', 'setting.png');


    this.load.spritesheet('bunny', 'bunnysprite.png', {frameWidth: 80, frameHeight: 50}); //created my own bunny spritesheet

    // NPC
    this.load.spritesheet('bunnyNPC', 'bunnyspriteNpc.png', {frameWidth: 54, frameHeight: 50});
    this.load.spritesheet('fox', 'fox.png', {frameWidth: 36, frameHeight: 21}); // from https://opengameart.org/content/fox-wolf-pack-rework

}


level1Scene.create = function () {
    resetValues();

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
    level1Scene.createSpeechBubble(daisy.x - 100, daisy.y - 270, 140, 160, 'Ich bin Daisy. Mich kannst du mit Q essen und ich gebe dir Leben.', false, false);

    dandelion = this.physics.add.sprite(1600, 500, 'dandelion').setScale(0.05);
    dandelion.setOrigin(.5, .5);
    dandelion.speechbubbleShown = false;
    level1Scene.createSpeechBubble(dandelion.x - 100, dandelion.y - 200, 140, 160, 'Ich bin Dandelion. Mich kannst du essen!', false, false);


    tulip = this.physics.add.sprite(1300, 500, 'tulip').setScale(0.03);
    tulip.setOrigin(.5, .5);
    tulip.speechbubbleShown = false;
    level1Scene.createSpeechBubble(tulip.x - 100, tulip.y - 270, 140, 160, 'Ich bin Tulip. Mich solltest du nicht essen!', true, false);


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
    bunnyNPC = this.physics.add.sprite(650, 500, 'bunnyNPC').setScale(1.5);
    bunnyNPC.setCollideWorldBounds(true);
    level1Scene.createSpeechBubble(bunnyNPC.x - 100, bunnyNPC.y - 270, 140, 160, 'Ich bin dein HelperBunny und führe dich durch das 1. Level durch.', false, true);


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
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    //  The healthbar
    healthText = this.add.text(16, 16, 'Health: 100', {fontSize: '32px', fill: '#000'});
    healthText.setScrollFactor(0);

    // counts carrots
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


/* Level 2 Scene */

level2Scene.preload = function () {
    this.load.setBaseURL("assets");
    this.load.image('background2', 'background2.png');
    this.load.image('ground', 'ground.png');
}

level2Scene.create = function () {
    resetValues();

    //  background
    var background = this.add.sprite(config.width / 2, 300, 'background2').setScale(1);
    background.alpha = 0.8;
    background.setScrollFactor(0.2);

    platforms = this.physics.add.staticGroup();

    //  Creating the ground.
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

    //  Player physics properties. Gives a slight bounce.
    player.setBounce(0.2);
    player.setOrigin(.5, .5);
    player.setDrag(1);
    player.setCollideWorldBounds(true);


    //  Our player animations, turning, walking left and walking right, to cower
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
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    //  The healthbar
    healthText = this.add.text(16, 16, 'Health: 100', {fontSize: '32px', fill: '#000'});
    healthText.setScrollFactor(0);

    // Counts Carrots
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