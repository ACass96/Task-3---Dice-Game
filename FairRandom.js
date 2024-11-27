const crypto = require('crypto');

class FairRandom {
    static generateKey() {
        return crypto.randomBytes(32).toString('hex');
    }

    static generateNumber(min, max) {
        const range = max - min + 1;
        const randomBuffer = crypto.randomBytes(4);
        const randomInt = randomBuffer.readUInt32BE() % range;
        return min + randomInt;
    }

    static generateHMAC(key, message) {
        return crypto.createHmac('sha3-256', key).update(message).digest('hex');
    }

    static verifyHMAC(key, message, hmac) {
        const computedHMAC = FairRandom.generateHMAC(key, message);
        return computedHMAC === hmac;
    }
}

module.exports = FairRandom;
