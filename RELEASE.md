# GitHub Release 作成手順

## 🚀 GitHub Releasesでの配布手順

### 前提条件
- GitHubリポジトリが公開済み
- v1.0.1 タグが作成済み ✅
- 配布用zipファイルが準備済み ✅

### Release作成手順

1. **GitHubリポジトリにアクセス**
   - https://github.com/okuo/md2backlog-extension

2. **Releasesページに移動**
   - リポジトリページの右側「Releases」をクリック
   - または直接 `https://github.com/okuo/md2backlog-extension/releases`

3. **新しいReleaseを作成**
   - 「Create a new release」をクリック
   - 「Choose a tag」で `v1.0.1` を選択

4. **Release情報を入力**

   **Release title**: `v1.0.1 - Chrome and Edge Support`

   **Describe this release**:
   ```markdown
   ## 🎉 Chrome & Microsoft Edge 対応リリース

   ### ✨ 新機能
   - Microsoft Edge ブラウザ対応
   - クロスブラウザ互換性の向上

   ### 📦 配布パッケージ
   - Chrome Web Store 申請用パッケージ
   - Microsoft Edge Add-ons Store 申請用パッケージ

   ### 🔧 技術的改善
   - manifest.json に Edge 対応メタデータ追加
   - 最小 Edge バージョン要件: 88.0.0
   - ドキュメント更新（README.md, CLAUDE.md）

   ### 📋 インストール方法

   #### 開発者モード（すぐに使用可能）
   1. zipファイルをダウンロード
   2. 解凍して `src` フォルダを抽出
   3. ブラウザの拡張機能ページで「開発者モード」を有効化
   4. 「パッケージ化されていない拡張機能を読み込む」で `src` フォルダを選択

   #### ストア公開版（準備中）
   - Chrome Web Store: 審査中
   - Microsoft Edge Add-ons: 審査中

   ### 🐛 バグ修正
   - なし（初回 Edge 対応リリース）

   ---

   **Full Changelog**: https://github.com/okuo/md2backlog-extension/compare/v1.0.0...v1.0.1
   ```

5. **ファイルをアップロード**
   - 「Attach binaries by dropping them here or selecting them」エリアに以下をドラッグ&ドロップ：
     - `md2backlog-extension-chrome-v1.0.1.zip`
     - `md2backlog-extension-edge-v1.0.1.zip`

6. **Release設定**
   - ☑️ 「Set as the latest release」をチェック
   - ☐ 「Set as a pre-release」はチェックしない（正式版のため）

7. **Publishを実行**
   - 「Publish release」ボタンをクリック

## 📋 アップロードするファイル

| ファイル名 | 用途 | サイズ |
|----------|------|--------|
| `md2backlog-extension-chrome-v1.0.1.zip` | Chrome Web Store申請用 | ~14KB |
| `md2backlog-extension-edge-v1.0.1.zip` | Edge Add-ons Store申請用 | ~14KB |

## ✅ Release後の確認事項

1. **ダウンロードリンクの確認**
   - Chrome: https://github.com/okuo/md2backlog-extension/releases/download/v1.0.1/md2backlog-extension-chrome-v1.0.1.zip
   - Edge: https://github.com/okuo/md2backlog-extension/releases/download/v1.0.1/md2backlog-extension-edge-v1.0.1.zip

2. **README.mdの更新**
   - ダウンロードリンクが正しく表示されるか確認
   - `yourusername` を実際のGitHubユーザー名に更新

3. **ストア申請への活用**
   - Chrome Web Store: `md2backlog-extension-chrome-v1.0.1.zip` を使用
   - Edge Add-ons Store: `md2backlog-extension-edge-v1.0.1.zip` を使用

## 🔄 今後のアップデート手順

1. `src/manifest.json` のバージョンを更新
2. 変更内容をコミット
3. 新しいタグを作成: `git tag -a v1.0.2 -m "Release v1.0.2 - 新機能の説明"`
4. zipファイルを再作成
5. 新しいReleaseを作成
6. ストアで新バージョンを申請

---

**今すぐ実行**: 上記手順でGitHub Releaseを作成し、配布を開始しましょう！