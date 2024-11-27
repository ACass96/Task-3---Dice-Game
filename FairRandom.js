const crypto = require('crypto');

class FairRandom {
    static generateKey() {
        // Generar una clave criptográficamente segura de al menos 256 bits (32 bytes)
        return crypto.randomBytes(32).toString('hex');
    }

    static generateNumber(min, max) {
        // Generar un número uniforme entre min y max
        const range = max - min + 1;
        const randomBuffer = crypto.randomBytes(4);
        const randomInt = randomBuffer.readUInt32BE() % range;
        return min + randomInt;
    }

    static generateHMAC(key, message) {
        // Calcular HMAC usando SHA3-256
        return crypto.createHmac('sha3-256', key).update(message).digest('hex');
    }

    static verifyHMAC(key, message, hmac) {
        // Verificar que un HMAC coincide con los valores originales
        const computedHMAC = FairRandom.generateHMAC(key, message);
        return computedHMAC === hmac;
    }
}

module.exports = FairRandom;
