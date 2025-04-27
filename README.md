# NODE-TYPESCRIPT-TEMPLATE

本仓库为元狲科技的 **Nodejs with Typescript** 工程模板。

适合搭配 Typescript 开发一些 Nodejs 应用使用。

供参考使用。

快速安装：

```bash
npx degit https://github.com/HK-Artificial-Intelligence-Association/Nodejs-typescript-template $YOUR_TARGET_PATH
```

## 1.0 特性
- 使用 **ESM Module**。
- 支持对于单个文件直接运行Typescript & VSCode 下的 Typescript Debug。
- 运行 `npm run type-check` 进行程序的类型检查。
- 使用 `jest` 作为测试框架。
- 使用 `tsx` 作为 typescript 的 executor。
- 支持使用`@` 作为路径 `src/` 别名。
- 符合 [tsc 对于 nodejs 的模块输出处理的配置项](https://www.typescriptlang.org/docs/handbook/modules/theory.html#the-module-output-format)。
- **使用 `.ts` 后缀进行模块、函数的导入**。
- 支持 Nodejs 的 `repl` 环境，并且使用 [showify](https://github.com/Snowflyt/showify) 进行输出美化。。
- 「还处于实验阶段的特性」使用 `npm run build:start` 使用 babel 编译为 js 后，在 nodejs 环境下运行。

> 请注意，由于转义 import 路径的 plugin 是自己写的，可能会存在一些路径导入的问题。因为可能存在潜在的问题，并不推荐使用该特性。
>
>
> tsx 本身就是一个 ts excutor ，因此可以考虑使用 tsx 在生产环境中运行。对于是否要将它用在生产环境的评估，可参考：[https://tsx.is/faq#can-should-it-be-used-in-production](https://tsx.is/faq#can-should-it-be-used-in-production)

## 2.0 使用

克隆本仓库到本地后,首先运行 `npm install` 安装项目依赖。

而后， `src/index.ts` 为默认的入口文件，你可以通过它进行相应程序的后续开发与修改。

之后，如果你想：

### 2.1 进行开发

运行 `npm run dev` 即可，它支持热更新的检测。

同时，你可以在 vscode 中使用 `debug index.ts` 直接启动开发 debug。

### 2.2 对程序进行类型检查

运行 `npm run type-check` ，它将调用 tsc 对类型进行检查。

### 2.3 运行部署程序

由你个人选择：

#### 2.3.1 使用 tsx 与 Typescript 直接运行

运行 `npm run start` 即可使用 tsx 运行程序。

> Note: 运行前会使用 tsc 进行类型检查，如果不通过类型检查，那么它不会运行

#### 2.3.2 编译为 js 后运行

运行 `npm run build` 会将所有用到的代码文件编译为 js ，输出到 `/dist` 目录下。

运行 `npm run build:start` 则会先执行编译，在编译好后运行程序。

运行 `npm run js:start` 运行目前编译好的程序。

> Note: 编译后会同时生成对应的类型定义文件。因此可将该工程模板用作 Node Package 的开发。

### 2.4 进行测试

运行 `npm run test` 进行测试。

运行 `npm run test:cover` 在测试后会生成测试的代码覆盖率。 

### 2.5 使用REPL环境


运行 `npm run repl` ，即可进入相应的交互式环境：

```bash
PS D:\Backup\Documents\GitHub\nodejs-template> npm run repl

> node-typescript-template@1.0.1 repl
> tsx ./repl.ts

>
--- REPL Of NODE ---
  该 REPL 会默认将所有 ./src 目录下的模块（包括子目录下的模块）导出到顶级，为了方便索引查看会将所有模块同时放在 INDEX 命名空间下
  因此，如果你想:
  1. 查看所有导入模块，请输入 INDEX
  2. 查看所有导入模块的某个模块，请输入 INDEX.模块名

  存下以下命令：
  1. 重新加载所有模块：.clear

  之后的输出为 REPL 在加载模块时发生的输出，由于会加载到不同上下文，因此会加载两遍：
Hello world
1+3 = 4
1x2 = 2
Hello world
1+3 = 4
1x2 = 2
>
```

`repl` 会根据 `ESM Modules` 的模块规则，将所有 `src` 目录下的模块（包括子目录）导入到 `repl` 的顶层上下文与 `INDEX` 命名空间中。

例如，在本工程模板里，由于 `./src` 目录下存在 `index.ts` 文件，在 ESM Module 中，它会把 `index.ts` 中所有`export` 的内容视作一个模块，因此输入 `index` 能够查看对应模块下的所有 `export` 内容：

```bash
> index
[Module: null prototype] { add: [Function: add] }
```

同时，为了方便查看所有导入的模块，同样提供了一个名为 `INDEX` 的命名空间：

```bash
> INDEX
{
  index: [Module: null prototype] { add: [Function: add] },
  utils: { math: [Module: null prototype] { multiply: [Function: multiply] } }
}
```

`repl` 适用于不想运行程序，单独观察某个函数的运行效果时使用。例如：

```bash
> index.add(1,2)
3
```

> 当然，现在，如果你有钱，我个人更推荐使用 [Quokka.js 插件](https://quokkajs.com/) 进行测试。

同样，在 repl 环境中，是支持顶层 `await` 的，你可以通过它测试某些异步函数。

它比较适用于函数式编程的开发环境。

## 3.0 一些已知的问题

### 3.1 Jest 的模块识别问题

**有的时候**，在运行 jest 的时，可能会出现模块系统不正确的问题 **i.e jest似乎使用了默认的Commonjs模块系统去读取文件，而不是ESM。** 该问题出现得很奇怪，暂时排查不到原因。

建议在使用该模板的时候先试着运行一下测试，看看本地能不能跑通。

目前造成该问题的原因未知。Jest 以及 ts-jest 的相关文档有点混乱。

## 其他

- 如果你想取消掉 Typescript 的类型推断长度的限制（这对于使用 `EffectTS` 这类的库时会非常有用）以获得更好的开发类型提示体验，可以运行 `./typescript_extend_type_infer.ps1` 脚本。详情可见：[https://github.com/microsoft/vscode/issues/64566](https://github.com/microsoft/vscode/issues/64566)。


- 推荐使用 `EffectTS` 进行程序代码的组织，这是一个非常棒的开发库。
