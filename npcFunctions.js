function showBunnyNPCSpeechbubble(player, figure) {

    if (figure === daisy && !daisy.speechbubbleShown) {
        level1Scene.createSpeechBubble(bunnyNPC.x - 150, bunnyNPC.y - 270, 200, 200, 'Das ist Daisy.Daisy kannst du mit Q essen und gibt dir Leben.', false, daisy);
        daisy.speechbubbleShown = true;
    }
    if (figure === fox && fox.speechbubbleShown === false) {
        level1Scene.createSpeechBubble(bunnyNPC.x - 150, bunnyNPC.y - 270, 100, 160, 'Vorsicht! Fox ist da, berühre ihn nicht! Du musst mit der Zeit lernen, ob du angreifen darfst oder lieber ausweichen solltest', true);
        fox.speechbubbleShown = true;
    }

    if (figure === dandelion && dandelion.speechbubbleShown === false) {
        level1Scene.createSpeechBubble(bunnyNPC.x - 150, bunnyNPC.y - 270, 100, 160, 'Das ist Dandelion. Dandelion kannst du mit Q essen und gibt dir Leben.', false);
        dandelion.speechbubbleShown = true;
    }

    if (figure === tulip && tulip.speechbubbleShown === false) {
        level1Scene.createSpeechBubble(bunnyNPC.x - 150, bunnyNPC.y - 270, 100, 160, 'Die Tulpe solltest du nicht essen, die ist giftig! Lauf einfach weiter', false);
        tulip.speechbubbleShown = true;
    }
}