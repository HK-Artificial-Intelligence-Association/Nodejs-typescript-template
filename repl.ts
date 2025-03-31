import repl from 'node:repl';
import { statSync,readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { show } from 'showify';

const logLevel = process.env.LOG_LEVEL || 'info';

const debug = (message: string) => {
    if (logLevel === 'debug') {
        console.debug(message);
    }
}

const debugGroup = (message: string) => {
    if (logLevel === 'debug') {
        console.group(message);
    }
}

const debugGroupEnd = () => {
    if (logLevel === 'debug') {
        console.groupEnd();
    }
}

const replServer = repl.start({
    writer:(output:any) => {
        try {
            return show(output,{colors:true});
        } catch (error) {
            return output;
        }
    }
});
console.log('')
console.group('--- REPL Of NODE ---')
console.log('该 REPL 会默认将所有 ./src 目录下的模块（包括子目录下的模块）导出到顶级，为了方便索引查看会将所有模块同时放在 INDEX 命名空间下')
console.log('因此，如果你想:');
console.log('1. 查看所有导入模块，请输入 INDEX');
console.log('2. 查看所有导入模块的某个模块，请输入 INDEX.模块名');
console.log('')
console.log('存下以下命令：')
console.log('1. 重新加载所有模块：.clear')
console.log('')
console.log('之后的输出为 REPL 在加载模块时发生的输出，由于会加载到不同上下文，因此会加载两遍：')
console.groupEnd()

const localDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * 动态载入所有模块到 repl 中
 * @param dir 指定的目录的绝对路径
 * @param context 
 * @param namespace 
 */
async function loadModulesFromDirectory(dir: string, context: any, namespace: string | null = null): Promise<void> {
    const absoluteDir = path.resolve(dir);

    const files = readdirSync(absoluteDir);
    for (const file of files) {
        const absolutePath = path.join(absoluteDir, file);

        if (statSync(absolutePath).isDirectory()) {
            // 如果是目录，递归处理
            const subNamespace = namespace ? `${namespace}.${file}` : file;
            context[subNamespace] = {};
            await loadModulesFromDirectory(absolutePath, context[subNamespace]);
        } else if (absolutePath.endsWith('.ts') || absolutePath.endsWith('.js')) {
            const moduleName = path.basename(file, path.extname(file));
            
            const importedModule = await import(`${pathToFileURL(absolutePath)}?timestamp=${Date.now()}`);

            // 将模块导入到 REPL 上下文中
            if (namespace) {
                context[moduleName] = importedModule;
            } else {
                debug(`已导入模块 ${absolutePath}`);
                context[moduleName] = importedModule;
            }
        }
    }
}

async function resetContext(): Promise<void> {
    console.log('重新加载所有模块');

    // 清理上下文中的 ADS 对象
    replServer.context.INDEX = {};

    // 动态导入并加载所有模块
    await loadModulesFromDirectory(path.resolve(localDir,'./src'), replServer.context.INDEX);
    await loadModulesFromDirectory(path.resolve(localDir,'./src'), replServer.context);

    replServer.displayPrompt();
}

// 初次加载
replServer.context.INDEX = {};
debugGroup('加载所有模块到 REPL 顶层上下文中...');
await loadModulesFromDirectory(path.resolve(localDir, './src'), replServer.context);
debugGroupEnd();
debugGroup('加载所有模块到 INDEX 命名空间中...');
await loadModulesFromDirectory(path.resolve(localDir, './src'), replServer.context.INDEX);
debugGroupEnd();

replServer.on('reset', resetContext);

replServer.displayPrompt();
