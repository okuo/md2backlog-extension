// Backlog記法準拠テスト
const testSample = `# 見出し1
## 見出し2

**太字のテスト**
*斜体のテスト*

~~打ち消しテスト~~

- 通常リスト
- [ ] 未完了チェック
- [x] 完了チェック

1. 番号リスト1
2. 番号リスト2

> これは引用文です
> 複数行の引用

[リンクテスト](https://example.com)

\`インラインコード\`

\`\`\`java
public class Test {
    System.out.println("Java");
}
\`\`\`

\`\`\`javascript
console.log("JavaScript");
\`\`\`

---

***

水平線のテスト完了`;

console.log("=== 元のMarkdown ===");
console.log(testSample);

console.log("\n=== 変換後のBacklog記法 ===");
const converter = new MarkdownToBacklogConverter();
const result = converter.convert(testSample);
console.log(result);

console.log("\n=== 期待される変換結果の確認 ===");
console.log("**太字** → '''太字'''");
console.log("*斜体* → ''斜体''");
console.log("~~打消~~ → %%打消%%");
console.log("- [ ] → - [ ] (そのまま)");
console.log("- [x] → - [x] (そのまま)");
console.log("> 引用 → > 引用 (そのまま)");
console.log("--- → ----");
console.log("*** → ----");