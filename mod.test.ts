import { assertEquals } from "STD/assert/equals";
import { DJB2a } from "./mod.ts";
Deno.test("Raw 1", { permissions: "none" }, () => {
	assertEquals(new DJB2a("").hash(), 5381n);
});
Deno.test("Raw 2", { permissions: "none" }, () => {
	assertEquals(new DJB2a("🦄🌈").hash(), 1484783307n);
});
Deno.test("Raw 3", { permissions: "none" }, () => {
	assertEquals(new DJB2a("h").hash(), 177613n);
});
Deno.test("Raw 4", { permissions: "none" }, () => {
	assertEquals(new DJB2a("he").hash(), 5861128n);
});
Deno.test("Raw 5", { permissions: "none" }, () => {
	assertEquals(new DJB2a("hel").hash(), 193417316n);
});
Deno.test("Raw 6", { permissions: "none" }, () => {
	assertEquals(new DJB2a("hell").hash(), 2087804040n);
});
Deno.test("Raw 7", { permissions: "none" }, () => {
	const instance = new DJB2a("hello");
	assertEquals(instance.hash(), 178056679n);
	assertEquals(instance.hashHexPadding(), "0A9CEDE7");
});
Deno.test("Raw 8", { permissions: "none" }, () => {
	assertEquals(new DJB2a("hello ").hash(), 1580903143n);
});
Deno.test("Raw 9", { permissions: "none" }, () => {
	assertEquals(new DJB2a("hello w").hash(), 630196144n);
});
Deno.test("Raw 10", { permissions: "none" }, () => {
	assertEquals(new DJB2a("hello wo").hash(), 3616603615n);
});
Deno.test("Raw 11", { permissions: "none" }, () => {
	assertEquals(new DJB2a("hello wor").hash(), 3383802317n);
});
Deno.test("Raw 12", { permissions: "none" }, () => {
	assertEquals(new DJB2a("hello worl").hash(), 4291293953n);
});
Deno.test("Raw 13", { permissions: "none" }, () => {
	assertEquals(new DJB2a("hello world").hash(), 4173747013n);
});
Deno.test("Raw 14", { permissions: "none" }, () => {
	assertEquals(new DJB2a("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.").hash(), 1122617945n);
});
Deno.test("Stream 1", {
	permissions: {
		read: true
	}
}, async () => {
	console.log((await DJB2a.fromFile("./README.md")).hashHexPadding());
});
