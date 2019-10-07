
const Compress = require('./src/base/compress.js'),
	Base = require('./src/base/base.js');

module.exports = {
	bc2: new Compress('01'),
	bc8: new Compress('01234567'),
	bc11: new Compress('0123456789a'),
	bc16: new Compress('0123456789abcdef'),
	bc32: new Compress('0123456789ABCDEFGHJKMNPQRSTVWXYZ'),
	bc36: new Compress('0123456789abcdefghijklmnopqrstuvwxyz'),
	bc58: new Compress('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'),
	bc62: new Compress('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
	bc64: new Compress('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
	bc66: new Compress('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.!~'),
	b16: new Base('0123456789ABCDEF'),
	b32: new Base('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567', 40),
	b64: new Base('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_', 24),
	Compress: Compress,
	Base: Base
};
