if (typeof Uint8Array.fromHex === "undefined") {
	//deno-lint-ignore hugoalh/no-import-dynamic -- Polyfill.
	await import("npm:es-arraybuffer-base64@^1.1.2/Uint8Array.fromHex/auto");
}
export type DJB2aAcceptDataType =
	| string
	| Uint8Array;
export type DJB2aBitsSize =
	| 32
	| 64;
const bitsSizes: readonly DJB2aBitsSize[] = [/* UNIQUE */
	32,
	64
];
export type DJB2aInterpretMode =
	| "bytes"
	| "unicode-code-points"
	| "utf16-code-units";
const interpretModes: readonly DJB2aInterpretMode[] = [/* UNIQUE */
	"bytes",
	"unicode-code-points",
	"utf16-code-units"
];
export interface DJB2aOptions {
	/**
	 * Data interpret mode of the DJB2a.
	 * 
	 * - **`bytes`:** UTF-8 encoded bytes.
	 * - **`unicode-code-points`:**: Unicode code points.
	 * - **`utf16-code-units`:** UTF-16 code units; Used in the previous versions.
	 * @default {"byte"}
	 */
	interpret?: DJB2aInterpretMode;
	/**
	 * Bits size of the DJB2a.
	 * @default {32}
	 */
	size?: DJB2aBitsSize;
}
/**
 * Get the non-cryptographic hash of the data with algorithm DJB2a.
 */
export class DJB2a {
	get [Symbol.toStringTag](): string {
		return "DJB2a";
	}
	#freezed: boolean = false;
	#hashHex: string | null = null;
	#interpret: DJB2aInterpretMode;
	#size: DJB2aBitsSize;
	#bin: bigint = 5381n;
	/**
	 * Initialize.
	 * @param {DJB2aOptions} [options={}] Options.
	 */
	constructor(options: DJB2aOptions = {}) {
		const {
			interpret = "bytes",
			size = 32
		}: DJB2aOptions = options;
		if (!interpretModes.includes(interpret)) {
			throw new RangeError(`\`${interpret}\` is not a valid DJB2a hash data interpret mode! Only accept these values: ${interpretModes.join(", ")}.`);
		}
		if (!bitsSizes.includes(size)) {
			throw new RangeError(`\`${size}\` is not a valid DJB2a hash bits size! Only accept these values: ${bitsSizes.join(", ")}.`);
		}
		this.#interpret = interpret;
		this.#size = size;
	}
	/**
	 * Whether the instance is freezed.
	 * @returns {boolean}
	 */
	get freezed(): boolean {
		return this.#freezed;
	}
	/**
	 * Clone the instance.
	 * @returns {DJB2a}
	 */
	clone(): DJB2a {
		const instance: DJB2a = new DJB2a();
		instance.#freezed = this.#freezed;
		instance.#hashHex = this.#hashHex;
		instance.#interpret = this.#interpret;
		instance.#size = this.#size;
		instance.#bin = this.#bin;
		return instance;
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
		return Uint8Array.fromHex(this.hashHex());
	}
	/**
	 * Get the non-cryptographic hash of the data, in hexadecimal with padding.
	 * @returns {string}
	 */
	hashHex(): string {
		if (this.#hashHex === null) {
			const result: string = BigInt.asUintN(this.#size, this.#bin).toString(16).toUpperCase().padStart(this.#size / 4, "0");
			if (result.length !== this.#size / 4) {
				throw new Error(`Unexpected hash hex result \`${result}\`! Please submit a bug report.`);
			}
			this.#hashHex = result;
		}
		return structuredClone(this.#hashHex);
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
		if (this.#interpret === "unicode-code-points") {
			const raw: string = (typeof data === "string") ? structuredClone(data) : new TextDecoder().decode(data);
			for (const character of raw) {
				this.#bin = ((this.#bin << 5n) + this.#bin) ^ BigInt(character.codePointAt(0)!);
			}
		} else if (this.#interpret === "utf16-code-units") {
			const raw: string = (typeof data === "string") ? structuredClone(data) : new TextDecoder().decode(data);
			for (let index: number = 0; index < raw.length; index += 1) {
				this.#bin = ((this.#bin << 5n) + this.#bin) ^ BigInt(raw.charCodeAt(index));
			}
		} else {
			const bytes: Uint8Array = (typeof data === "string") ? new TextEncoder().encode(data) : structuredClone(data);
			for (const byte of bytes) {
				this.#bin = ((this.#bin << 5n) + this.#bin) ^ BigInt(byte);
			}
		}
		return this;
	}
	/**
	 * Append data from the readable stream.
	 * @param {ReadableStream<DJB2aAcceptDataType>} stream Data from the readable stream.
	 * @returns {Promise<this>}
	 */
	async updateFromStream(stream: ReadableStream<DJB2aAcceptDataType>): Promise<this> {
		for await (const chunk of stream) {
			this.update(chunk);
		}
		return this;
	}
}
export default DJB2a;
