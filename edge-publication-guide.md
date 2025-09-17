# Microsoft Edge Add-ons Store 公開手順書

## 📋 事前準備チェックリスト

### ✅ 完了済み
- [x] 拡張機能パッケージ作成 (`md2backlog-extension-v1.0.1.zip`)
- [x] manifest.json のEdge対応メタデータ追加
- [x] ストア公開用メタデータ準備 (`edge-store-metadata.md`)
- [x] README・CLAUDE.md のEdge対応更新

### 🔄 要対応
- [ ] スクリーンショット・プロモーション画像の作成
- [ ] GitHub URLの更新（`yourusername` → 実際のアカウント名）
- [ ] サポート連絡先の設定
- [ ] プライバシーポリシーページの作成（オプション）

## 🚀 公開手順

### ステップ1: Microsoft Partner Centerアカウント作成
1. **Partner Centerにアクセス**: https://partner.microsoft.com/dashboard/microsoftedge/public/login
2. **Microsoftアカウントでサインイン**（Outlook.com、Live.com、Hotmail.com）
   - GitHub アカウントでのサインインも可能
3. **Microsoft Edge プログラムに登録**
   - 個人アカウント：検証が早い（数分～数時間）
   - 企業アカウント：検証に数日～数週間

### ステップ2: 拡張機能の申請
1. **新しい申請を開始**
   - Partner Centerダッシュボードから「新しい拡張機能」を選択
2. **パッケージをアップロード**
   - `md2backlog-extension-v1.0.1.zip` をアップロード
3. **基本情報を入力**
   - 名前: Markdown to Backlog Converter
   - カテゴリ: Developer tools
   - 価格: 無料

### ステップ3: ストア情報の設定
1. **表示設定**
   - 表示: Public（推奨）
   - 対象市場: 全世界または日本・アメリカなど主要市場
2. **説明文・メタデータ**
   - `edge-store-metadata.md` の内容を参考に入力
3. **メディアファイル**
   - アイコン: 既存のicon*.pngを使用
   - スクリーンショット: 作成が必要
   - プロモーション画像: オプション

### ステップ4: 権限・プライバシー設定
1. **権限の説明**
   - clipboardRead: クリップボードからテキスト取得
   - clipboardWrite: 変換結果の書き込み
2. **プライバシー情報**
   - データ収集なし
   - 外部送信なし
   - ローカル処理のみ

### ステップ5: 申請・審査
1. **テスト情報の記載**
   - `edge-store-metadata.md`のテスト手順を参考
2. **申請送信**
   - 最大7営業日で審査完了
3. **承認後の公開**
   - 自動的にMicrosoft Edge Add-onsストアに公開

## 📊 申請に必要な情報まとめ

### 基本情報
| 項目 | 内容 |
|------|------|
| 拡張機能名 | Markdown to Backlog Converter |
| 短い説明 | Convert Markdown to Backlog notation quickly |
| カテゴリ | Developer tools |
| 価格 | 無料 |
| サポートサイト | GitHub Issues ページ |

### 権限
| 権限 | 理由 |
|------|------|
| clipboardRead | クリップボードからMarkdownテキストを読み取り |
| clipboardWrite | 変換したBacklog記法テキストをクリップボードに書き込み |

### 必要ファイル
- ✅ `md2backlog-extension-v1.0.1.zip` - 拡張機能パッケージ
- ✅ `icon16.png`, `icon32.png`, `icon48.png`, `icon128.png` - アイコン
- ⚠️ スクリーンショット（1-5枚）- 作成が必要

## 🎯 今すぐできること

### 1. Partner Centerアカウント作成
**すぐに実行可能**
- https://partner.microsoft.com/dashboard/microsoftedge/public/login
- Microsoftアカウント（またはGitHubアカウント）でログイン
- Microsoft Edge プログラムに無料登録

### 2. スクリーンショット作成（推奨）
- 拡張機能の使用画面をキャプチャ
- 1280x800px または 1366x768px 推奨
- PNG形式

### 3. GitHub情報の更新
- `manifest.json`の`homepage_url`を実際のGitHub URLに変更
- README.mdのリンクも合わせて更新

## 🔍 審査のポイント

### ✅ 承認されやすいポイント
- シンプルで明確な機能
- プライバシーに配慮（ローカル処理のみ）
- 適切な権限要求
- 詳細なメタデータ

### ⚠️ 注意すべき点
- 権限の説明を明確に記載
- テスト手順を詳しく説明
- スクリーンショットで機能を明示
- プライバシーポリシーの明記

## 📞 サポート情報

### Microsoft Edge Add-ons サポート
- **メール**: ext_dev_support@microsoft.com
- **サポートチケット**: Partner Center内から作成可能

### 審査期間
- **通常**: 3-5営業日
- **最大**: 7営業日
- **年末年始・大型連休**: 延長の可能性

## 🎉 公開後の管理

### アップデート
- Partner Center経由で新バージョンをアップロード
- REST API使用でCI/CD統合も可能

### 統計・分析
- Partner Centerダッシュボードでダウンロード数・評価を確認

### ユーザーサポート
- GitHub Issuesでバグ報告・機能要望を受付

---

**今すぐ始められる**: Partner Centerアカウント作成と基本申請は完了可能です！