
class Map {

	constructor(alphabet) {
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
		this.factor = Math.log(this.base) / Math.log(256);
		this.ifactor = Math.log(256) / Math.log(this.base);
	}

}

module.exports = Map;
