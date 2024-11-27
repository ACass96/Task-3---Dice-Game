const Game = require("./Game");

const diceConfigs = process.argv.slice(2);

if (diceConfigs.length < 3) {
    console.error("You must provide at least 3 dice configurations!");
    console.error(
        'Example: node index.js "1,2,3,4,5,6" "6,5,4,3,2,1" "3,3,3,3,3,3"'
    );
    process.exit(1);
}

const game = new Game(diceConfigs);
game.start();
