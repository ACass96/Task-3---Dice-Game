class DiceConfigParser {
    static parse(diceConfigs) {
        const diceArray = [];

        diceConfigs.forEach((config) => {
            const values = config.split(",").map(Number);
            if (values.length !== 6 || values.some(isNaN)) {
                throw new Error(`Invalid dice configuration: ${config}`);
            }
            diceArray.push(values);
        });

        return diceArray;
    }
}

module.exports = DiceConfigParser;
