class ProbabilityTable {
    constructor(diceArray) {
        this.diceArray = diceArray;
        this.probabilities = [];
    }

    generate() {
        const length = this.diceArray.length;
        this.probabilities = Array.from({ length }, () => Array(length).fill(0));

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                if (i !== j) {
                    this.probabilities[i][j] = this.calculateProbability(this.diceArray[i], this.diceArray[j]);
                }
            }
        }
    }

    calculateProbability(die1, die2) {
        const outcomes = [];
        for (const roll1 of die1.values) {
            for (const roll2 of die2.values) {
                outcomes.push(roll1 > roll2 ? 1 : roll1 < roll2 ? -1 : 0);
            }
        }
        const wins = outcomes.filter((result) => result === 1).length;
        const total = outcomes.length;
        return ((wins / total) * 100).toFixed(2);
    }

    toString() {
        const headers = this.diceArray.map((_, i) => `Die #${i + 1}`).join(" | ");
        let output = `         | ${headers}\n`;
        output += `---------|${"-".repeat(headers.length + 1)}\n`;

        this.probabilities.forEach((row, i) => {
            const rowValues = row.map((value) => `${value}%`.padEnd(10)).join(" | ");
            output += `Die #${i + 1} | ${rowValues}\n`;
        });

        return output;
    }
}
module.exports = ProbabilityTable;