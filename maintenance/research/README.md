# Guide Research Contracts

`web-project-guide`自身で、まだCommon Ruleへ昇格していない**Current / Pending Research Contract**を保存します。

- Current Project Requirementの存在・優先度はRoot [`REQUIREMENTS.md`](../../REQUIREMENTS.md) を正本とする。
- 一般Research Methodは [`docs/20-evidence-first-research.md`](../../docs/20-evidence-first-research.md) を正本とする。
- Research結果からCommon Ruleへ昇格する運用は [`docs/14-continuous-improvement.md`](../../docs/14-continuous-improvement.md) を正本とする。
- このDirectoryへCommon Rule本文を作らない。
- Research完了・実装済みになったContractは、必要な恒久RuleをOwnerへ移した後、Current Requirementから退役させる。

## Current / Pending

- [`requirements-decision-system.md`](requirements-decision-system.md) — Phase 1 Requirements Decision System
- [`external-integration-decision-system.md`](external-integration-decision-system.md) — Phase 19 External Integration Decision System
- [`content-depth-reinforcement.md`](content-depth-reinforcement.md) — 現在壊れてはいないが、次回要件定義で内容を厚くする価値がある領域の候補。Defect / 修正Findingとは分けて扱う。

次回のGuide要件定義・補強では、Current Ownerを再確認したうえで`content-depth-reinforcement.md`も読み、既に解消済みの項目をそのまま再要件化しない。
