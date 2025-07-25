export type DJB2aAcceptDataType =
	| string
	| BigUint64Array
	| Uint8Array
	| Uint16Array
	| Uint32Array;
/**
 * Get the non-cryptographic hash of the data with algorithm DJB2a (32 bits).
 */
export class DJB2a {
	get [Symbol.toStringTag](): string {
		return "DJB2a";
	}
	#freezed: boolean = false;
	#hashHex: string | null = null;
	#hashUint8Array: Uint8Array | null = null;
	#bin: bigint = 5381n;
	/**
	 * Initialize.
	 * @param {DJB2aAcceptDataType} [data] Data. Can append later via the method {@linkcode DJB2a.update} and {@linkcode DJB2a.updateFromStream}.
	 */
	constructor(data?: DJB2aAcceptDataType) {
		if (typeof data !== "undefined") {
			this.update(data);
		}
	}
	/**
	 * Whether the instance is freezed.
	 * @returns {boolean}
	 */
	get freezed(): boolean {
		return this.#freezed;
	}
	/**
	 * Freeze the instance to prevent any further update.
	 * @returns {this}
	 */
	freeze(): this {
		this.#freezed = true;
		return this;
	}
	/**
	 * Get the non-cryptographic hash of the data, in Uint8Array.
	 * @returns {Uint8Array}
	 */
	hash(): Uint8Array {
		return this.hashUint8Array();
	}
	/**
	 * Get the non-cryptographic hash of the data, in hexadecimal with padding.
	 * @returns {string}
	 */
	hashHex(): string {
		this.#hashHex ??= BigInt.asUintN(32, this.#bin).toString(16).toUpperCase().padStart(8, "0");
		if (this.#hashHex.length !== 8) {
			throw new Error(`Unexpected hash hex result \`${this.#hashHex}\`! Please submit a bug report.`);
		}
		return this.#hashHex;
	}
	/**
	 * Get the non-cryptographic hash of the data, in Uint8Array.
	 * @returns {Uint8Array}
	 */
	hashUint8Array(): Uint8Array {
		if (this.#hashUint8Array === null) {
			const hex: string = this.hashHex();
			const hexFmt: string = (hex.length % 2 === 0) ? hex : `0${hex}`;
			const bytes: string[] = [];
			for (let index: number = 0; index < hexFmt.length; index += 2) {
				bytes.push(hexFmt.slice(index, index + 2));
			}
			this.#hashUint8Array = Uint8Array.from(bytes.map((byte: string): number => {
				return Number.parseInt(byte, 16);
			}));
		}
		return Uint8Array.from(this.#hashUint8Array);
	}
	/**
	 * Append data.
	 * @param {DJB2aAcceptDataType} data Data.
	 * @returns {this}
	 */
	update(data: DJB2aAcceptDataType): this {
		if (this.#freezed) {
			throw new Error(`Instance is freezed!`);
		}
		this.#hashHex = null;
		this.#hashUint8Array = null;
		const dataFmt: string = (typeof data === "string") ? data : new TextDecoder().decode(data);
		for (let index: number = 0; index < dataFmt.length; index += 1) {
			this.#bin = this.#bin * 33n ^ BigInt(dataFmt.charCodeAt(index));
		}
		return this;
	}
	/**
	 * Append data from the readable stream.
	 * @param {ReadableStream<DJB2aAcceptDataType>} stream Data from the readable stream.
	 * @returns {Promise<this>}
	 */
	async updateFromStream(stream: ReadableStream<DJB2aAcceptDataType>): Promise<this> {
		const reader: ReadableStreamDefaultReader<DJB2aAcceptDataType> = stream.getReader();
		let done: boolean = false;
		let textDecoder: TextDecoder | undefined;
		while (!done) {
			const {
				done: end,
				value
			}: ReadableStreamReadResult<DJB2aAcceptDataType> = await reader.read();
			done = end;
			if (typeof value === "undefined") {
				continue;
			}
			if (typeof value === "string") {
				this.update(value);
			} else {
				textDecoder ??= new TextDecoder();
				this.update(textDecoder.decode(value, { stream: !done }));
			}
		}
		return this;
	}
}
export default DJB2a;
