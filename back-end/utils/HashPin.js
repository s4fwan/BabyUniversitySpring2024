const crypto = require('crypto');
const bcrypt = require('bcryptjs');

async function hashPin(pin) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPin = await bcrypt.hash(pin, salt);
        return hashPin; 
    } catch (error) {
        console.log(error);
    }
}

module.exports = hashPin;