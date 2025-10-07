# Markdown to Backlog Converter

MarkdownテキストをBacklog記法に変換するシンプルなブラウザ拡張機能です。Chrome・Microsoft Edge対応。

## 開発背景

ChatGPTなどに代表されるチャットサービスで、課題を取りまとめて整理することが多くなりました。これらのサービスはMarkdown形式で出力することが一般的です。

一方で、最初から昔から使っているプロジェクトでは、Backlog記法のままの場合も多く、Markdown形式のテキストをそのまま貼り付けると記法が正しく表示されません。

この拡張機能は、ChatGPTなどで整理した課題や仕様をBacklog形式のチケットに簡単に貼り付けられるよう、Markdown記法からBacklog記法への変換を自動化します。

## 機能

- クリップボードのMarkdownテキストをBacklog記法に自動変換
- ワンクリックで簡単変換
- 変換前のテキストに戻す機能

## 対応する変換

| Markdown | Backlog記法 | 説明 |
|----------|-------------|------|
| `# 見出し` | `* 見出し` | 見出し |
| `## 見出し2` | `** 見出し2` | 見出し（レベル2） |
| `### 見出し3` | `*** 見出し3` | 見出し（レベル3） |
| `- リスト` | `- リスト` | 箇条書き |
| `* リスト` | `- リスト` | 箇条書き |
| `1. 番号` | `+ 番号` | 番号付きリスト |
| `- [ ] 未完了` | `- [ ] 未完了` | チェックリスト（未完了） |
| `- [x] 完了` | `- [x] 完了` | チェックリスト（完了） |
| `**太字**` | `'''太字'''` | 太字 |
| `*斜体*` | `''斜体''` | 斜体 |
| `~~打消~~` | `%%打消%%` | 打ち消し線 |
| `> 引用文` | `> 引用文` | 引用ブロック |
| `---` | `----` | 水平線 |
| `***` | `----` | 水平線 |
| `[リンク](URL)` | `[[リンク:URL]]` | リンク |
| `` `コード` `` | `{code}コード{/code}` | インラインコード |
| ` ```java ` | `{code:java}コード{/code}` | Javaコードブロック |
| ` ```cs ` | `{code:cs}コード{/code}` | C#コードブロック |
| ` ```その他 ` | `{code}コード{/code}` | 汎用コードブロック |

## 使い方

1. ChatGPT等でMarkdownテキストをコピー（Ctrl+C）
2. ブラウザ拡張のアイコンをクリック
3. 「🔄 変換実行」ボタンをクリック
4. Backlogで貼り付け（Ctrl+V）

### 元に戻す場合

変換完了画面で「↩️ 元に戻す」ボタンをクリックすると、元のMarkdownテキストがクリップボードに復元されます。

## インストール方法

### 開発者モードでインストール

#### Chromeでのインストール
1. Chromeで `chrome://extensions/` を開く
2. 右上の「デベロッパーモード」を有効化
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. `src` フォルダを選択

#### Microsoft Edgeでのインストール
1. Edgeで `edge://extensions/` を開く
2. 左下の「開発者モード」を有効化
3. 「展開して読み込み」をクリック
4. `src` フォルダを選択

### 拡張機能ストアからのインストール

#### Chrome Web Store（公開中）✅
[**Chrome Web Storeからインストール**](https://chromewebstore.google.com/detail/markdown-to-backlog-conve/lpbkebjdelkibmfjicdehhppeeakhjpe)

#### Microsoft Edge アドオン（準備中）
- Microsoft Edge アドオン: 申請準備中

### 配布パッケージのダウンロード（開発者向け）
GitHub Releasesから配布用zipファイルをダウンロードできます：
- **Chrome用**: [md2backlog-extension-chrome-v1.0.1.zip](https://github.com/okuo/md2backlog-extension/releases/download/v1.0.1/md2backlog-extension-chrome-v1.0.1.zip)
- **Edge用**: [md2backlog-extension-edge-v1.0.1.zip](https://github.com/okuo/md2backlog-extension/releases/download/v1.0.1/md2backlog-extension-edge-v1.0.1.zip)

> **一般ユーザーの方**: 上記のChrome Web Storeからのインストールが簡単です

## フォルダ構成

```
src/
├── manifest.json    # 拡張機能の設定
├── popup.html       # ポップアップUI
├── popup.js         # UI制御ロジック
├── converter.js     # Markdown変換ロジック
└── icon*.png        # アイコンファイル

tests/
├── test-manifest-validation.js  # manifest.json バリデーション
└── test-converter.js            # 変換ロジックのテスト
```

## テスト

### manifest.json バリデーション
```bash
node tests/test-manifest-validation.js
```

Chrome Web Store / Edge Add-ons Store の要件をチェック:
- Description の文字数制限 (132文字以内)
- バージョン形式の検証
- 必須フィールドの存在確認

## エラーハンドリング

- **クリップボードが空**：「テキストをコピーしてから実行してください」
- **変換エラー**：「変換に失敗しました」
- **権限エラー**：「クリップボードアクセスが拒否されました」

## 技術仕様

- **Manifest Version**: 3
- **必要な権限**: `clipboardRead`, `clipboardWrite`
- **対応ブラウザ**: Chrome, Edge（Chromium系）

## プライバシーポリシー

この拡張機能は、ユーザーのプライバシーを最大限に尊重します。

詳細は [プライバシーポリシー](PRIVACY.md) をご覧ください。

### データの取り扱い

- **収集するデータ**: なし
- **外部送信**: なし
- **保存するデータ**: なし
- **トラッキング**: なし

### 権限の使用

この拡張機能は以下の権限のみを使用します：

- `clipboardRead`: クリップボードからテキストを読み取るため
- `clipboardWrite`: 変換したテキストをクリップボードに書き込むため

### セキュリティ

- すべての処理はローカル（お使いのブラウザ内）で完結します
- 外部サーバーとの通信は一切行いません
- ユーザーデータは収集・保存・送信されません

### お問い合わせ

プライバシーに関するご質問は、[GitHubのIssueページ](https://github.com/okuo/md2backlog-extension/issues)までお寄せください。

## ライセンス

MIT License