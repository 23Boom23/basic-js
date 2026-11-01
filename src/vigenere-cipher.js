const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  process(message, key, direction) {
    if (message === undefined || key === undefined) {
      throw new Error('Incorrect arguments!');
    }
    const upperMessage = message.toUpperCase();
    const upperKey = key.toUpperCase();
    let keyIndex = 0;
    let result = '';
    for (const character of upperMessage) {
      if (!/[A-Z]/.test(character)) {
        result += character;
        continue;
      }
      const letter = character.charCodeAt(0) - 65;
      const shift = upperKey.charCodeAt(keyIndex % upperKey.length) - 65;
      result += String.fromCharCode(65 + (letter + direction * shift + 26) % 26);
      keyIndex += 1;
    }
    return this.direct ? result : [...result].reverse().join('');
  }

  encrypt(message, key) {
    return this.process(message, key, 1);
  }

  decrypt(message, key) {
    return this.process(message, key, -1);
  }
}

module.exports = {
  VigenereCipheringMachine
};
