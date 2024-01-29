var level2Scene = new Phaser.Scene('level2');

/* Level 2 Scene */

level2Scene.preload = function () {
    this.load.setBaseURL("assets/images");
    this.load.image('background2', '/backgroundScenes/background2.png');
    this.load.image('ground', '/backgroundScenes/ground.png');
}

level2Scene.create = function () {
    resetValues();
    levelactive = 2;

    neededCarrots = 10;
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
        child.setScale(0.2);
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    //  The healthbar
    healthText = this.add.text(16, 16, 'Health: 100', {fontSize: '32px', fill: '#000'});
    healthText.setScrollFactor(0);

    // Counts Carrots
    carrotsText = this.add.text(16, 45, 'Carrots: 0/' + neededCarrots, {fontSize: '32px', fill: '#000'});
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
    this.physics.add.overlap(player, carrots,function (player, plant) {
        collectCarrots.call(this, player, plant, neededCarrots);
    }, null, this);

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