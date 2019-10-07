
### `Intro`
![GitHub Actions status | linter](https://github.com/anzerr/base.util/workflows/linter/badge.svg)
![GitHub Actions status | publish](https://github.com/anzerr/base.util/workflows/publish/badge.svg)
![GitHub Actions status | test](https://github.com/anzerr/base.util/workflows/test/badge.svg)

base encoding / decoding of any given alphabet for bitcoin style leading zero compression and [rfc4648](https://tools.ietf.org/html/rfc4648)

#### `Install`
``` bash
npm install --save git+https://github.com/anzerr/base.util.git
npm install --save @anzerr/base.util
```

### `Example`
``` javascript
const {bc58, b32, Compress, Base} = require('base.util');

const address = '003c176e659bea0f29a3e9bf7880c112b1b31b4dc826268187';

console.log(bc58.encode(Buffer.from(address, 'hex'), true)) // 16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS

console.log(b32.encode(Buffer.from('foobar'), true)); // MZXW6YTBOI======
console.log(b32.encode(Buffer.from('foobar'))); // <Buffer 0c 19 17 16 1e 18 13 01 0e 08>

const base32 = (data, toString = true) => {
	let handle = new Base('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567', 40); // alphabet, pad size
	return handle.encode(Buffer.from(data), toString);
}

console.log(base32('fooba')) // MZXW6YTB

let bitcoin58 = new Compress('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');

console.log(bc58.encode(Buffer.from(address, 'hex'), true)) // 16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS
```