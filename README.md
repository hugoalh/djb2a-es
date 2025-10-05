# DJB2a (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/djb2a-es](https://img.shields.io/github/v/release/hugoalh/djb2a-es?label=hugoalh/djb2a-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/djb2a-es")](https://github.com/hugoalh/djb2a-es)
[![JSR: @hugoalh/djb2a](https://img.shields.io/jsr/v/@hugoalh/djb2a?label=@hugoalh/djb2a&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/djb2a")](https://jsr.io/@hugoalh/djb2a)
[![NPM: @hugoalh/djb2a](https://img.shields.io/npm/v/@hugoalh/djb2a?label=@hugoalh/djb2a&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/djb2a")](https://www.npmjs.com/package/@hugoalh/djb2a)

An ECMAScript module to get the non-cryptographic hash of the data with algorithm DJB2a (32 bits).

## 🎯 Targets

| **Runtime \\ Source** | **GitHub Raw** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

## 🛡️ Runtime Permissions

This does not request any runtime permission.

## #️⃣ Sources

- GitHub Raw
  ```
  https://raw.githubusercontent.com/hugoalh/djb2a-es/{Tag}/mod.ts
  ```
- JSR
  ```
  jsr:@hugoalh/djb2a[@{Tag}]
  ```
- NPM
  ```
  npm:@hugoalh/djb2a[@{Tag}]
  ```

> [!NOTE]
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

## ⤵️ Entrypoints

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |

## 🧩 APIs

- ```ts
  class DJB2a {
    constructor(data?: DJB2aAcceptDataType);
    get freezed(): boolean;
    freeze(): this;
    hash(): Uint8Array;
    hashHex(): string;
    update(data: DJB2aAcceptDataType): this;
    updateFromStream(stream: ReadableStream<DJB2aAcceptDataType>): Promise<this>;
  }
  ```
- ```ts
  type DJB2aAcceptDataType =
    | string
    | BigUint64Array
    | Uint8Array
    | Uint16Array
    | Uint32Array;
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc/)
>   - [JSR](https://jsr.io/@hugoalh/djb2a)

## ✍️ Examples

- ```ts
  new DJB2a("hello").hashHex();
  //=> "0A9CEDE7"
  ```
