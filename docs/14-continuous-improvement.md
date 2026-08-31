# 14 Continuous Improvement / 定期レビュー

`web-project-guide` を一度作って終わりにせず、実プロジェクトの経験とWeb標準の変化から継続的に改善するための運用ルールです。

設定の正本は [`maintenance/review-policy.json`](../maintenance/review-policy.json) とします。

## 目的

定期レビューでは次の2種類の情報を集めます。

1. **Project Feedback Loop** — 実際に制作したサイトから、繰り返した失敗・高コスト修正・再利用価値のある設計を抽出する。
2. **Web Standards / Design Systems Loop** — W3C / MDN / web.dev / OWASP / GitHub / Electron / 公式Design System等の一次資料を確認し、Guideに不足・陳腐化がないか確認する。

## MUST: 他プロジェクトは原則Read-only

定期レビューが自動で書き換える対象は `EliteMay/web-project-guide` のみとします。

他のWeb / Electron Repositoryは、Guide改善のための調査対象として読みますが、定期レビューだけを理由に自動修正しません。

他Repositoryに重大な問題を発見した場合は、その問題をGuideのFailure / Anti-Pattern / Checklistへ還元し、対象Projectの修正は別作業として扱います。

## Repository Review

毎回、固定された古いRepo一覧だけを使わず、GitHub上でアクセス可能な `EliteMay` のRepositoryを再取得します。

重点的に見るもの:

- `PROJECT_LEARNINGS.md` — 存在する場合は最優先Evidenceの1つ
- 前回レビュー以降のCommit / 変更ファイル
- README / 仕様書 / 作業報告 / CHANGELOG
- Visual Design Direction / Layout Structure / 同じAI Template Patternの反復
- DesignShelfを使った場合の採用LayoutとProject固有への変形
- Diagnostic設計 / Export Schema / Error ID / Breadcrumb
- 保存Schema / Storage Key / Migration
- GitHub Actions / Test
- Versioned Patch / Duplicate Runtime
- hardcode / Single Source of Truth違反
- UI / Storage / Pages / Electronで修正回数が多かった箇所
- 新しく採用され、複数Projectへ再利用できそうな成功設計

`PROJECT_LEARNINGS.md` に `Guide candidate: yes` がある項目は優先的に確認します。

Diagnostic LogそのものがGitHubへ保存されていない場合でも、作業報告やLearningに残されたError ID / Root Cause / Regression GuardをEvidenceとして利用します。

毎週すべてのCodeをゼロから精読するのではなく、**差分を先に見て、必要なProjectだけ深掘り**します。

月1回程度は、差分だけでは見つけにくい長期的な構造問題を探すDeep Reviewを行います。

## Web Standards / Design Systems Review

一般ルールへ追加する場合は、可能な限り一次資料または公式Documentationを優先します。

主な対象:

- W3C / WAI / WCAG
- MDN Web Docs
- web.dev
- OWASP Cheat Sheet Series
- GitHub Docs
- GitHub Primer
- Microsoft Fluent 2
- Apple Human Interface Guidelines
- Electron Documentation
- WHATWG HTML Living Standard

Visual Designの調査では、実在企業Siteの表層をコピーするのではなく、公式Design System等からLayout / Typography / Spacing / Hierarchy / Navigation / Component consistencyの一般化可能な考え方を確認します。

個人BlogやSNSの流行だけを根拠にGuideのMUSTへ昇格させません。

Community情報は候補発見に利用しても、一般ルールへする前に公式仕様・実測・複数Projectでの再現性を確認します。

## 変更を採用する条件

### Project由来

次のいずれかを満たす場合にGuide化を検討します。

- 複数Projectで同じ失敗が起きた
- 1回でも修正コストが非常に高かった
- データ消失・互換破壊・公開事故など重大度が高い
- 同じ成功パターンが複数Projectで効果を示した
- 今のGuideを守っていても防げなかった問題が見つかった
- Diagnostic / Project Learningによって同じ失敗経路が繰り返し確認された
- 複数Projectが色違いだけの同一Visual Structureへ収束している

### Web標準 / Design System由来

- 現行Guideと公式推奨が矛盾している
- 新しいBrowser / Platform標準によって従来ルールが不要・危険になった
- Security / Accessibility / Performanceで重要な変更があった
- GitHub Pages / Electron等、利用中Platformの仕様変更がある
- Visual Designの公式Guidanceで、Layout / Typography / Spacing / Navigation等の重要な変化や新しい知見がある

## Rule Strengthをむやみに上げない

新しい知見は最初からMUSTへしません。

判断目安:

- **MUST** — データ消失、安全性、重大な互換破壊、ほぼ例外のない基盤ルール
- **SHOULD** — 多くのProjectで有効だが例外がある
- **MAY** — 条件次第で有効
- **CONDITIONAL** — 特定Profile / 技術を使う場合だけ適用

詳細は [`00-governance.md`](00-governance.md) を正本とします。

## 自動更新してよい範囲

低リスクで根拠が明確なGuide変更は、Validation成功を条件に直接更新できます。

例:

- Reference URL更新
- 誤記修正
- Catalog相互リンク追加
- 既存ルールの説明補強
- 実例追加
- Checklistの明確化
- 新しいFailure / Success Patternの追加で既存方針を反転しないもの

## Branch / Proposalを優先する変更

次は影響が大きいため、定期レビューだけで無条件にmainへ確定しません。

- MUSTの追加・削除
- 制作優先順位の変更
- Governance / Source of Truth優先順位変更
- Storage / DeploymentのDefault方針変更
- 既存Projectへ大規模Migrationを要求するルール
- GitHub Pages / Electronの基本方針反転
- 全Projectへ固定Layout / Visual Styleを強制する方針

この場合はBranch / Pull Requestまたは明示的な提案として残します。

## 更新時に同時確認するもの

Guideを変更する場合は必要に応じて次を同時更新します。

- `guide-version.json`
- `CHANGELOG.md`
- `作業報告書.md`
- 関連Docs
- Failure / Success / Anti-Pattern Catalog
- Quality Checklist
- References

Versionを上げる必要がない軽微な誤字修正等は例外とします。

## Validation

変更後は必ずGuide自身のValidatorを最終Commitで通します。

- 必須ファイル
- Markdown Link
- H1
- Guide Version / CHANGELOG一致
- Catalog ID整合

Validation失敗状態を自動更新完了として扱いません。

## No Change / No Commit

定期レビューの目的はCommit数を増やすことではありません。

新しい知見がない場合は、Guideを変更しません。

同じ内容の言い換えや、一般論の水増しだけを理由にVersionを上げません。

## Review Result

意味のある変更を行った場合は、最低限次を記録します。

- 何を調べたか
- どのProject / 公式Sourceから得たか
- 何を変更したか
- なぜ共通ルール化したか
- 互換性への影響
- Validation結果

定期レビューで何も変更しなかった場合は、Repositoryへ空の報告Commitを作る必要はありません。
