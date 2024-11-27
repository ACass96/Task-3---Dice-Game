class ProbabilityCalculator {
    static calculateProbabilities(dice) {
        const probabilities = [];
        for (let i = 0; i < dice.length; i++) {
            for (let j = 0; j < dice.length; j++) {
                if (i !== j) {
                    const prob = ProbabilityCalculator.compareDice(
                        dice[i],
                        dice[j]
                    );
                    probabilities.push({
                        dice1: i + 1,
                        dice2: j + 1,
                        probability: prob,
                    });
                }
            }
        }
        return probabilities;
    }

    static compareDice(die1, die2) {
        let wins1 = 0,
            wins2 = 0;
        die1.values.forEach((value1) => {
            die2.values.forEach((value2) => {
                if (value1 > value2) wins1++;
                if (value1 < value2) wins2++;
            });
        });
        const totalComparisons = die1.values.length * die2.values.length;
        return {
            die1Wins: (wins1 / totalComparisons) * 100,
            die2Wins: (wins2 / totalComparisons) * 100,
        };
    }
}

module.exports = ProbabilityCalculator;