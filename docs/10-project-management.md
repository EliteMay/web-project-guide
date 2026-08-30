# 10 GitHub中心のプロジェクト管理

## 基本方針

Web制作ではGitHubリポジトリを基本の保存・管理先とします。

既存プロジェクトでは、特別な理由がない限り、古いZIPや過去の会話より**現在のGitHubリポジトリを最新状態の基準**とします。

## 変更前に確認するもの

必要に応じて以下を確認します。

- README.md
- 仕様書
- 作業報告書 / CHANGELOG
- package.json等
- ファイル構成
- HTML / CSS / JavaScript
- JSON / Schema
- 保存形式
- localStorage / IndexedDBのKey
- GitHub Pages設定
- Tests / GitHub Actions
- プロジェクト固有ルール

すべてを毎回読むのではなく、変更内容に関係する範囲を優先します。

## 既存プロジェクトの変更手順

基本的に以下の順番で作業します。

1. 現在のリポジトリを確認
2. README・仕様を確認
3. 変更対象を特定
4. 影響範囲を確認
5. 変更経路を選ぶ
6. 実装・修正
7. 関連ファイルとの整合性確認
8. 一時Script / 一時Workflow / Debug資産をCleanup
9. **Cleanup後の最終Commit**で動作確認・Regression・CI / Pages確認
10. README・作業報告更新
11. 未確認事項を記録

## GitHubへの変更経路を選ぶ

変更内容に対して最も小さく安全な経路を選びます。

### SHOULD: 小規模で変更箇所が明確な場合

GitHub上の対象ファイルを直接更新して構いません。

例:

- 文言修正
- 1〜数ファイルの明確なバグ修正
- README / JSON / CSSの局所変更
- 既存テストで十分に回帰確認できる変更

**単発のファイル書換えのためだけにGitHub Actionsや補助Scriptを新設しません。**

### SHOULD: 複数ファイル・高リスク・設計変更の場合

Branch / Pull Requestを優先します。

例:

- 保存形式やSchema変更
- 共通Runtime変更
- 大規模UI変更
- 複数の主要機能へ影響する変更
- Guide / CI / Deployment等、プロジェクト全体の運用を変える変更

PRを使う場合は、CI結果とDiffを確認してからMergeします。

### CONDITIONAL: GitHub Actionsを使う場合

GitHub Actionsは、**継続的に必要な自動化そのもの**が目的の場合に使います。

例:

- Static Validation
- Test
- Build
- Deploy
- Release
- 定期的な自動処理

一方で、ChatGPTやGitHub API等から対象ファイルを直接更新できる状況で、単発修正のPatch EngineとしてWorkflowを追加するのは避けます。

やむを得ず一時Workflow / Scriptを使う場合は以下を守ります。

- 目的と削除条件を明確にする
- 本番Runtimeへ影響しない場所へ置く
- 作業終了前に削除する
- 削除Commit後の最終状態でもう一度CI / Pagesを確認する

## Final Stateを基準にする

途中CommitのCI成功やPages成功は、**最終Commitの品質保証ではありません**。

次のような変更が後から入った場合は、最終状態で再確認します。

- 一時Workflow / Script削除
- Cache Revision変更
- README / 設定ファイル更新
- Asset Path変更
- Build / Version整合修正
- Cleanup Commit

「途中では通っていた」ではなく、ユーザーへ渡す最終main / Merge Commitの状態を確認済みにします。

## 原則としてそのまま改善してよい範囲

既存仕様や保存互換性を壊さない場合、以下は原則としてそのまま改善して構いません。

- 明確なバグ修正
- 軽微なUI改善
- コード整理
- 重複コード削減
- 読み込み速度改善
- アクセシビリティ改善
- 分かりにくい文言の改善
- パスミス修正
- JSON整理
- READMEの不足情報追加

ただし、「軽微」に見えても保存形式・共通Runtime・主要導線へ影響する場合は影響確認を優先します。

## 確認が必要な変更

以下は勝手に確定しません。

- 主要機能の削除
- 大幅なUI変更
- 保存形式変更
- データ互換性を壊す変更
- 既存URL変更
- 外部サービスへの移行
- 有料サービス導入
- 公開範囲変更
- GitHub Pages非対応化
- Web版とElectron版の切り替え

必要な場合は以下を整理します。

- 変更理由
- 影響する機能
- 影響するファイル
- 保存互換性への影響
- メリット
- デメリット
- 代替案
- Rollback可否

## 関連機能への影響確認

変更時には必要に応じて以下を確認します。

- HTMLとJSのID / class
- CSS変更の他画面への影響
- JSON構造
- Schema Version
- localStorageキー
- IndexedDB Store / Key
- 既存保存データ
- URL
- ファイルパス
- GitHub Pagesの相対パス
- event listener
- import / fetch
- 共通コンポーネント
- Service Worker / Cache
- Version / Build表示
- GitHub Actions / Deployment trigger

## README.md

原則としてREADME.mdを用意します。

最低限記載します。

- プロジェクトの目的
- 主な機能
- 崩してはいけない仕様
- 利用方法
- GitHub Pages利用方法（対応時）
- ファイル構成
- データ保存場所
- 設定保存方法
- 外部サービス
- 注意点
- 既知の問題
- 開発・更新時の注意

READMEには現在仕様を中心に書きます。
長い変更履歴は作業報告書やCHANGELOGへ分離します。

## 作業報告書

必要に応じて `作業報告書.md` を用意・更新します。

記録内容:

- 今回変更した内容
- 変更ファイル
- 修正した不具合
- 追加機能
- 削除内容
- 保存・互換性への影響
- 未完了
- 確認できなかったこと
- 既知の問題
- 今後必要な作業

未確認事項を確認済みとして扱いません。

## GitHub Pages

HTML / CSS / JavaScriptだけで成立するサイトは、可能な限りGitHub Pagesで直接利用できる構成を優先します。

できるだけ以下への依存を避けます。

- start.bat
- ローカルサーバー
- Node.js常時実行
- localhost
- PC固有の絶対パス

GitHub Pagesで実現できない機能が必要な場合だけ別方式を検討します。

詳細は `08-github-pages.md` を参照してください。
