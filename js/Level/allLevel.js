
function createAnimation(){
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

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    // key input
    // Q to eat -> same sprite as down
    keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
}


/* walking camera
 * https://codepen.io/digitherium/details/MWmJKBo
 */
function setCamera(){
    camera = this.cameras.main;
    camera.setBounds(0, 0, 2000, 580);
    camera.startFollow(player, true, 0.05, 0, -200, 120);
    camera.setFollowOffset(-200, 120);
}


function updateLevelScene(){
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