# START HERE

このページは `web-project-guide` の**人間向けRouter**です。詳細Ruleをここへ複製しません。

Meaningful / Systemicな作業では、最初に [Rule Routing / Preflight](docs/21-rule-routing-preflight.md) を確認し、今回必要なOwner Docを決めてから進めます。Machine-readable Routingは [`maintenance/rule-router.json`](maintenance/rule-router.json) が正本です。

## 新しいサイト / アプリ / ゲームを作る

1. [00 Governance](docs/00-governance.md)
2. [01 Requirements](docs/01-requirements.md)
3. [12 Project Profiles](docs/12-project-profiles.md)
4. [21 Rule Routing / Preflight](docs/21-rule-routing-preflight.md)
5. 今回必要な専門Ownerだけ読む
6. 完成前に [07 Testing / Quality](docs/07-testing-quality.md) と [Quality Checklist](templates/QUALITY_CHECKLIST.md)

User-facing UIがある場合は [17 Visual Quality Baseline](docs/17-visual-quality-baseline.md) も確認します。

## 学習・解説サイト

- Requirements / Learning Content → [01](docs/01-requirements.md)
- Project Profile → [12](docs/12-project-profiles.md)
- UI / 読みやすさ → [04](docs/04-ui-ux-accessibility.md)
- 大きなVisual変更 → [18](docs/18-domain-first-visual-research.md)
- 大量Data → [03](docs/03-data-storage.md)

教材が存在するだけで完成扱いせず、Starting Knowledge、学習順、説明深度、理解確認、次の学習導線を確認します。

## ゲーム

- Requirements入口 → [01](docs/01-requirements.md)
- GAME Profile → [12](docs/12-project-profiles.md)
- Game-specific設計 / Completion / Playtest → [19](docs/19-game-development.md)
- Save → [03](docs/03-data-storage.md)
- Performance → [05](docs/05-performance-reliability.md)
- UI / Visual → [04](docs/04-ui-ux-accessibility.md) / [17](docs/17-visual-quality-baseline.md)
- 大きなVisual変更 → [18](docs/18-domain-first-visual-research.md)

主要Flow / Completionへ影響する変更ではActual PlaytestをStatic Testで置き換えません。

## 調査して方針を決める

重要かつ不確実なResearchable Question:

1. [20 Evidence-first Research](docs/20-evidence-first-research.md)
2. Topic-specific Owner
3. Evidence Map / Discussion
4. Project-specific Decision
5. Requirements / Prototype / Validation

単純な事実確認や原因が明確な局所BugへDeep Researchを強制しません。

## 既存サイトのBug Fix

1. Current Repositoryを確認
2. README / Requirements / Spec / Rules / Learningsを必要範囲で確認
3. [10 Project Management](docs/10-project-management.md)
4. 症状に関係する専門Owner
5. Smallest Safe Change
6. [07 Testing / Quality](docs/07-testing-quality.md)

局所BugでFull Guideを読みません。

## UI / 見た目

### 局所Bug

Alignment / overflow / clipping / Component State等:

- [04 UI / UX / Accessibility](docs/04-ui-ux-accessibility.md)
- [17 Visual Quality Baseline](docs/17-visual-quality-baseline.md)
- [07 Testing](docs/07-testing-quality.md)

### Meaningful Visual Change

Layout / Navigation / Theme / Page Composition /大規模Redesign:

1. Current UI / Screenshot / User Feedback
2. [18 Domain-first Visual Research](docs/18-domain-first-visual-research.md)
3. [04 UI / UX / Accessibility](docs/04-ui-ux-accessibility.md)
4. [17 Visual Quality Baseline](docs/17-visual-quality-baseline.md)
5. Browser / Screenshotで最終確認

何度直しても改善しない場合は `18` のVisual Foundation Resetを確認します。

## 保存 / JSON / Migration

- Data / Storage / Import / Restore → [03](docs/03-data-storage.md)
- Version / Compatibility → [09](docs/09-maintenance.md)
- Testing → [07](docs/07-testing-quality.md)

既存Save / Schema変更では `STORAGE-MIGRATION-GATE` を適用します。

## Architecture / Patch整理

- [02 Architecture](docs/02-architecture.md)
- [09 Version / Maintenance](docs/09-maintenance.md)
- [10 Project Management](docs/10-project-management.md)

旧Runtime / Patch / Observer後付けを増やすのではなく正式責務へ統合します。

## GitHub Pages / 公開

- [08 GitHub Pages](docs/08-github-pages.md)
- [10 Project Management](docs/10-project-management.md)
- [07 Testing](docs/07-testing-quality.md)

公開URLを確認できる場合は最終状態と対応するURLを確認します。

## Electron / Windows配布

- [11 Electron / Distribution](docs/11-electron-distribution.md)
- [06 Security](docs/06-security.md)
- [07 Testing](docs/07-testing-quality.md)
- [15 Observability](docs/15-development-observability.md)

Setup.exe / Auto Update / Windows固有機能をCIだけで実機確認済み扱いにしません。

## 外部API / CDN / Supabase

- [05 Performance / Reliability](docs/05-performance-reliability.md)
- [06 Security](docs/06-security.md)
- [13 Dependencies / Assets](docs/13-dependencies-assets.md)
- 保存を伴う場合は [03 Data / Storage](docs/03-data-storage.md)

## AI / Coding Agentへ大きく任せる

- [21 Rule Routing / Preflight](docs/21-rule-routing-preflight.md)
- [10 Project Management](docs/10-project-management.md)
- Projectに`AGENTS.md`があればそのRouter
- 通常と同じTesting / Security / Storage / Visual基準

Memoryや古い会話だけでCurrent Repositoryを推測しません。

## 複数RepositoryのGitHub運用

[16 Cross-Repository GitHub Infrastructure](docs/16-cross-repository-github-infrastructure.md) を確認します。

## Guide自体を改善する

1. [00 Governance](docs/00-governance.md)
2. [21 Rule Routing / Preflight](docs/21-rule-routing-preflight.md)
3. [14 Continuous Improvement](docs/14-continuous-improvement.md)
4. External Evidenceが必要なら [20 Evidence-first Research](docs/20-evidence-first-research.md)
5. 既存Owner / Catalog / Checklist / Project側へ統合できないか確認
6. Owner / Router / Validatorを整合
7. 最終CommitでGuide Validatorを確認

新Rule追加と同時に、重複・History混在・Orphan Ruleを減らせないか確認します。

## 完成前

必要範囲で次を確認します。

- [Quality Checklist](templates/QUALITY_CHECKLIST.md)
- README / Spec / Work Report / Learnings整合
- Cleanup後の最終Commit
- CI / Pages / Regression
- User-facing UIならVisual確認
- 実機が必要ならReal-device確認または未確認明記
- 重大Known Issueが残る場合は完成扱いにしない
