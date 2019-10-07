
const {Base} = require('../index.js'),
	assert = require('assert');

const rand = (n) => Math.floor(Math.random() * n);

const run = (map, base) => {
	for (let i in map) {
		let a = base.encode(Buffer.from(map[i][0]), true),
			b = base.decode(a).toString();
		assert.equal(map[i][0], b);
		assert.equal(map[i][1], a);
	}
	for (let i = 0; i < 100; i++) {
		let data = '';
		[map[rand(map.length)], map[rand(map.length)], map[rand(map.length)]].forEach((res) => {
			data += res[0];
		});
		let a = base.encode(Buffer.from(data), true),
			b = base.decode(a).toString();
		assert.equal(data, b);
	}
};

run([
	['', ''],
	['f', 'MY======'],
	['fo', 'MZXQ===='],
	['foo', 'MZXW6==='],
	['foob', 'MZXW6YQ='],
	['fooba', 'MZXW6YTB'],
	['foobar', 'MZXW6YTBOI======']
], new Base('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567', 40));

run([
	['', ''],
	['f', 'Zg=='],
	['fo', 'Zm8='],
	['foo', 'Zm9v'],
	['foob', 'Zm9vYg=='],
	['fooba', 'Zm9vYmE='],
	['foobar', 'Zm9vYmFy']
], new Base('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_', 24));

run([
	['', ''],
	['f', '66'],
	['fo', '666F'],
	['foo', '666F6F'],
	['foob', '666F6F62'],
	['fooba', '666F6F6261'],
	['foobar', '666F6F626172']
], new Base('0123456789ABCDEF'));
