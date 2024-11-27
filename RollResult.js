class RollResult {
    constructor(die, roll) {
        this.die = die;
        this.roll = roll;
    }

    toString() {
        return `You rolled: ${this.roll}`;
    }
}

module.exports = RollResult;
