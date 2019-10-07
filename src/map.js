
const is = require('type.util');

class Map {

	constructor(alphabet, pad = 0) {
		if (alphabet.length >= 255) {
			throw new Error('alphabet too long');
		}
		this.alphabet = Buffer.isBuffer(alphabet) ? alphabet : Buffer.from(alphabet);
		this.map = {};
		for (let i = 0; i < this.alphabet.length; i++) {
			if (this.map[this.alphabet[i]]) {
				throw new Error(`"${String.fromCharCode(this.alphabet[i])}" is ambiguous`);
			}
			this.map[this.alphabet[i]] = i;
		}
		this.base = this.alphabet.length;
		this.leader = String.fromCharCode(this.alphabet[0]);
		this.bits = Math.floor(Math.log(this.base) / Math.log(2));
		this.factor = Math.log(this.base) / Math.log(256);
		this.ifactor = Math.log(256) / Math.log(this.base);
		this.pad = pad;
	}

	getPad(n) {
		const pad = (this.pad) ? Math.max(0, Math.floor((this.pad * (Math.ceil(n / this.pad)) - n) / this.bits)) : 0;
		return pad ? '='.repeat(pad) : '';
	}

	toString(buffer) {
		if (!Buffer.isBuffer(buffer)) {
			throw new Error(`Expected Buffer got "${typeof buffer}"`);
		}
		let str = '';
		for (let i = 0; i < buffer.length; i++) {
			if (!is.defined(this.alphabet[buffer[i]])) {
				throw new Error(`Non-base "${this.base}" character`);
			}
			str += String.fromCharCode(this.alphabet[buffer[i]]);
		}
		return str;
	}

}

module.exports = Map;
