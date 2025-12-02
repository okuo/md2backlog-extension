# CLAUDE.md

このファイルは、このリポジトリでコードを操作する際にClaude Code (claude.ai/code) にガイダンスを提供します。

## プロジェクトについて

MarkdownテキストをBacklog記法に変換するシンプルなChrome拡張機能です。クリップボードのMarkdownを取得し、Backlog記法に変換してクリップボードに戻します。

## プロジェクト構造

```
src/
├── manifest.json    # ブラウザ拡張機能の設定（Manifest V3）
├── popup.html       # ポップアップウィンドウのHTML
├── popup.js         # ポップアップの制御ロジック
├── converter.js     # Markdown→Backlog変換ロジック
├── icon.svg         # SVGアイコン
└── icon*.png        # 各サイズのアイコンファイル
```

## 開発・テストコマンド

このプロジェクトはピュアなJavaScript/HTML/CSSで構築されており、特別なビルドプロセスは不要です。

### ブラウザ拡張機能のテスト

#### Chromeでのテスト
1. Chromeで `chrome://extensions/` を開く
2. 「デベロッパーモード」を有効化
3. 「パッケージ化されていない拡張機能を読み込む」で `src` フォルダを選択

### manifest.json バリデーション
```bash
node tests/test-manifest-validation.js
```
Chrome Web Store の要件チェック:
- Description の文字数制限 (132文字以内)
- バージョン形式の検証 (X.Y.Z)
- 必須フィールドの存在確認

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
- 太字+斜体: `***text***` → `'''''text'''''`
- 太字: `**text**` → `'''text'''`
- 斜体: `*text*` → `''text''`
- 打ち消し: `~~text~~` → `%%text%%`
- 下線: `<u>text</u>` → `&text&`
- 色付き: `<span style="color:red">text</span>` → `&color(red){text}`
- リスト: `-`, `*` → `-` (ネスト対応: `--`, `---`)
- 番号リスト: `1.` → `+` (ネスト対応: `++`, `+++`)
- チェックリスト: `- [ ]`, `- [x]` → そのまま
- 引用: `> text` → `> text` (ネスト対応: `> > text` → `>> text`)
- 水平線: `---`, `***` → `----`
- リンク: `[text](url)` → `[[text:url]]`
- 自動リンク: `<https://url>` → `[[url]]`
- 画像: `![alt](url)` → `#image(url)`
- テーブル: Markdownテーブル → Backlogテーブル (ヘッダー行に`h`付与)
- インラインコード: `` `code` `` → `{code}code{/code}`
- コードブロック: 多言語対応 (java, cs, c, cpp, python, ruby, perl, php, javascript, html, css, xml, sql, shell)

## セキュリティ・権限

- `clipboardRead`: クリップボードからテキスト取得
- `clipboardWrite`: 変換結果をクリップボードに書き込み
- ユーザーデータはローカルのみで処理（外部送信なし）

## エラーハンドリング

- クリップボードアクセスエラー
- 空テキストの検証
- 変換処理の例外処理
- ユーザーフレンドリーなエラーメッセージ