// 修正版のテストスクリプト
const testSample = `### 💭 選ぶ際のポイント

\`\`\`bash
# GitHubリポジトリ名として
github.com/yourname/tariff-buddy  # 親しみやすい

# npm パッケージとして
npm install tariff-buddy  # 将来的に公開する場合

# Chrome Web Store での表示
Tariff Buddy - FTA/EPA最適化ツール
\`\`\`

## **シンプル系**
- \`md2backlog\` - 一番分かりやすい




- \`markdown-to-backlog\` - 正式名っぽい`;

console.log("=== 元のMarkdown ===");
console.log(testSample);

console.log("\n=== 変換後のBacklog記法 ===");
const converter = new MarkdownToBacklogConverter();
const result = converter.convert(testSample);
console.log(result);

console.log("\n=== 期待される結果の確認 ===");
console.log("1. ### → *** (見出しレベル3)");
console.log("2. コードブロック内の # コメントが変換されない");
console.log("3. 4行の空改行が2行に削減される");
console.log("4. インラインコード `md2backlog` → {code}md2backlog{/code}");