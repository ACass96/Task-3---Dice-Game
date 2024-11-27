class Menu {
    constructor() {
        this.rl = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    async getUserInput(prompt) {
        return new Promise((resolve) => this.rl.question(prompt, resolve));
    }

    async displayMenu() {
        console.log("=== Dice Game Menu ===");
        console.log("1. Choose a die to roll");
        console.log("2. Show probabilities");
        console.log("3. Exit");
        const choice = await this.getUserInput("Enter your choice: ");
        return choice.trim();
    }

    close() {
        this.rl.close();
    }
}

module.exports = Menu;
