
const Map = require('../map.js'),
	is = require('type.util');

class Base {

	constructor(alphabet, pad) {
		this.map = new Map(alphabet, pad);
	}

	encode(source, toString = false) {
		if (!Buffer.isBuffer(source)) {
			throw new Error('Expected Buffer');
		}
		if (source.length === 0) {
			return (toString) ? '' : Buffer.alloc(0);
		}
		let binary = '';
		for (let i = 0; i < source.length; i++) {
			binary += source[i].toString(2).padStart(8, '0');
		}
		const pad = this.map.getPad(binary.length);
		binary = binary.match(new RegExp(`\\d{1,${this.map.bits}}`, 'g'));
		for (let i in binary) {
			binary[i] = parseInt(binary[i].padEnd(this.map.bits, '0'), 2);
		}

		if (toString) {
			return `${this.map.toString(Buffer.from(binary))}${pad}`;
		}
		return Buffer.from(binary);
	}

	decode(source) {
		if (!is.string(source)) {
			throw new Error('Expected String');
		}
		if (source.length === 0) {
			return Buffer.alloc(0);
		}
		if (source[0] === ' ') {
			throw new Error(`Non-base "${this.map.base}" character`);
		}
		let binary = '';
		for (let i = 0; i < source.length; i++) {
			if (source[i] === '=') {
				binary += '0'.repeat(this.map.bits);
			} else {
				let carry = this.map.map[source.charCodeAt(i)];
				if (carry === 255 || !is.defined(carry)) {
					throw new Error(`Non-base "${this.map.base}" character`);
				}
				binary += carry.toString(2).padStart(this.map.bits, '0');
			}
		}

		binary = binary.match(/\d{1,8}/g);
		const out = [];
		for (let i in binary) {
			let o = parseInt(binary[i].padEnd(8, '0'), 2);
			if (o !== 0) {
				out.push(o);
			}
		}
		return Buffer.from(out);
	}

}

module.exports = Base;
