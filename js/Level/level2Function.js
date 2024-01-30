/* Level 2 Scene */
var level2Scene = new Phaser.Scene('level2');

level2Scene.preload = function () {
    this.load.setBaseURL("assets/images");
    this.load.image('background2', 'backgroundScenes/background2.png');
    this.load.image('ground', '/backgroundScenes/ground.png');
}

level2Scene.create = function () {
    levelactive = 2;
    neededCarrots = 7;

    /* background */
    var background2 = this.add.sprite(config.width / 2, 300, 'background2').setScale(1);
    background2.alpha = 0.8;
    background2.setScrollFactor(0.2);

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

    levelText = this.add.text(650, 16, 'Level ' + levelactive, {fontSize: '32px', fill: '#000'});
    levelText.setScrollFactor(0);

    /* Creating NPCs */
    npcPlants = this.physics.add.group();

    daisy = createNPC(this, 800, 480, 'daisy', 0.03, null, false, false);
    dandelion = createNPC(this, 1600, 500, 'dandelion', 0.05, null, false, false);
    lily = createNPC(this, 1300, 500, 'lily', 0.03, null, true, false);
    ivy = createNPC(this, 600, 500, 'ivy', 0.03, null, true, false);
    nest = createNPC(this, 1800, 300, 'nest', 0.02, null, false, false);

    npcPlants.add(daisy);
    npcPlants.add(lily);
    npcPlants.add(tulip);
    npcPlants.add(ivy);
    npcPlants.add(nest);

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'bunny');

    //  Player physics properties
    player.setBounce(0.2);
    player.setOrigin(.5, .5);
    player.setDrag(1);
    player.setCollideWorldBounds(true);

    createAnimation(this);

    /* Fox NPC walking left */
    fox = this.physics.add.sprite(1200, 400, 'fox').setScale(3);
    fox.setCollideWorldBounds(true);

    fox.anims.play('foxWalkingLeft', true);
    fox.body.velocity.x = -80;
    fox.previousX = fox.x;

    if(fox.x < 0){
        fox.destroy();
    }

    fox2 = this.physics.add.sprite(1800, 400, 'fox2').setScale(3);
    fox2.setCollideWorldBounds(true);

    fox2.anims.play('fox2WalkingLeft', true);
    fox2.body.velocity.x = -80;
    fox2.previousX = fox2.x;

    if(fox2.x < 0){
        fox2.destroy();
    }

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
    this.physics.add.collider(fox2, platforms);
    this.physics.add.collider(npcPlants, platforms);

    // Overlapping
    this.physics.add.overlap(player, carrots, function (player, plant) {
        collectCarrots.call(this, player, plant, neededCarrots);
    }, null, this);
    addOverlap(this, player, fox, hitFox);
    addOverlap(this, player, fox2, hitFox);
    addOverlap(this, player, npcPlants, collectPlants.bind(this));
    this.physics.add.overlap(player, nest, function (player, nest) {
        getExit.call(this, player, nest, neededCarrots);
    }, null, this);

    // camera following
    setCamera.call(this);
}

level2Scene.update = function () {
    updateLevelScene(this);
}


