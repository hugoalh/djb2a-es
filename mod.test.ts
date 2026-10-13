import {
	deepStrictEqual,
	throws
} from "node:assert";
import { DJB2a } from "./mod.ts";
Deno.test("Lock", { permissions: "none" }, () => {
	throws(() => {
		new DJB2a().freeze().update("");
	});
});
Deno.test("Direct Empty", { permissions: "none" }, () => {
	deepStrictEqual(new DJB2a().update("").hashHex(), "00001505");
	deepStrictEqual(new DJB2a().update(Uint8Array.from([])).hashHex(), "00001505");
	deepStrictEqual(new DJB2a({ interpret: "utf16-code-units" }).update("").hashHex(), "00001505");
	deepStrictEqual(new DJB2a({ interpret: "utf16-code-units" }).update(Uint8Array.from([])).hashHex(), "00001505");
	deepStrictEqual(new DJB2a({ size: 64 }).update("").hashHex(), "0000000000001505");
	deepStrictEqual(new DJB2a({ size: 64 }).update(Uint8Array.from([])).hashHex(), "0000000000001505");
	deepStrictEqual(new DJB2a({
		interpret: "utf16-code-units",
		size: 64
	}).update("").hashHex(), "0000000000001505");
	deepStrictEqual(new DJB2a({
		interpret: "utf16-code-units",
		size: 64
	}).update(Uint8Array.from([])).hashHex(), "0000000000001505");
});
Deno.test("Direct 1", { permissions: "none" }, () => {
	deepStrictEqual(new DJB2a().update("🦄🌈").hashHex(), "61DF54A3");
	deepStrictEqual(new DJB2a({ interpret: "utf16-code-units" }).update("🦄🌈").hashHex(), "587FFECB");
	deepStrictEqual(new DJB2a({ size: 64 }).update("🦄🌈").hashHex(), "001ADFAE61DF54A3");
	deepStrictEqual(new DJB2a({
		interpret: "utf16-code-units",
		size: 64
	}).update("🦄🌈").hashHex(), "00000001587FFECB");
});
Deno.test("Direct Bytes 1", { permissions: "none" }, () => {
	deepStrictEqual(new DJB2a().update("🦄").hashHex(), "7C2ECD08");
	deepStrictEqual(new DJB2a({ size: 64 }).update("🦄").hashHex(), "000000017C2ECD08");
});
Deno.test("Direct Bytes 2", { permissions: "none" }, () => {
	deepStrictEqual(new DJB2a().update("héllo").hashHex(), "69F70148");
});
Deno.test("Direct Code Units 1", { permissions: "none" }, () => {
	const instance = new DJB2a({ interpret: "utf16-code-units" });
	deepStrictEqual(instance.update("h").hashHex(), "0002B5CD");
	deepStrictEqual(instance.update("e").hashHex(), "00596F08");
	deepStrictEqual(instance.update("l").hashHex(), "0B875064");
	deepStrictEqual(instance.update("l").hashHex(), "7C715C88");
	deepStrictEqual(instance.update("o").hashHex(), "0A9CEDE7");
	deepStrictEqual(instance.update(" ").hashHex(), "5E3AAAE7");
	deepStrictEqual(instance.update("w").hashHex(), "259007B0");
	deepStrictEqual(instance.update("o").hashHex(), "D790FDDF");
	deepStrictEqual(instance.update("r").hashHex(), "C9B0B9CD");
	deepStrictEqual(instance.update("l").hashHex(), "FFC7F301");
	deepStrictEqual(instance.update("d").hashHex(), "F8C65345");
});
Deno.test("Direct Code Units 2", { permissions: "none" }, () => {
	deepStrictEqual(new DJB2a({ interpret: "utf16-code-units" }).update("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.").hashHex(), "42E9CA59");
});
Deno.test("Direct Code Units 3", { permissions: "none" }, () => {
	deepStrictEqual(new DJB2a({
		interpret: "utf16-code-units",
		size: 64
	}).update("hello").hashHex(), "000000310A9CEDE7");
});
Deno.test("Direct Code Units 4", { permissions: "none" }, () => {
	deepStrictEqual(new DJB2a({
		interpret: "utf16-code-units",
		size: 64
	}).update("hello world").hashHex(), "BF169756F8C65345");
});
Deno.test("Direct Code Units 5", { permissions: "none" }, () => {
	deepStrictEqual(new DJB2a({ interpret: "utf16-code-units" }).update(Uint8Array.from([1, 2, 3])).hashHex(), "0B86AEE5");
	deepStrictEqual(new DJB2a({
		interpret: "utf16-code-units",
		size: 64
	}).update(Uint8Array.from([1, 2, 3])).hashHex(), "000000000B86AEE5");
});
Deno.test("Direct Code Units 6", { permissions: "none" }, () => {
	deepStrictEqual(new DJB2a({ interpret: "utf16-code-units" }).update(Uint8Array.from([97, 98, 99])).hashHex(), "0B873285");
	deepStrictEqual(new DJB2a({
		interpret: "utf16-code-units",
		size: 64
	}).update(Uint8Array.from([97, 98, 99])).hashHex(), "000000000B873285");
});
async function testerStream(filePath: string): Promise<void> {
	const hashDirect = new DJB2a({ size: 64 }).update(await Deno.readFile(filePath)).hash();
	await using sampleFile = await Deno.open(filePath);
	const hashStream = (await new DJB2a({ size: 64 }).updateFromStream(sampleFile.readable)).hash();
	deepStrictEqual(hashDirect, hashStream);
}
Deno.test("Stream 1", {
	permissions: {
		read: true
	}
}, async () => {
	await testerStream("./LICENSE.md");
});
Deno.test("Stream 2", {
	permissions: {
		read: true
	}
}, async () => {
	await testerStream("./README.md");
});
Deno.test("Stream 3", {
	permissions: {
		read: true
	}
}, async () => {
	await testerStream("./deno.jsonc");
});
