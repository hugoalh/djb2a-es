import { DJB2a as DJB2a_0_6_1 } from "jsr:@hugoalh/djb2a@0.6.1";
import { DJB2a } from "./mod.ts";
Deno.bench("Large Load 10000 Current", {
	group: "Large Load 10000",
	permissions: "none"
}, (t) => {
	const data = new Uint8Array(10000).fill(120);
	t.start();
	new DJB2a().update(data).hashHex();
	t.end();
});
Deno.bench("Large Load 10000 v0.6.1", {
	group: "Large Load 10000",
	permissions: "none"
}, (t) => {
	const data = new Uint8Array(10000).fill(120);
	t.start();
	new DJB2a_0_6_1().update(data).hashHex();
	t.end();
});
Deno.bench("Large Load 50000 Current", {
	group: "Large Load 50000",
	permissions: "none"
}, (t) => {
	const data = new Uint8Array(50000).fill(120);
	t.start();
	new DJB2a().update(data).hashHex();
	t.end();
});
Deno.bench("Large Load 50000 v0.6.1", {
	group: "Large Load 50000",
	permissions: "none"
}, (t) => {
	const data = new Uint8Array(50000).fill(120);
	t.start();
	new DJB2a_0_6_1().update(data).hashHex();
	t.end();
});
Deno.bench("Large Load 200000 Current", {
	group: "Large Load 200000",
	permissions: "none"
}, (t) => {
	const data = new Uint8Array(200000).fill(120);
	t.start();
	new DJB2a().update(data).hashHex();
	t.end();
});
Deno.bench("Large Load 200000 v0.6.1", {
	group: "Large Load 200000",
	permissions: "none"
}, (t) => {
	const data = new Uint8Array(200000).fill(120);
	t.start();
	new DJB2a_0_6_1().update(data).hashHex();
	t.end();
});
