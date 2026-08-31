# 10 GitHub中心のプロジェクト管理

## 基本方針

Web制作ではGitHubリポジトリを基本の保存・管理先とします。

既存プロジェクトでは、特別な理由がない限り、古いZIPや過去の会話より**現在のGitHubリポジトリを最新状態の基準**とします。

## 変更前に確認するもの

必要に応じて以下を確認します。

- README.md
- 仕様書
- 作業報告書 / CHANGELOG
- `PROJECT_LEARNINGS.md`
- `AGENTS.md`（存在する場合）
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
2. README・仕様・Project Rulesを確認
3. 変更対象を特定
4. 影響範囲を確認
5. 変更経路を選ぶ
6. 実装・修正
7. 関連ファイルとの整合性確認
8. 一時Script / 一時Workflow / Debug資産をCleanup
9. **Cleanup後の最終Commit**で動作確認・Regression・CI / Pages確認
10. README・作業報告・必要なProject Learningを更新
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

## AI Coding Agentを使う場合

ChatGPT / Codex / Claude / Copilot等が生成したCodeも、通常の変更と同じ品質基準を通します。

### SHOULD: AI出力を「提案 + 実装候補」として扱う

AIがCodeを書いたこと自体を完成条件にしません。

- 現在のRepo / Runtime / Dataを先に確認する。
- 既存のProject Rules / 保存互換性 / Architectureを守る。
- AIが提案したFramework / Library / Storage / Rewriteを理由だけで採用しない。
- 高コスト判断はAI提案でもADR / 影響確認を省略しない。
- 未経験TechnologyでAIへ大きく任せる場合は、Architecture / Security / Deployment / Data persistenceを特にReviewする。
- 「全部書き直した方が綺麗」という提案より、既存ProjectではSmallest Safe Changeを優先する。

AI生成量が多いProjectでも、人間が全行を手で書き直す必要はありません。重要なのは、**何が正しい状態かを定義し、その状態へ到達したことを検証できること**です。

## Specification / Oracle-driven AI Development

AIへ大規模な実装・移植・自動生成を任せる場合、可能なら実装前に「正解を判定するOracle」を用意します。

例:

- 既存Versionと同じ入力に対するGolden Output
- Reference implementationとの結果比較
- Parser / DetectorのRegression Dataset
- Schema / Contract Test
- Screenshot / Geometryの基準
- 保存→再読込→復元のE2E
- 明確なAcceptance Criteria

推奨順序:

```text
Specification / Observable criteria
→ AI implementation
→ Automated comparison / Test
→ Difference analysis
→ Fix
→ Regression guard
```

AI生成を大量に使うほど、曖昧な「良さそう」より**機械的または観測可能な正解判定**の価値が高くなります。

Reference / Golden Testが作れないVisual Design等は、[Visual Design Review Gate](04-ui-ux-accessibility.md#visual-design-review-gate)のような明示的Review工程で補います。

## AGENTS.md

`AGENTS.md` はCoding AgentへProjectの入口を渡すために利用できます。

### SHOULD: Source of Truthを増やすのではなくRouterとして使う

`AGENTS.md`へREADME・仕様書・Project Rulesの全文を複製しません。

役割:

- Agentが最初に読むべきファイル順を示す
- 正確なBuild / Test / Validation commandを示す
- 変更してはいけない仕様の正本へLinkする
- Architecture上の重要な責務 / File ownershipを短く示す
- Storage / Security / Deploymentの高リスク箇所を示す
- 作業後に必ず実行するCheckを示す

Project固有ルールの正本は原則として仕様書 / `PROJECT_RULES.md`等に残し、`AGENTS.md`はそこへ案内します。

### Nested AGENTS.md

Subdirectoryだけ異なるRule / Test / Technologyを持つ場合は、必要に応じてNested `AGENTS.md`を使えます。

ただし、Directoryごとに大量作成するとルール追跡が難しくなるため、**本当にScopeが異なる場合だけ**追加します。

同じ内容をRoot / Nestedへ重複させず、より近いScopeのInstructionが必要な理由を明確にします。

Template: [AGENTS_TEMPLATE.md](../templates/AGENTS_TEMPLATE.md)

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