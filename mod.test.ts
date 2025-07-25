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
Deno.test("Direct 1", { permissions: "none" }, () => {
	deepStrictEqual(new DJB2a("").hashHex(), "00001505");
});
Deno.test("Direct 2", { permissions: "none" }, () => {
	deepStrictEqual(new DJB2a("🦄🌈").hashHex(), "587FFECB");
});
Deno.test("Direct 3", { permissions: "none" }, () => {
	const instance = new DJB2a();
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
Deno.test("Direct 4", { permissions: "none" }, () => {
	deepStrictEqual(new DJB2a("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.").hashHex(), "42E9CA59");
});
async function testerStream(filePath: string): Promise<void> {
	const sampleText = await Deno.readTextFile(filePath);
	const hashFromText = new DJB2a(sampleText).hash();
	await using sampleFile = await Deno.open(filePath);
	const hashFromStream = (await new DJB2a().updateFromStream(sampleFile.readable)).hash();
	deepStrictEqual(hashFromText, hashFromStream);
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
