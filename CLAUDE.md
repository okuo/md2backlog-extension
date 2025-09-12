# CLAUDE.md

このファイルは、このリポジトリでコードを操作する際にClaude Code (claude.ai/code) にガイダンスを提供します。

## プロジェクトについて

MarkdownテキストをBacklog記法に変換するシンプルなChrome拡張機能です。クリップボードのMarkdownを取得し、Backlog記法に変換してクリップボードに戻します。

## プロジェクト構造

```
src/
├── manifest.json    # Chrome拡張機能の設定（Manifest V3）
├── popup.html       # ポップアップウィンドウのHTML
├── popup.js         # ポップアップの制御ロジック
├── converter.js     # Markdown→Backlog変換ロジック
├── icon.svg         # SVGアイコン
└── icon*.png        # 各サイズのアイコンファイル
```

## 開発・テストコマンド

このプロジェクトはピュアなJavaScript/HTML/CSSで構築されており、特別なビルドプロセスは不要です。

### Chrome拡張機能のテスト
1. Chromeで `chrome://extensions/` を開く
2. 「デベロッパーモード」を有効化
3. 「パッケージ化されていない拡張機能を読み込む」で `src` フォルダを選択

### 変換ロジックのテスト
ブラウザのコンソールで直接テスト可能：
```javascript
const converter = new MarkdownToBacklogConverter();
console.log(converter.convert("# 見出し\n**太字**"));
```

## アーキテクチャ

### コア機能
- **PopupController** (`popup.js`): UI制御とクリップボード操作
- **MarkdownToBacklogConverter** (`converter.js`): 変換ロジック

### 変換対応表
- 見出し: `#` → `*` (最大6レベル)
- 太字: `**text**` → `'''text'''`
- 斜体: `*text*` → `''text''`
- 打ち消し: `~~text~~` → `%%text%%`
- リスト: `-`, `*` → `-`
- 番号リスト: `1.` → `+`
- チェックリスト: `- [ ]`, `- [x]` → そのまま
- 引用: `> text` → そのまま
- 水平線: `---`, `***` → `----`
- リンク: `[text](url)` → `[[text:url]]`
- インラインコード: `` `code` `` → `{code}code{/code}`
- コードブロック: ` ```java ` → `{code:java}code{/code}` (java/cs のみ言語指定)
- コードブロック: ` ```その他 ` → `{code}code{/code}` (言語指定なし)

## セキュリティ・権限

- `clipboardRead`: クリップボードからテキスト取得
- `clipboardWrite`: 変換結果をクリップボードに書き込み
- ユーザーデータはローカルのみで処理（外部送信なし）

## エラーハンドリング

- クリップボードアクセスエラー
- 空テキストの検証
- 変換処理の例外処理
- ユーザーフレンドリーなエラーメッセージ