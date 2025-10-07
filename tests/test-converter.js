// テスト用スクリプト：ブラウザのコンソールで実行
const testSample = `Chrome拡張のフォルダ名候補をいくつか考えてみました：

## **シンプル系**
- \`md2backlog\` - 一番分かりやすい
- \`markdown-to-backlog\` - 正式名っぽい
- \`backlog-converter\` - 用途明確

## **Chrome拡張であることを明示**
- \`chrome-md2backlog\` 
- \`md2backlog-extension\`
- \`backlog-converter-ext\`

## **機能特化系**
- \`clipboard-md-converter\` - クリップボード変換を強調
- \`md-backlog-bridge\` - 橋渡し的な意味
- \`backlog-formatter\` - フォーマッター的な意味

## **おすすめ**
個人的には **\`md2backlog\`** が一番良いと思います。

理由：
- 短くてタイプしやすい
- 何をするものか一目で分かる
- 既存の類似ツール（md2bl）との親和性
- GitHubリポジトリ名としても適切
- Chrome Web Storeでの検索にもひっかかりやすい

\`md2backlog\` はいかがでしょうか？`;

console.log("=== 元のMarkdown ===");
console.log(testSample);

console.log("\n=== 変換後のBacklog記法 ===");
const converter = new MarkdownToBacklogConverter();
const result = converter.convert(testSample);
console.log(result);

console.log("\n=== 変換の詳細チェック ===");
const lines = testSample.split('\n');
const resultLines = result.split('\n');

lines.forEach((line, index) => {
    const original = line;
    const converted = resultLines[index];
    if (original !== converted) {
        console.log(`行${index + 1}: "${original}" → "${converted}"`);
    }
});