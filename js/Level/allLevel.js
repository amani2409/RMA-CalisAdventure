/*
* https://phaser.io/tutorials/making-your-first-phaser-3-game/part7
* */

function createAnimation(scene) {
    if (!scene.anims.get('left')) {
        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('bunny', {start: 0, end: 2}),
            frameRate: 10,
            repeat: -1
        });
    }

    if (!scene.anims.get('turn')) {
        scene.anims.create({
            key: 'turn',
            frames: [{key: 'bunny', frame: 5}],
            frameRate: 20
        });
    }

    if (!scene.anims.get('right')) {
        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('bunny', {start: 3, end: 5}),
            frameRate: 10,
            repeat: -1
        });
    }

    if (!scene.anims.get('down')) {
        scene.anims.create({
            key: 'down',
            frames: [{key: 'bunny', frame: 6}],
            frameRate: 20
        });
    }

    if (!scene.anims.get('foxWalkingLeft')) {
        scene.anims.create({
            key: 'foxWalkingLeft',
            frames: scene.anims.generateFrameNumbers('fox', {start: 3, end: 5}),
            frameRate: 10,
            repeat: -1
        });
    }

    if (!scene.anims.get('fox2WalkingLeft')) {
        scene.anims.create({
            key: 'fox2WalkingLeft',
            frames: scene.anims.generateFrameNumbers('fox2', {start: 3, end: 5}),
            frameRate: 10,
            repeat: -1
        });
    }

}


/* walking camera
 * https://codepen.io/digitherium/details/MWmJKBo
 */
function setCamera() {
    camera = this.cameras.main;
    camera.setBounds(0, 0, 2000, 580);
    camera.startFollow(player, true, 0.05, 0, -200, 120);
    camera.setFollowOffset(-200, 120);
}


function updateLevelScene(scene) {
    cursors = scene.input.keyboard.createCursorKeys();
    keyQ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    if (gameOver) {
        player.setVelocityX(0);
        player.anims.play('turn');
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

    } else if (keyQ.isDown) {
        player.setVelocityX(0);
        player.anims.play('down');
    } else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {

        player.setVelocityY(-300);
    }

    if (fox.x <= 55) {
        fox.destroy();
    }

    if (fox2 && fox2.x <= 55) {
        fox2.destroy();
    }

}