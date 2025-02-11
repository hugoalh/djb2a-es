export type DJB2aAcceptDataType = string | BigUint64Array | Uint8Array | Uint16Array | Uint32Array;
/**
 * Get the non-cryptographic hash of the data with algorithm DJB2a (32 bits).
 */
export class DJB2a {
	get [Symbol.toStringTag](): string {
		return "DJB2a";
	}
	#freezed: boolean = false;
	#hash: bigint | null = null;
	#bin: bigint = 5381n;
	/**
	 * Initialize.
	 * @param {DJB2aAcceptDataType} [data] Data. Can append later via the method {@linkcode DJB2a.update}.
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
	 * Get the non-cryptographic hash of the data, in original format.
	 * @returns {bigint}
	 */
	hash(): bigint {
		if (this.#hash === null) {
			this.#hash = BigInt.asUintN(32, this.#bin);
		}
		return this.#hash;
	}
	/**
	 * Get the non-cryptographic hash of the data, in Base16.
	 * @returns {string}
	 */
	hashBase16(): string {
		return this.hashBigInt().toString(16).toUpperCase();
	}
	/**
	 * Get the non-cryptographic hash of the data, in Base32Hex ({@link https://datatracker.ietf.org/doc/html/rfc4648#section-7 RFC 4648 §7}).
	 * @returns {string}
	 */
	hashBase32Hex(): string {
		return this.hashBigInt().toString(32).toUpperCase();
	}
	/**
	 * Get the non-cryptographic hash of the data, in Base36.
	 * @returns {string}
	 */
	hashBase36(): string {
		return this.hashBigInt().toString(36).toUpperCase();
	}
	/**
	 * Get the non-cryptographic hash of the data, in big integer.
	 * @returns {bigint}
	 */
	hashBigInt(): bigint {
		return this.hash();
	}
	/**
	 * Get the non-cryptographic hash of the data, in big integer.
	 * @returns {bigint}
	 */
	hashBigInteger: () => bigint = this.hashBigInt;
	/**
	 * Get the non-cryptographic hash of the data, in hex/hexadecimal without padding.
	 * @returns {string}
	 */
	hashHex(): string {
		return this.hashBase16();
	}
	/**
	 * Get the non-cryptographic hash of the data, in hex/hexadecimal with padding.
	 * @returns {string}
	 */
	hashHexPadding(): string {
		return this.hashHex().padStart(8, "0");
	}
	/**
	 * Get the non-cryptographic hash of the data, in number.
	 * @returns {number}
	 */
	hashNumber(): number {
		return Number(this.hash());
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
		this.#hash = null;
		const raw: string = (typeof data === "string") ? data : new TextDecoder().decode(data);
		for (let index: number = 0; index < raw.length; index += 1) {
			this.#bin = this.#bin * 33n ^ BigInt(raw.charCodeAt(index));
		}
		return this;
	}
	/**
	 * Initialize from the readable stream.
	 * @param {ReadableStream<DJB2aAcceptDataType>} stream Readable stream.
	 * @returns {Promise<DJB2a>}
	 */
	static async fromStream(stream: ReadableStream<DJB2aAcceptDataType>): Promise<DJB2a> {
		const instance: DJB2a = new this();
		for await (const chunk of stream) {
			instance.update(chunk);
		}
		return instance;
	}
}
export default DJB2a;
