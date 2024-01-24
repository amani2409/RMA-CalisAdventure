function showBunnyNPCSpeechbubble(player, figure) {

    if (figure === daisy && !daisy.speechbubbleShown) {
        level1Scene.createSpeechBubble(bunnyNPC.x - 150, bunnyNPC.y - 270, 200, 200, 'Das ist Daisy.Daisy kannst du mit Q essen und gibt dir Leben.', false, true);
        daisy.speechbubbleShown = true;
    }
    if (figure === fox && !fox.speechbubbleShown) {
        level1Scene.createSpeechBubble(bunnyNPC.x - 150, bunnyNPC.y - 350, 300, 160, 'Vorsicht! Fox ist da, berühre ihn nicht! Du musst mit der Zeit lernen, ob du angreifen darfst oder lieber ausweichen solltest', true, true);
        fox.speechbubbleShown = true;
    }

    if (figure === dandelion && !dandelion.speechbubbleShown) {
        level1Scene.createSpeechBubble(bunnyNPC.x - 150, bunnyNPC.y - 270, 100, 160, 'Das ist Dandelion. Dandelion kannst du mit Q essen und gibt dir Leben.', false, true);
        dandelion.speechbubbleShown = true;
    }

    if (figure === tulip && !tulip.speechbubbleShown) {
        level1Scene.createSpeechBubble(bunnyNPC.x - 150, bunnyNPC.y - 270, 100, 160, 'Die Tulpe solltest du nicht essen, die ist giftig! Lauf einfach weiter', false, true);
        tulip.speechbubbleShown = true;
    }
}

// function showTextOnly(message){
//     this.time.delayedCall(2000, function () {
//     this.scene.pause();
//     }, [], this);
//
//     var infoMessage = this.add.text(config.width / 2, config.height / 2, message, {
//         fontSize: 32,
//         color: '#ffffff',
//         align: 'center'
//     }).setShadow(4, 4, '#000000', 2, false, true).setOrigin(0.5);
//
//     // infoMessage.setScrollFactor(0);
//
//     this.time.delayedCall(2000, function () {
//         // infoMessage.destroy();
//         this.scene.resume();
//     }, [], this);
// }


level1Scene.createSpeechBubble = function (x, y, width, height, quote, alert, bunnyNPC) {

    const bubbleWidth = width;
    const bubbleHeight = height;
    const bubblePadding = 10;
    const arrowHeight = bubbleHeight / 4;

    const bubble = this.add.graphics({x: x, y: y});


    //  Bubble shadow
    bubble.fillStyle(0x222222, 0.5);
    bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

    //  Bubble color
    bubble.fillStyle(0xffffff, 1);

    //  Bubble outline line style
    bubble.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    //  Calculate arrow coordinates
    const point1X = Math.floor(bubbleWidth / 7);
    const point1Y = bubbleHeight;
    const point2X = Math.floor((bubbleWidth / 7) * 2);
    const point2Y = bubbleHeight;
    const point3X = Math.floor(bubbleWidth / 3);
    const point3Y = Math.floor(bubbleHeight + arrowHeight);

    //  Bubble arrow shadow
    bubble.lineStyle(4, 0x222222, 0.5);
    bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

    //  Bubble arrow fill
    bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
    bubble.lineStyle(2, 0x565656, 1);
    bubble.lineBetween(point2X, point2Y, point3X, point3Y);
    bubble.lineBetween(point1X, point1Y, point3X, point3Y);

    var color;
    if (alert) {
        color = '#FF0000FF';
    } else {
        color = '#000000';
    }

    const content = this.add.text(0, 0, quote, {
        fontFamily: 'Arial',
        fontSize: 20,
        color: color,
        align: 'center',
        wordWrap: {width: bubbleWidth - (bubblePadding * 2)}
    });


    //
    const b = content.getBounds();
    content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));


    if (bunnyNPC) {
        bubble.setScrollFactor(0);
        content.setScrollFactor(0);

        // Faden Sie die Speechbubble aus
        var tween = level1Scene.tweens.add({
            targets: [content, bubble],
            alpha: 0,
            ease: 'Linear',
            duration: 3000,
            onComplete: function () {
                // Nach dem Ausfaden, setzen Sie die Alpha zurück und machen Sie die Speechbubble unsichtbar
                [content, bubble].forEach(function (element) {
                    element.setAlpha(1);
                    element.setVisible(false);
                });
            }
        });

        // Setzen Sie die Speechbubble sichtbar, da sie in der Tween-Kette möglicherweise unsichtbar gemacht wurde
        [content, bubble].forEach(function (element) {
            element.setVisible(true);
        });
    }

}