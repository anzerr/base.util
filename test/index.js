
let {Base, b58} = require('../index.js');
let tests = require('./tests.json'),
	assert = require('assert');

let bases = Object.keys(tests.alphabets).reduce((bases, alphabetName) => {
	bases[alphabetName] = new Base(tests.alphabets[alphabetName]);
	return bases;
}, {});

assert.equal(Buffer.isBuffer(bases.base2.decode('')), true);
assert.equal(Buffer.isBuffer(bases.base2.decode('01')), true);

tests.valid.forEach((f) => {
	let base = bases[f.alphabet];
	let actual = base.encode(Buffer.from(f.hex, 'hex'));
	assert.equal(base.toString(actual), f.string);
});

tests.valid.forEach((f) => {
	let base = bases[f.alphabet];
	let actual = base.decode(f.string).toString('hex');
	assert.equal(actual, f.hex);
});

tests.invalid.forEach((f) => {
	let base = bases[f.alphabet];

	try {
		if (!base) {
			base = new Base(f.alphabet);
		}
		base.decode(f.string);
	} catch (e) {
		assert.notEqual(e.toString().match(new RegExp(f.exception)), null);
		return;
	}
	throw new Error('should of failed');
});

(() => {
	try {
		bases.base58.encode('a');
	} catch (e) {
		assert.notEqual(e.toString().match('Expected Buffer'), null);
		return;
	}
	throw new Error('should of failed');
})();

(() => {
	const hex = '003c176e659bea0f29a3e9bf7880c112b1b31b4dc826268187';
	const bytes = Buffer.from(hex, 'hex');
	const address = b58.encode(bytes);
	assert.equal(Buffer.isBuffer(address), true);
	assert.equal(b58.toString(address), '16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS');
	assert.equal(b58.decode(b58.toString(address)).toString('hex'), hex);
})();
