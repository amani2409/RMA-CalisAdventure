function resetValues (){
    health = 100;
    countCarrots = 0;
}

function displayHealthCarrots(health, countCarrots, neededCarrots){
    healthText.setText('Health: ' + health);
    carrotsText.setText('Carrots: ' + countCarrots + '/' + neededCarrots);
}

// function createMessage(text) {
//     const bubbleWidth = width;
//     const bubbleHeight = height;
//     const bubblePadding = 10;
//     const arrowHeight = bubbleHeight / 4;
//
//     const bubble = this.add.graphics({x: x, y: y});
//
//
//     //  Bubble shadow
//     bubble.fillStyle(0x222222, 0.5);
//     bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);
//
//     //  Bubble color
//     bubble.fillStyle(0xffffff, 1);
//
//     //  Bubble outline line style
//     bubble.lineStyle(4, 0x565656, 1);
//
//     //  Bubble shape and outline
//     bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
//     bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
//
//     //  Calculate arrow coordinates
//     const point1X = Math.floor(bubbleWidth / 7);
//     const point1Y = bubbleHeight;
//     const point2X = Math.floor((bubbleWidth / 7) * 2);
//     const point2Y = bubbleHeight;
//     const point3X = Math.floor(bubbleWidth / 3);
//     const point3Y = Math.floor(bubbleHeight + arrowHeight);
//
//     //  Bubble arrow shadow
//     bubble.lineStyle(4, 0x222222, 0.5);
//     bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);
//
//     //  Bubble arrow fill
//     bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
//     bubble.lineStyle(2, 0x565656, 1);
//     bubble.lineBetween(point2X, point2Y, point3X, point3Y);
//     bubble.lineBetween(point1X, point1Y, point3X, point3Y);
//
//     var color;
//     if (alert) {
//         color = '#FF0000FF';
//     } else {
//         color = '#000000';
//     }
//
//     const content = this.add.text(0, 0, text, {
//         fontFamily: 'Arial',
//         fontSize: 20,
//         color: color,
//         align: 'center',
//         wordWrap: {width: bubbleWidth - (bubblePadding * 2)}
//     });
//
//
//     //
//     const b = content.getBounds();
//     content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));
//
//         bubble.setScrollFactor(0);
//         content.setScrollFactor(0);
// }

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
        // plant.disableBody(true, true);
        if (plant == daisy || plant == dandelion) {
            //  Add and update the Health
            health += 10;
            plant.disableBody(true, true);
        }
        if (plant == tulip) {
            health -= 10;
            plant.disableBody(true, true);
        }
        if(health <= 0){
            restartGame(this);
        }
        if(plant === nest){
            plant.disableBody(true, false);

            if (countCarrots >= neededCarrots){
                switchLevelScene(this);
            }
            else {
                // createMessage(player.x - 100, player.y - 270,config.width / 2, config.height / 2 + 70, 'Du hast noch nicht \ngenug Karrotten gesammelt!');
                level1Scene.createMessage(config.width / 2, config.height / 2 + 70, 'Du hast noch nicht \ngenug Karrotten gesammelt!');
                // this.add.text(config.width / 2, config.height / 2 + 70, 'Du hast noch nicht genug Karrotten gesammelt!', {
                //     fontSize: 32,
                //     color: '#ffffff',
                //     align: 'center'
                // }).setShadow(4, 4, '#000000', 2, false, true).setOrigin(0.5);
            }
        }
        displayHealthCarrots(health, countCarrots, neededCarrots)
    }
    // plant.disableBody(true, true);

}


function collectCarrots(player, carrot, neededCarrots) {
    carrot.disableBody(true, true);

    //  Add and update the Health
    countCarrots += 1;
    displayHealthCarrots(health, countCarrots, neededCarrots)

    // if(countCarrots >= neededCarrots){
    //     countCarrots = 0;
    //
    //     // switchLevelScene();
    //
    //     // if(this.scene.key === 'level1'){
    //     //     level2able = true;
    //     //     this.scene.start('level2');
    //     // }
    //     // else if(this.scene.key === 'level2'){
    //     //     this.scene.start('winScreen');
    //     // }
    // }

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


/* https://github.com/digitherium/phaserplatformerseries/blob/main/9_moving_baddies.html on line 125 */
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

