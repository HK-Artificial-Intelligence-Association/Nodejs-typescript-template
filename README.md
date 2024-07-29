# NODE-TYPESCRIPT-TEMPLATE

本仓库为元狲科技的 **Nodejs with Typescript** 工程模板。

适合搭配 Typescript 开发一些 Nodejs 应用使用。

供参考使用。

## 1.0 特性
- 使用 **ESM Module**。
- 支持对于入口文件 `src/index.ts` 直接运行Typescript & VSCode 下的 Typescript Debug。
- 运行 `npm run type-check` 进行程序的类型检查。
- 使用 `jest` 作为测试框架。
- 使用 `tsx` 作为 typescript 的 executor。
- 支持使用`@` 作为路径 `src/` 别名。
- 符合 [tsc 对于 nodejs 的模块输出处理的配置项](https://www.typescriptlang.org/docs/handbook/modules/theory.html#the-module-output-format)。
- **使用 `.ts` 后缀进行模块、函数的导入**。
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

## 3.0 一些已知的问题

### 3.1 Jest 的模块识别问题

**有的时候**，在运行 jest 的时，可能会出现模块系统不正确的问题 **i.e jest似乎使用了默认的Commonjs模块系统去读取文件，而不是ESM。** 该问题出现得很奇怪，暂时排查不到原因。

建议在使用该模板的时候先试着运行一下测试，看看本地能不能跑通。

目前造成该问题的原因未知。Jest 以及 ts-jest 的相关文档有点混乱。



