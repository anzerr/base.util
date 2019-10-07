
declare class Map {

	base: number;
	leader: string;
	bits: number;
	factor: number;
	ifactor: number;
	pad: number;
	constructor(alphabet: string, pad?: number);
	getPad(n: number): string;
	toString(buffer: Buffer): string;

}

declare class Base {

	map: Map;
    constructor(alphabet: string, pad?: number);
	encode(source: Buffer, toString?: boolean): string | Buffer;
	decode(source: string): Buffer;

}

export {
	bc2: Base,
	bc8: Base,
	bc11: Base,
	bc16: Base,
	bc32: Base,
	bc36: Base,
	bc58: Base,
	bc62: Base,
	bc64: Base,
	bc66: Base,
	b16: Base,
	b32: Base,
	Compress: Base,
	Base: Base
};