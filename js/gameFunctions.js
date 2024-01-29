/*
* resets global variable: health, countCarrots
* */
function resetValues (){
    health = 100;
    countCarrots = 0;
}

/*
* updates text for health and carrots
* */
function displayHealthCarrots(health, countCarrots, neededCarrots){
    healthText.setText('Health: ' + health);
    carrotsText.setText('Carrots: ' + countCarrots + '/' + neededCarrots);
}

/*
* creates a NPC
* quote is mostly added in level1
* */
function createNPC(scene, x, y, imageKey, scale, quote, alert, bunnyNPC) {
    const npc = scene.physics.add.sprite(x, y, imageKey).setScale(scale);
    npc.setOrigin(0.5, 0.5);
    if(quote){
        npc.speechbubble = scene.createSpeechBubble(x - 100, y - 270, 140, 160, quote, alert, bunnyNPC);
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
        // plant.disableBody(true, true);
        if (plant == daisy || plant == dandelion) {
            //  Add and update the Health
            health += 10;
            plant.disableBody(true, true);
            // plant.speechbubble.disableBody(true, true);
        }
        if (plant == tulip) {
            health -= 10;
            plant.disableBody(true, true);
            // plant.speechbubble.disableBody(true, true);
        }
        if(health <= 0){
            restartGame(this);
        }
        if(plant === nest){
            if (countCarrots >= neededCarrots){
                switchLevelScene(this);
            }
            else {
                createMessage(this, nest.x - 300, nest.y - 500 , 200, 80 , 'Du hast noch nicht \ngenug Karrotten gesammelt!');
            }
        }
        displayHealthCarrots(health, countCarrots, neededCarrots)
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

    if(countCarrots === neededCarrots){
        createMessage(this, player.x - 400, player.y - 400 , 220, 160 , 'Geh zu deinem Nest\nund klicke Q um das Level\nzu beenden!');
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

