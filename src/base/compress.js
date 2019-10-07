
const Map = require('../map.js'),
	is = require('type.util');

class Compress {

	constructor(alphabet) {
		this.map = new Map(alphabet);
	}

	encode(source, toString = false) {
		if (!Buffer.isBuffer(source)) {
			throw new Error('Expected Buffer');
		}
		if (source.length === 0) {
			return Buffer.alloc(0);
		}
		let zeroes = 0, length = 0, pbegin = 0, pend = source.length;
		while (pbegin !== pend && source[pbegin] === 0) {
			pbegin++;
			zeroes++;
		}
		let size = ((pend - pbegin) * this.map.ifactor + 1) >>> 0, b58 = Buffer.alloc(size);
		while (pbegin !== pend) {
			let carry = source[pbegin];
			let i = 0;
			for (let it1 = size - 1; (carry !== 0 || i < length) && (it1 !== -1); it1--, i++) {
				carry += (256 * b58[it1]) >>> 0;
				b58[it1] = (carry % this.map.base) >>> 0;
				carry = (carry / this.map.base) >>> 0;
			}
			if (carry !== 0) {
				throw new Error('Non-zero carry');
			}
			length = i;
			pbegin++;
		}

		let it2 = size - length;
		while (it2 !== size && b58[it2] === 0) {
			it2++;
		}
		let out = Buffer.alloc((size - it2) + zeroes), i = 0;
		for (; i < zeroes; i++) {
			out[i] = 0;
		}
		for (; it2 < size; ++it2) {
			out[i] = b58[it2];
			i++;
		}
		if (toString) {
			return this.map.toString(out);
		}
		return out;
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
		let psz = 0, zeroes = 0, length = 0;
		while (source[psz] === this.map.leader) {
			zeroes++;
			psz++;
		}
		let size = (((source.length - psz) * this.map.factor) + 1) >>> 0, b256 = Buffer.alloc(size);
		while (source[psz]) {
			let carry = this.map.map[source.charCodeAt(psz)];
			if (carry === 255 || !is.defined(carry)) {
				throw new Error(`Non-base "${this.map.base}" character`);
			}
			let i = 0;
			for (let it3 = size - 1; (carry !== 0 || i < length) && (it3 !== -1); it3--, i++) {
				carry += (this.map.base * b256[it3]) >>> 0;
				b256[it3] = (carry % 256) >>> 0;
				carry = (carry / 256) >>> 0;
			}
			if (carry !== 0) {
				throw new Error('Non-zero carry');
			}
			length = i;
			psz++;
		}
		if (source[psz] === ' ') {
			throw new Error(`Non-base "${this.map.base}" character`);
		}
		let it4 = size - length;
		while (it4 !== size && b256[it4] === 0) {
			it4++;
		}
		let vch = Buffer.alloc(zeroes + (size - it4));
		let j = zeroes;
		while (it4 !== size) {
			vch[j++] = b256[it4++];
		}
		return vch;
	}

}

module.exports = Compress;
