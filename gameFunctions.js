// gameFunctions.js
function restartGame(scene) {
    scene.scene.start('endScreen');
}

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

function destroyGameObject(gameObject) {
    gameObject.destroy();
}



// Key Q will eat the plant and gives health or not
function collectPlants(player, plant) {
    if (keyQ.isDown) {
        plant.disableBody(true, true);
        if (plant == daisy || plant == dandelion) {
            //  Add and update the Health
            health += 10;
            healthText.setText('Health: ' + health);
        }
        if (plant == tulip) {
            health -= 10;
            healthText.setText('Health: ' + health);
        }
        if(health <= 0){
            restartGame(this);
        }
    }
}


function collectCarrots(player, plant) {
    plant.disableBody(true, true);

    //  Add and update the Health
    countCarrots += 1;
    carrotsText.setText('Carrots: ' + countCarrots);

    if(countCarrots >= 10){
        level2able = true;
        countCarrots = 0;
        this.scene.start('level2');

    }

    // if (carrots.countActive(true) === 100) {
    //     //  A new batch of carrots to collect
    //     carrots.children.iterate(function (child) {
    //
    //         child.enableBody(true, child.x, 0, true, true);
    //
    //     });
    //
    // }
}

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
            healthText.setText('Health: ' + health);

            countCarrots -= 5;
            if (countCarrots <= 0) {
                countCarrots = 0;
            }
            carrotsText.setText('Carrots: ' + countCarrots);


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
