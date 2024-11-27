const Dice = require("./Dice");
const ProbabilityTable = require("./ProbabilityTable");
const FairRandom = require("./FairRandom");
const Menu = require("./Menu");
const RollResult = require("./RollResult");
const DiceConfigParser = require("./DiceConfigParser");

class Game {
    constructor(diceConfigs) {
        this.diceConfigs = diceConfigs;
        // Asegurarse de crear instancias de la clase Dice
        this.diceArray = DiceConfigParser.parse(diceConfigs).map(config => new Dice(config));
        this.menu = new Menu();
    }

    async start() {
        let playing = true;

        while (playing) {
            const choice = await this.menu.displayMenu();

            switch (choice) {
                case "1":
                    await this.playTurn();
                    break;
                case "2":
                    this.displayProbabilityTable();
                    break;
                case "3":
                    console.log("Exiting the game. Thanks for playing!");
                    this.menu.close();
                    playing = false;
                    break;
                default:
                    console.log("Invalid choice. Please try again.");
                    break;
            }
        }
    }

    async playTurn() {
        console.log("Your turn!");
        this.diceArray.forEach((die, index) => {
            console.log(`${index + 1}: ${die.toString()}`);
        });

        const choice = await this.menu.getUserInput("Choose a die (1, 2, ...): ");
        const userIndex = parseInt(choice.trim()) - 1;

        if (userIndex < 0 || userIndex >= this.diceArray.length) {
            console.log("Invalid die choice. Try again.");
            return;
        }

        const userDie = this.diceArray[userIndex];
        const userRoll = this.rollDie(userDie);
        const userResult = new RollResult(userDie, userRoll);
        console.log(userResult.toString());

        console.log("Computer's turn!");
        const computerIndex = Math.floor(Math.random() * this.diceArray.length);
        const computerDie = this.diceArray[computerIndex];
        console.log(`Computer chose die ${computerIndex + 1}: ${computerDie.toString()}`);
        const computerRoll = this.rollDie(computerDie);
        console.log(`Computer rolled: ${computerRoll}`);

        if (userRoll > computerRoll) {
            console.log("You win!");
        } else if (userRoll < computerRoll) {
            console.log("Computer wins!");
        } else {
            console.log("It's a tie!");
        }
    }

    rollDie(die) {
        return die.roll();
    }

    displayProbabilityTable() {
        console.log("=== Probability Table ===");
        const table = new ProbabilityTable(this.diceArray);
        table.generate();
        console.log(table.toString());
    }
}

module.exports = Game;
