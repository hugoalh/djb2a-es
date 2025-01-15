const bitClamp: bigint = 2n ** 32n - 1n;
export type DJB2aAcceptDataType = string | BigUint64Array | Uint8Array | Uint16Array | Uint32Array;
/**
 * Get the non-cryptographic hash of the data with algorithm DJB2a.
 */
export class DJB2a {
	#bin: bigint = 5381n;
	#hash: bigint | null = null;
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
	 * Get the non-cryptographic hash of the data, in big integer.
	 * @returns {bigint}
	 */
	hash(): bigint {
		if (this.#hash === null) {
			this.#hash = this.#bin & bitClamp;
		}
		return this.#hash;
	}
	/**
	 * Get the non-cryptographic hash of the data, in Base16.
	 * @returns {string}
	 */
	hashBase16(): string {
		return this.hashNumber().toString(16).toUpperCase();
	}
	/**
	 * Get the non-cryptographic hash of the data, in Base32Hex ({@link https://datatracker.ietf.org/doc/html/rfc4648#section-7 RFC 4648 §7}).
	 * @returns {string}
	 */
	hashBase32Hex(): string {
		return this.hashNumber().toString(32).toUpperCase();
	}
	/**
	 * Get the non-cryptographic hash of the data, in Base36.
	 * @returns {string}
	 */
	hashBase36(): string {
		return this.hashNumber().toString(36).toUpperCase();
	}
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
		this.#hash = null;
		const raw: string = (typeof data === "string") ? data : new TextDecoder().decode(data);
		for (let index: number = 0; index < raw.length; index += 1) {
			this.#bin = this.#bin * 33n ^ BigInt(raw.charCodeAt(index));
		}
		return this;
	}
	/**
	 * Initialize from file, asynchronously.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
	 * >   - *Resources*
	 * @param {string | URL} filePath Path of the file.
	 * @returns {Promise<DJB2a>}
	 */
	static async fromFile(filePath: string | URL): Promise<DJB2a> {
		using file: Deno.FsFile = await Deno.open(filePath);
		return await this.fromStream(file.readable);
	}
	/**
	 * Initialize from file, synchronously.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
	 * >   - *Resources*
	 * @param {string | URL} filePath Path of the file.
	 * @returns {DJB2a}
	 */
	static fromFileSync(filePath: string | URL): DJB2a {
		return new this(Deno.readFileSync(filePath));
	}
	/**
	 * Initialize from readable stream, asynchronously.
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
