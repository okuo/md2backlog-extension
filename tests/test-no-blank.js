// 空改行削除テスト
const testSample = `# 見出し1

## 見出し2


### 見出し3



- リスト1

- リスト2




- リスト3

最後のテキスト`;

console.log("=== 元のMarkdown ===");
console.log(JSON.stringify(testSample)); // 改行を見やすくするため

console.log("\n=== 変換後のBacklog記法 ===");
const converter = new MarkdownToBacklogConverter();
const result = converter.convert(testSample);
console.log(JSON.stringify(result)); // 改行を見やすくするため

console.log("\n=== 実際の表示 ===");
console.log(result);