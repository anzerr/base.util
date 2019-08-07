
### `Intro`
base encoding / decoding of any given alphabet

#### `Install`
``` bash
npm install --save git+https://github.com/anzerr/base.util.git
npm install --save @anzerr/base.util
```

### `Example`
``` javascript
	const b58 = require('base.util');
	console.log(b58.encode(Buffer.from('003c176e659bea0f29a3e9bf7880c112b1b31b4dc826268187', 'hex'), true)) // 16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS
```