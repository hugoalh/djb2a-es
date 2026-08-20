# DJB2a (ES)

[**⚖️** MIT](./LICENSE.md)

🔗
[DistBoard @hugoalh](https://hugoalh.github.io/distboard/djb2a_ecmascript)
● [GitHub](https://github.com/hugoalh/djb2a-es)
● [JSR](https://jsr.io/@hugoalh/djb2a)
● [NPM](https://www.npmjs.com/package/@hugoalh/djb2a)

An ECMAScript module to get the non-cryptographic hash of the data with algorithm DJB2a (32 bits).

## 🎯 Runtime Targets

Any runtime which support ECMAScript should able to use this; These runtimes are officially supported:

- **[Bun](https://bun.sh/)** >= v1.1.0
- **[Deno](https://deno.land/)** >= v2.1.0
- **[NodeJS](https://nodejs.org/)** >= v20.9.0

## 🛡️ Runtime Permissions

This does not request any runtime permission.

## #️⃣ Entrypoints

| **Type** | **Name** | **Path** | **Description** |
|:--|:--|:--|:--|
| API | `.` | `./mod.ts` | Default. |
| CLI | `./cli` | `./cli.ts` | Default. |

> [!NOTE]
> - Different runtimes have vary support for the entrypoints, visit the runtime documentation for more information.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

## 🧩 APIs

- ```ts
  class DJB2a {
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
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc)
>   - [JSR](https://jsr.io/@hugoalh/djb2a)

## 🧩 CLIs

- ```powershell
  djb2a $Context
  ```
- ```powershell
  djb2a --file $FilePath
  <# 🔀 Unordered Positions: `--file`, `$FilePath` #>
  ```
  | **Argument** | **Type** | **Description** |
  |:--|:--|:--|
  | `file` | `switch` | Whether the resource is from file. |
- ```powershell
  djb2a --stdin
  ```
  | **Argument** | **Type** | **Description** |
  |:--|:--|:--|
  | `stdin` | `switch` | Whether the resource is from standard stream input. |

## ✍️ Examples

- ```ts
  new DJB2a().update("hello").hashHex();
  //=> "0A9CEDE7"
  ```
- ```powershell
  djb2a 'hello'
  ```
