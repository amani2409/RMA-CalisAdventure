
function getHover(text) {
    text.on('pointerover', function (pointer) {
        text.setScale(1.2);
    });

    text.on('pointerout', function (pointer) {
        text.setScale(1);
    });
}

