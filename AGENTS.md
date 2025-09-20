# Repository Guidelines

## プロジェクト構成とモジュール整理
- `src/` には Manifest V3 拡張の中核である `manifest.json`、`popup.html`、`popup.js`、`converter.js`、各種アイコンが揃っております。アンパック読込時は常にこのディレクトリを選択してください。
- `tests/` には場面別の Node スクリプトが配置されています。変換ロジックを変更された際は、該当する `test-*.js` を追加または改訂し、振る舞いを確認願います。
- `dist/` フォルダは公開用 zip を保管する場所です。必ず現行の `src/` から再作成し、古い成果物は誤配布防止のためリネームしてください。
- `docs/` はストア掲載文や公開手順を管理する場所、`sample_data/` は手動検証用 Markdown の保管場所です。ドキュメント更新時はこれらも併せて整えてください。
- ルートにある `README.md`、`RELEASE.md`、`edge-publication-guide.md` などは外部公開時の一次情報です。仕様変更のたびに差分を反映し、利用者が迷わないようご配慮ください。
チームでのリリース作業は main branch を最新化したうえで進め、`dist/` と docs を同じコミットにまとめると履歴が追いやすくなります。

## ビルド・テスト・開発コマンド
- ビルドツールは不要です。`chrome://extensions` または `edge://extensions` を開き、デベロッパーモードで `src/` を読み込んでください。
- 変換ロジックを素早く検証されたい場合は、以下のワンライナーで対象テストを差し替えて実行してください。
  ```
  node -e "globalThis.window={};eval(require('fs').readFileSync('src/converter.js','utf8'));require('./tests/test-converter.js');"
  ```
- 配布物を更新する際は `powershell Compress-Archive src dist/md2backlog-extension-<version>.zip -Force` で再圧縮し、バージョン番号を最新化してください。
実機検証では Chrome と Edge の両方で拡張を読み込み、コンソールに warning が出ていないか developer tools で確認していただけますと安心です。

## コーディングスタイルと命名規則
- インデントは 4 スペース、文字列はシングルクォート、行末にはセミコロンを付けて統一してください。複数行文字列にはテンプレートリテラルを推奨いたします。
- クラス名は PascalCase（例: `MarkdownToBacklogConverter`）、関数や変数、DOM ID は camelCase をご利用ください。
- 日本語 UI 文言は UTF-8 で管理し、`popup.html`、`popup.js`、関連ドキュメントで表記ゆれが生じないよう丁寧に確認してください。
翻訳や文言の修正は branch 名に `docs/` プレフィックスを付けると履歴が分かりやすく、ローカライズ担当との連携も円滑になります。

## テスト方針
- 新しい Markdown 記法を追加された際は、`tests/` に `test-<topic>.js` を作成し、期待される入出力を明示してください。
- 仕様表を掲載している `README.md` の変換テーブルを必ず更新し、コードとドキュメントの整合性を保ってください。
- 手動 QA は `sample_data/sample.md` を活用し、クリップボードのコピー・変換・復元の流れを一度は確認してください。
自動テストと手動テストの結果は pull request の description に記載し、再現手順と使用した command を共有していただけると助かります。

## コミットとプルリクエストの流れ
- コミットサマリは「Add Edge browser support」のような英語の命令形で簡潔にまとめ、本文では目的とテスト結果を丁寧に記してください。
- プルリクエストでは利用者への影響、関連 Issue、UI 変更時のスクリーンショット、再生成した zip や manifest の変更点を整理してご報告ください。
- 権限や `homepage_url` を調整された場合はレビュアーに明確にお伝えし、公開手順書の更新要否も併せて共有してください。
レビューの往復は respectful communication を心がけ、提案には背景・理由・代替案を添えて Slack などの記録に残る場所で共有してください。

## セキュリティと設定のヒント
- `clipboardRead` と `clipboardWrite` 以外の権限追加が必要になった場合は、理由と代替案を丁寧に検討し、事前にチームへご相談ください。
- `manifest.json` の `content_security_policy` は最小構成になっております。外部リソースを追加される際は影響範囲を洗い出し、レビュー手順を踏んでください。
- 公開 URL や配布ファイルのリンク先は必ず実際のリポジトリに向けて維持し、利用者へ誤情報を届けないよう細心の注意を払ってください。
security review のメモは docs/ 以下にまとめ、将来の監査の際に参照できるよう PR と紐付けてください。

## チーム内コミュニケーション
- Issue コメントやレビューでは、敬語と感謝の表現を心がけ、背景説明を添えてやり取りしてください。
- 作業の引き継ぎや依頼を行う際は、最新の状況・未実施タスク・想定リスクを整理し、相手の作業時間に配慮したスケジュールでお願い申し上げます。
- 不明点があれば遠慮なく相談し、回答時も根拠と補足資料を添えて齟齬を防いでください。
週次の sync では agenda を事前共有し、meeting 後に短いまとめを issue に残して丁寧な情報共有をお願いいたします。

ドキュメントに関する質問は discussion board や Slack channel #md2backlog までお気軽にお願いいたします。
