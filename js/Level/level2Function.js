var level2Scene = new Phaser.Scene('level2');

/* Level 2 Scene */

level2Scene.preload = function () {
    this.load.setBaseURL("assets/images/backgroundScenes");
    this.load.image('background2', '/background2.png');
    this.load.image('ground', '/ground.png');
}


level2Scene.create = function () {
    resetValues();
    levelactive = 2;
    neededCarrots = 10;

    /* background */
    background = this.add.sprite(config.width / 2, 300, 'background2').setScale(1);
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

    daisy = createNPC(this, 800, 480, 'daisy', 0.03, null, false, false);
    dandelion = createNPC(this, 1600, 500, 'dandelion', 0.05, null, false, false);
    tulip = createNPC(this, 1300, 500, 'tulip', 0.03, null, true, false);
    nest = createNPC(this, 1800, 300, 'nest', 0.02, null, false, false);

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

    //  Our player animations, turning, walking left, walking right and cower
    createAnimation.call(this);


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

level2Scene.update = function () {
    updateLevelScene.call(this);
}


