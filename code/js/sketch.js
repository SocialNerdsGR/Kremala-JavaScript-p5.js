const wordsPool = ['test', 'hello', 'thanos'];

let chosenWord = '';
let chosenWordHiddenArray = [];
let triesRemaining = 10;
let hanged;

function preload() {
    hanged = loadImage('img/hanged.png');
}

function setup() {
    textAlign(CENTER);
    createCanvas(windowWidth, windowHeight);
    createButtons();
    chosenWord = random(wordsPool);
    chosenWordHiddenArray = Array(chosenWord.length).fill('_');
}

function draw() {
    background(50, 60, 100);
    drawImage();
    drawWord();
    drawTriesRemaining();
    checkWinLoseCondition();
}

function drawImage() {
    let crop = -1 * 360 * triesRemaining / 10;
    image(hanged, 0, crop, 0, 0, 0, crop);
}

function checkWinLoseCondition() {
    if (triesRemaining == 0) {
        textSize(32);
        fill(255, 10, 10);
        text('You suck!', (windowWidth / 2), 240);
        textSize(20);
        fill(200, 200, 200);
        text(`The correct word was: "${chosenWord}"`, (windowWidth / 2), 280);
        noLoop();
        return;
    }

    for (let c = 0; c < chosenWordHiddenArray.length; c++) {
        if (chosenWordHiddenArray[c] == '_') {
            return;
        }
    }

    textSize(32);
    fill(10, 255, 10);
    text('You rock!', (windowWidth / 2), 240);
    noLoop();
}

function drawWord() {
    textSize(32);
    fill(255, 255, 255);
    text(chosenWordHiddenArray.join('  '), (windowWidth / 2), 100);
}

function drawTriesRemaining() {
    textSize(20);
    fill(255, 10, 10);
    text(`Tries remaining: ${triesRemaining}`, (windowWidth / 2), 160);
}

function createButtons() {
    textSize(20);
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    buttons = createDiv();
    buttons.class('buttons');
    for (let i = 0; i < letters.length; i++) {
        button = createButton(letters[i]);
        button.mouseClicked(() => {buttonClicked(letters[i])});
        buttons.child(button);
    }
}

function buttonClicked(letter) {
    let letterFound = false;
    const chosenWordArray = chosenWord.split('');
    for (let i = 0; i < chosenWordArray.length; i++) {
        if (chosenWordArray[i] == letter) {
            chosenWordHiddenArray[i] = letter;
            letterFound = true;
        }
    }
    if (!letterFound) {
        triesRemaining--;
    }
}
