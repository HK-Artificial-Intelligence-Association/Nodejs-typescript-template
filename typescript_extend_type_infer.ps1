# Only for typescript 5.5.2 above
# see https://github.com/microsoft/vscode/issues/64566
# 运行该脚本后，重启运行环境，并配置 Typescript LSP 为 node_modules 下的 tsc 即可。
$FROM = 'var defaultMaximumTruncationLength = 160;'
$TO = 'var defaultMaximumTruncationLength = 1e6;'
$FILE_PATH = "node_modules/typescript/lib/typescript.js"

$content = Get-Content -Path $FILE_PATH -Raw

$newContent = $content.Replace($FROM, $TO)

$newContent | Set-Content -Path $FILE_PATH -NoNewline

Write-Host "Annotation Truncation Length patched successfully" -ForegroundColor Green
