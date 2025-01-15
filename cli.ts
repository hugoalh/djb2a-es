import { parseArgs } from "jsr:@std/cli@^1.0.8/parse-args";
import { DJB2a } from "./mod.ts";
if (!import.meta.main) {
	throw new Error(`This script is for command line usage only!`);
}
const args = parseArgs(Deno.args, {
	boolean: [
		"file",
		"stdin"
	]
});
const fromFile: boolean = args.file;
const fromStdin: boolean = args.stdin;
const argsValues: string[] = args._.map((value: string | number): string => {
	return String(value);
});
if (fromFile && fromStdin) {
	throw new SyntaxError(`Unable to use the sources of file and stdin together!`);
}
if (fromFile) {
	if (argsValues.length === 0) {
		throw new SyntaxError(`File path is not defined!`);
	}
	if (argsValues.length !== 1) {
		throw new SyntaxError(`Too many arguments! Expect: 1; Current: ${argsValues.length}.`);
	}
	console.log((await DJB2a.fromFile(argsValues[0])).hashHexPadding());
} else if (fromStdin) {
	if (argsValues.length !== 0) {
		throw new SyntaxError(`Too many arguments! Expect: 0; Current: ${argsValues.length}.`);
	}
	let data: Uint8Array = Uint8Array.from([]);
	for await (const chunk of Deno.stdin.readable) {
		data = Uint8Array.from([...data, ...chunk]);
	}
	console.log(new DJB2a(new TextDecoder().decode(data).replace(/\r?\n$/, "")).hashHexPadding());
} else {
	if (argsValues.length === 0) {
		throw new SyntaxError(`Data is not defined!`);
	}
	if (argsValues.length !== 1) {
		throw new SyntaxError(`Too many arguments! Expect: 1; Current: ${argsValues.length}.`);
	}
	console.log(new DJB2a(argsValues[0]).hashHexPadding());
}