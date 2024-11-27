class Dice {
    constructor(values) {
        if (values.length !== 6) {
            throw new Error("Each dice must have exactly 6 values.");
        }
        if (!values.every(value => Number.isInteger(value) && value > 0)) {
            throw new Error("All dice values must be positive integers.");
        }
        this.values = values;
    }

    roll() {
        const index = Math.floor(Math.random() * 6);
        return this.values[index];
    }

    toString() {
        return this.values.join(", "); // Usamos this.values en lugar de this.sides
    }
}

module.exports = Dice;
