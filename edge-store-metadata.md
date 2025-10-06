# Microsoft Edge Add-ons Store メタデータ

## 基本情報

### 拡張機能名
**英語**: Markdown to Backlog Converter
**日本語**: Markdown to Backlog Converter

### 簡潔な説明（45文字以内）
**英語**: Convert Markdown to Backlog notation quickly
**日本語**: MarkdownをBacklog記法に簡単変換

### 詳細説明
**英語**:
Convert Markdown text to Backlog notation format instantly from your clipboard. Perfect for developers and project managers who use ChatGPT or other AI services that output in Markdown format, and need to paste content into Backlog tickets.

Key features:
- One-click conversion from clipboard
- Local processing only - no external data transmission
- Support for headings, lists, code blocks, links, and more
- Undo function to restore original text
- Privacy-focused: no data collection or tracking

Compatible with both Chrome and Microsoft Edge browsers.

**日本語**:
クリップボードのMarkdownテキストを瞬時にBacklog記法に変換します。ChatGPTなどのAIサービスがMarkdown形式で出力する内容を、Backlogのチケットに簡単に貼り付けできる開発者・プロジェクトマネージャー向けのツールです。

主な機能:
- ワンクリックでクリップボードから変換
- ローカル処理のみ - 外部データ送信なし
- 見出し、リスト、コードブロック、リンクなど幅広く対応
- 元のテキストに戻す機能
- プライバシー重視：データ収集・トラッキングなし

Chrome・Microsoft Edge両ブラウザ対応。

## カテゴリ
**Primary**: Developer tools
**Secondary**: Productivity

## 価格
無料 (Free)

## タグ・検索キーワード
- markdown
- backlog
- converter
- clipboard
- developer-tools
- project-management
- ai-tools
- chatgpt
- notation
- local-processing

## サポート情報

### ウェブサイト
https://github.com/okuo/md2backlog-extension

### サポート連絡先
https://github.com/okuo/md2backlog-extension/issues

### プライバシーポリシー
https://github.com/okuo/md2backlog-extension/blob/main/PRIVACY.md

## 必要なメディア

### アイコン（必須）
- 16x16px: icon16.png ✓
- 32x32px: icon32.png ✓
- 48x48px: icon48.png ✓
- 128x128px: icon128.png ✓

### スクリーンショット（1-5枚）
1. **メイン画面**: ポップアップウィンドウの初期状態
2. **変換中画面**: ローディング表示
3. **変換完了画面**: 成功メッセージと元に戻すボタン
4. **使用例**: Markdownテキストの変換前後の比較
5. **Backlog貼り付け例**: 実際のBacklogでの表示例

### プロモーション画像（推奨）
- 1280x800px: プロモーション用バナー画像
- 920x680px: ストア表示用タイル画像
- 440x280px: 小サイズタイル画像

## バージョン情報
- **現在のバージョン**: 1.0.1
- **最小Edge要件**: 88.0.0
- **Manifest Version**: 3

## 権限の説明
- **clipboardRead**: クリップボードからMarkdownテキストを読み取るため
- **clipboardWrite**: 変換したBacklog記法テキストをクリップボードに書き込むため

## テスト用アカウント情報
テスト用アカウント不要（クリップボード機能のみ使用）

## 実績・信頼性

### Chrome Web Store実績
- **公開済み**: https://chromewebstore.google.com/detail/markdown-to-backlog-conve/lpbkebjdelkibmfjicdehhppeeakhjpe
- **実績**: Chrome版で正常動作確認済み
- **同一コードベース**: Edge版は同じソースコードから生成

## レビューアー向け情報

### テスト手順
1. 任意のMarkdownテキストをコピー（例：`# 見出し\n**太字**`）
2. 拡張機能のアイコンをクリック
3. 「🔄 変換実行」ボタンをクリック
4. クリップボードに変換結果が保存されることを確認
5. 「↩️ 元に戻す」ボタンで元のテキストに戻ることを確認

### テスト用サンプルテキスト
```markdown
# メインタイトル
## サブタイトル

これは**太字**で、これは*斜体*です。

- リスト項目1
- リスト項目2

1. 番号付きリスト1
2. 番号付きリスト2

`インラインコード`の例です。

```javascript
console.log("コードブロック");
```

[リンクの例](https://example.com)
```

### 期待される変換結果
```
*メインタイトル
**サブタイトル

これは'''太字'''で、これは''斜体''です。

- リスト項目1
- リスト項目2

+ 番号付きリスト1
+ 番号付きリスト2

{code}インラインコード{/code}の例です。

{code:javascript}
console.log("コードブロック");
{/code}

[[リンクの例:https://example.com]]
```