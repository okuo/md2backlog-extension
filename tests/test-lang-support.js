// 言語サポートテスト
const testSample = `
\`\`\`java
public class Hello {
    System.out.println("Hello");
}
\`\`\`

\`\`\`cs
public class Hello {
    Console.WriteLine("Hello");
}
\`\`\`

\`\`\`bash
echo "Hello World"
\`\`\`

\`\`\`javascript
console.log("Hello World");
\`\`\`

\`\`\`python
print("Hello World")
\`\`\`

\`\`\`
echo "言語指定なし"
\`\`\`
`;

console.log("=== 元のMarkdown ===");
console.log(testSample);

console.log("\n=== 変換後のBacklog記法 ===");
const converter = new MarkdownToBacklogConverter();
const result = converter.convert(testSample);
console.log(result);

console.log("\n=== 期待される結果 ===");
console.log("java → {code:java}");
console.log("cs → {code:cs}"); 
console.log("bash → {code}（言語指定なし）");
console.log("javascript → {code}（言語指定なし）");
console.log("python → {code}（言語指定なし）");
console.log("指定なし → {code}");