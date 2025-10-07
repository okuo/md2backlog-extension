// デバッグ用テストスクリプト
const testSample = `\`\`\`bash
# GitHubリポジトリ名として
github.com/yourname/tariff-buddy  # 親しみやすい

# npm パッケージとして
npm install tariff-buddy  # 将来的に公開する場合

# Chrome Web Store での表示
Tariff Buddy - FTA/EPA最適化ツール
\`\`\`

個人的には **\`tariff-buddy\`** が推しです！`;

console.log("=== 元のMarkdown ===");
console.log(testSample);

const converter = new MarkdownToBacklogConverter();

console.log("=== ステップ1: コードブロック保護 ===");
converter.codeBlocks = [];
converter.inlineCodes = [];
let step1 = converter.protectCodeBlocks(testSample);
console.log(step1);
console.log("保護されたコードブロック:", converter.codeBlocks);

console.log("=== ステップ2: インラインコード保護 ===");
let step2 = converter.protectInlineCodes(step1);
console.log(step2);
console.log("保護されたインラインコード:", converter.inlineCodes);

console.log("=== 最終変換結果 ===");
const result = converter.convert(testSample);
console.log(result);