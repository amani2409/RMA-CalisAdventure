function createMessage(scene, x, y, width, height, text) {
    const bubbleWidth = width;
    const bubbleHeight = height;
    const bubblePadding = 10;

    const bubble = scene.add.graphics({x:x, y:y});

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

    const content = scene.add.text(0, 0, text, {
        fontFamily: 'Arial',
        fontSize: 20,
        color: '#000000',
        align: 'center',
        wordWrap: {width: bubbleWidth - (bubblePadding * 2)}
    });

    const b = content.getBounds();
    content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));

    bubble.setScrollFactor(0);
    content.setScrollFactor(0);

        scene.time.delayedCall(2000, function () {
            bubble.destroy();
            content.destroy();
    }, [], this);
}

