# Guide Research Compatibility / Execution Assets

このDirectoryは `web-project-guide` 自身のResearchで使う**Current execution protocol / benchmark asset**と、過去Link互換のPointerを置きます。

Researchの保存先は役割で分けます。

## Guideへ残す

- Current Common Ruleへ直接関係するPublicで再利用可能なCurated Research → `references/`
- Researchをどう行うかというNormative Method → `docs/20-evidence-first-research.md`
- Guide改善 / Promotion method → `docs/14-continuous-improvement.md`
- 現在実行中のResearch Protocol / Benchmark設計でGuide自身の作業に必要なもの → このDirectory

## Dataへ置く

`EliteMay/web-project-data`へ書込み可能な場合、次の本体はData側へ置きます。

- Promotion済みHistorical Research Contract / Record
- point-in-time Research State / Backlog
- Project-specific Research
- 詳細な内部Evidence / 作業履歴

標準配置:

- Research record: `research/studies/web-project-guide/`
- Point-in-time evidence: `evidence/YYYY/web-project-guide/`

このDirectoryに残る旧Research fileはCompatibility Pointerであり、第二Normative Ownerではありません。

## Current execution asset

- `ai-ui-diversity-benchmark-v0.1/` — AI生成UIの構造的同質化を比較検証するCurrent benchmark protocol。Protocol自体がGuideの改善作業で直接必要なためGuide側へ残します。実際のrun result / snapshotを保存する場合はData側を優先します。

## Current contractとの関係

Research結果がGuideのCurrent behaviorへ昇格した場合は、必ず各`docs/*` Owner / Router / Validator等へ反映します。Research RecordだけをCurrent Ruleとして扱いません。

Active Researchの存在・優先度がCurrent Guide Contractへ影響する場合はRoot `REQUIREMENTS.md`へ**必要なCurrent Contractだけ**を残し、Research notebook全文を戻しません。
