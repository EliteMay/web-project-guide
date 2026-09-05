# 要件定義

## 0. Guide / Project Profile

- Adopted Guide Version:
- Profiles: STATIC / DATA / LEARNING / GAME / MEDIA / AI-HANDOFF / CLOUD / ELECTRON / TOOL / PUBLIC-CONTENT

## 0A. 要件定義の決定モード

会話での進め方は [Interactive Requirements Workflow](../docs/01-requirements.md#対話型要件定義-workflow) を正本とします。

- Recommendation-by-default: Yes / No
- Userが決めるCore Decisions:
- User確認が必要なHigh-cost / Risk Decisions:
- Userが`ここは考えたい`等で自動決定を止めた項目:

## 1. 目的

- 

## 2. 使用者・公開範囲

- 自分のみ / 友人共有 / 一般公開:
- 主な端末:
- 主なブラウザ:
- Offline利用:

## 3. 必要機能

### MVP

- 

### 後回し

- 

## 4. 主要利用フロー

```text
開始
↓

↓
完了
```

## 5. 画面構成

| 画面 | 目的 | 主操作 | 重要状態 |
|---|---|---|---|
| | | | Loading / Empty / Error / Success |

## 5A. Visual Quality / Design Direction

User-facing UIがある場合、[Visual Quality Baseline](../docs/17-visual-quality-baseline.md)は必須です。

- User-facing UI: Yes / No
- Visual Quality Baseline: Required / Not applicable
- Visual Ambition: baseline / high / flagship
- Design Concept:
- Reference Direction:
- Layout Type:
- Navigation Type:
- Content Density: low / medium / high
- Typography Direction:
- Color Rule:
- Component Rule:
- Decorative Effect Policy:
- Wireframeを先に作る: Yes / No
- 構造的に異なるDesign Directionを比較する: Yes / No / Not needed
- 比較案A:
- 比較案B:
- 比較案C:
- 採用Directionと理由:
- DesignShelfを構造探索に使う: Yes / No
- 避けたいAI Template Pattern:
- 最終Visual確認方法: Browser / Screenshot / Real device / Other

`baseline`は「見た目を省略する」という意味ではなく、全User-facing UIに必要な最低品質です。`high / flagship`ではより強いDirection比較・Signature・Visual Reviewを追加します。

## 5B. Learning Content — `LEARNING` Profileのみ

詳細基準は [要件定義 Learning / Explanation Content](../docs/01-requirements.md#learning--explanation-content) を正本とします。

- Target learner:
- Starting Knowledge:
- 最初に説明が必要な前提概念:
- Primary Learning Surface:
- Learning order:
- Learner-facing language:
- 英語 / 略語の扱い:
- 主要LessonのContent Depth Contract:
  - What / 定義:
  - Why / 必要性:
  - How / 仕組み・考え方:
  - Example:
  - Comparison / Common mistake:
  - Understanding check:
- CompletionとUnderstandingを分ける: Yes / No / Not needed
- Review queue / 復習導線:
- Lesson後のNext Step:
- 教材Coverageの確認方法:
- 学習導線Coverageの確認方法:

## 5C. Game Development — `GAME` Profileのみ

詳細基準は [Game Development](../docs/19-game-development.md) を正本とします。Game規模に不要な項目は省略できます。

- Game Overview:
- Core Experience:
- Supporting Systems:
- Non-goals:
- Primary Completion Condition:
- Moment-to-Moment Loop:
- Core Gameplay Loop:
- Progression Loop（該当時）:
- Playable MVP:
- Major Progression（該当時）:
- Failure / Retry Contract（該当時）:
- Save / Reload Contract（該当時）:
- Difficulty / Balance Direction:
- Controls / Tutorial Direction:
- Gameplay Visual / Audio Readability:
- Runtime Performance / Scale:
- Development Phases / Phase Gate:
- Adjustable Parameters:

Prototype / Playable MVP / Main Game Completeを区別し、起動・移動だけをPlayable完成条件にしません。

## 6. データ構成

| データ | 正本 | Schema/ID | 想定最大量 |
|---|---|---|---|
| | | | |

## 7. 保存方法

| データ | 保存先 | Backup | 失敗時 |
|---|---|---|---|
| | | | |

- 未保存変更を持つか:
- 複数タブ競合が問題になるか:

## 8. Development Diagnostics / Project Memory

- `PROJECT_LEARNINGS.md`: Yes / No
- Runtime Diagnosticsが必要か: Yes / No
- Breadcrumbで残す主要操作:
- 捕捉するError / Failure:
- Diagnostic保存先: memory / localStorage / IndexedDB / Electron userData / other
- Log保持上限:
- One-click Diagnostic Export: Yes / No
- Error ID表示: Yes / No
- Health / Diagnostics View: Yes / No
- Productionでも残す診断機能:
- Development onlyにする診断機能:
- Logへ記録禁止するデータ:

## 9. 外部依存

- API:
- CDN:
- DB / Auth:
- YouTube / Supabase等:
- 無料枠 / 維持費:
- 失敗時Fallback:
- サービス停止時に残す基本機能:

## 10. 崩してはいけない仕様

1. 
2. 
3. 

## 11. 高コスト設計判断

- 保存Schema:
- ID:
- 座標 / 時間 / 単位:
- GitHub Pages:
- 大容量Media:
- Migration:
- 外部Provider:
- Player / Controller等の共通契約:
- Diagnostic Schema / Error ID体系:
- Page Structure / Navigation:
- Design Direction:
- Learning order / Content Depth Contract:
- Game Core Experience / Primary Completion Condition:
- Game Save / Failure Contract:

## 12. 変更可能範囲

### 原則として改善してよい

- 

### 確認が必要

- 

## 13. 性能・規模

- 想定Item数:
- 想定画像数 / サイズ:
- 想定動画 / 音声サイズ:
- 初期読込で許容する範囲:
- 長い処理のProgress / Cancel:
- Diagnostic Logの最大量:
- GAMEの場合の想定Entity / Scene / Physics / VFX規模:

## 14. 完成条件

- [ ] 主要利用フローが最後まで通る
- [ ] 保存 / 再読込が正常（該当時）
- [ ] 主要ボタンが反応
- [ ] Error / Empty Stateあり（該当時）
- [ ] 重大な横overflowなし
- [ ] 必要な自動検証成功
- [ ] README / 仕様 / 作業報告更新
- [ ] `PROJECT_LEARNINGS.md`を用意
- [ ] Interactive Projectでは必要なDiagnostics / Exportを確認
- [ ] User-facing UIではVisual Quality Baselineを満たす
- [ ] User-facing UIを変更した場合、最終状態をBrowser / Screenshot等で確認、またはVisual未確認と明記
- [ ] Visual Ambitionがhigh / flagshipでは採用Design Directionと理由を記録
- [ ] Visual Ambitionがhigh / flagshipでは色 / Effectを外しても主要Hierarchyが成立
- [ ] Visual Ambitionがhigh / flagshipではVisual Design Review結果を記録
- [ ] `LEARNING` ProfileではStarting Knowledge / 学習順 / Content Depth Contractを定義
- [ ] `LEARNING` Profileでは主要Lessonが用語紹介だけで終わらず、必要な説明・具体例・理解確認を持つ
- [ ] `LEARNING` Profileでは次の学習 / 復習への導線を確認
- [ ] `GAME` ProfileではCore Experience / Playable MVP / Primary Completion Conditionを定義
- [ ] `GAME` Profileでは現在Phaseの主要Gameplay FlowをRuntimeでEnd-to-End確認
- [ ] `GAME` ProfileではActual Playtestを実施し、Static Testだけで完成扱いしていない
- [ ] `GAME` Profileで永続Saveがある場合、Save / Reload / Existing Saveを必要範囲で確認
- [ ] 未解決のCore Decision / High-cost Decisionが残っていない、または未確定として明示されている
- [ ] 未確認事項が明示されている
- [ ] 要件定義完了時はGitHubへの正式保存成功を確認し、Implementation Handoff Statusを更新

## 15. 未確認予定

- 

## 16. Implementation Handoff

詳細Workflowは [要件定義完了 → GitHub保存 → 実装会話 Handoff](../docs/01-requirements.md#要件定義完了--github保存--実装会話-handoff) を正本とします。

- Status: Ready for implementation / Not ready
- Requirements updated:
- GitHub save verified: Yes / No
- Unresolved Core Decisions: None / 
- Unresolved High-cost Decisions: None / 
- Implementation conversation: `Repository名（実装）`
