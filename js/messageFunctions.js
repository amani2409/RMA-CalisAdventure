
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

function createMessage(width, height, text) {
    const bubbleWidth = width;
    const bubbleHeight = height;
    const bubblePadding = 10;

    const bubble = this.add.graphics({x: 800, y: 600});

    // Bubble shadow
    bubble.fillStyle(0x222222, 0.5);
    bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

    // Bubble color
    bubble.fillStyle(0xffffff, 1);

    // Bubble outline line style
    bubble.lineStyle(4, 0x565656, 1);

    // Bubble shape and outline (without arrow)
    bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    const content = this.add.text(0, 0, text, {
        fontFamily: 'Arial',
        fontSize: 20,
        color: color,
        align: 'center',
        wordWrap: {width: bubbleWidth - (bubblePadding * 2)}
    });


    //
    const b = content.getBounds();
    content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));

    bubble.setScrollFactor(0);
    content.setScrollFactor(0);
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


