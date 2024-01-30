/*
* resets global variable: health, countCarrots
* */
function resetValues(scene) {
    health = 100;
    countCarrots = 0;
    gameOver = false;
    // if (cursors) {
    //     cursors.reset();
    // } else {
    //     cursors = scene.input.keyboard.createCursorKeys();
    // }

    if (keyQ) {
        keyQ.reset();
    } else {
        keyQ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    }
}

/*
* updates text for health and carrots
* */
function displayHealthCarrots(health, countCarrots, neededCarrots, level) {
    healthText.setText('Health: ' + health);
    carrotsText.setText('Carrots: ' + countCarrots + '/' + neededCarrots);
}

/*
* creates a NPC
* quote is mostly added in level1
* */
function createNPC(scene, x, y, imageKey, scale, quote, alert) {
    const npc = scene.physics.add.sprite(x, y, imageKey).setScale(scale);
    npc.setOrigin(0.5, 0.5);
    if (quote) {
        npc.speechbubble = scene.createSpeechBubble(x - 100, y - 270, 140, 160, quote, alert);
    }
    return npc;
}


/*
* overlap function with a callback function
* */
function addOverlap(scene, player, plant, callback) {
    scene.physics.add.overlap(player, plant, callback, null, scene);
}

/*
* player is getting vulnerable where they can take damage
* */
function playerVulnerable(game) {
    var death = game.tweens.add({
        targets: player,
        alpha: 1,
        ease: 'Linear',
        duration: 200,
        onComplete: function () {
            player.invulnerable = false;
        },
        onCompleteScope: this
    });
}

/*
* player collects the plant only if overlapped and Q is used
* Key Q will eat the plant and gives health or not
* */
function collectPlants(player, plant) {
    if (keyQ.isDown) {
        if (plant == daisy || plant == dandelion) {
            //  Add and update the Health
            health += 10;
            plant.disableBody(true, true);
        }
        if (plant == tulip || plant == ivy || plant == lily) {
            health -= 10;
            plant.disableBody(true, true);
        }
        if (health <= 0) {
            gameOver = true;
            restartGame(this);
        }
        displayHealthCarrots(health, countCarrots, neededCarrots)
    }
}

/*
* Getting to exit and collected the needed Carrots
* */
function getExit(player, nest, neededCarrots) {
    if (keyQ.isDown) {
        if (countCarrots >= neededCarrots) {
            switchLevelScene(this);
        } else {
            createMessage(this, nest.x, 50, 200, 80, 'Du hast noch nicht \ngenug Karrotten gesammelt!', false);
        }
    }
}

/*
* collecting carrots
* */
function collectCarrots(player, carrot, neededCarrots) {
    carrot.disableBody(true, true);
    //  Add and update the Health
    countCarrots += 1;
    displayHealthCarrots(health, countCarrots, neededCarrots)

    if (countCarrots === neededCarrots) {
        createMessage(this, player.x, 50, 220, 160, 'Geh zu deinem Nest\nund klicke Q um das Level\nzu beenden!', false);
    }
}


/* https://github.com/digitherium/phaserplatformerseries/blob/main/9_moving_baddies.html on line 125
* */
function hitFox(player, fox) {

    if (fox.hit && health > 0) {
        fox.disableBody(false, false);
        player.setVelocityY(jumpVelocity)

        var tween = this.tweens.add({
            targets: fox,
            alpha: 0.3,
            scaleX: 1.5,
            scaleY: 1.5,
            ease: 'Linear',
            duration: 200,
            onComplete: function () {
                destroyGameObject(fox);
            },
        });

    } else {
        //if not invulnerable
        if (!player.invulnerable) {
            player.invulnerable = true;

            health -= 50;
            countCarrots -= 3;
            if (countCarrots <= 0) {
                countCarrots = 0;
            }
            displayHealthCarrots(health, countCarrots, neededCarrots)

            if (health <= 0) {
                gameOver = true;
                restartGame(this);
            } else {
                player.body.velocity.x = 0;
                player.body.velocity.y = -220;

                var tween = this.tweens.add({
                    targets: player,
                    alpha: 0.8,
                    ease: 'Linear',
                    duration: 200,
                    onCompleteScope: this
                });

                var timer = this.time.delayedCall(vulnerableTime, playerVulnerable, [this]);

            }

        }
    }
}

