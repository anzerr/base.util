
const Base = require('./src/base.js');

module.exports = {
	b2: new Base('01'),
	b8: new Base('01234567'),
	b11: new Base('0123456789a'),
	b16: new Base('0123456789abcdef'),
	b32: new Base('0123456789ABCDEFGHJKMNPQRSTVWXYZ'),
	b36: new Base('0123456789abcdefghijklmnopqrstuvwxyz'),
	b58: new Base('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'),
	b62: new Base('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
	b64: new Base('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
	b66: new Base('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.!~'),
	Base: Base
};
