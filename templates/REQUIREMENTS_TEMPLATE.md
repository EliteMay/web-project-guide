# 要件定義

このTemplateはProject固有の**現在のRequirement Contract**を書くためのCore Templateです。Common Rule本文や実装履歴を複製しません。

Domain固有項目は [Conditional Packs](requirements/README.md) から該当するものだけ使います。

## 0. Guide / Project Profile

- Adopted Guide Version:
- Profiles: STATIC / DATA / LEARNING / GAME / MEDIA / AI-HANDOFF / CLOUD / ELECTRON / TOOL / PUBLIC-CONTENT

## 0A. Decision / Assumption

会話でのDecision Contractは [01 Requirements](../docs/01-requirements.md) を正本とします。

- Agent autonomy: Best Reasonable Decision by default
- Existing User Intent / Current Contractから確定できるCore Decisions:
- High-cost / Risk Decisionsとsafe / reversible default:
- Blocking User Decisions（本当にUserにしか決められないものだけ）:
- Important Assumptions:

`Core` / `High-cost`という分類だけを理由にUser回答待ちにしません。Current Repository、正式Requirements、既存User Intent、Evidence、Compatibility / Rollbackから合理的に決められる場合は記録して進めます。

## 1. 目的 / 成功条件

- Project purpose:
- Userが最終的にできるようになること:
- Success signal:

## 2. 使用者 / 利用環境

- Primary user:
- 公開範囲: 自分のみ / 友人共有 / 一般公開
- 主な端末:
- 主なブラウザ / Runtime:
- Offline利用:

## 3. Scope

### MVP / 今回必須

- 

### Non-goals / 今回やらない

- 

### Later / 後回し

- 

## 4. 主要利用フロー

```text
開始
↓

↓
完了
```

## 5. 画面 / Surface

| 画面・Surface | 目的 | 主操作 | 重要状態 |
|---|---|---|---|
| | | | Loading / Empty / Error / Success |

## 6. Conditional Requirement Packs

該当するものだけ追加・Linkします。

- [ ] [Visual / UI](requirements/VISUAL.md)
- [ ] [Learning](requirements/LEARNING.md)
- [ ] [Game](requirements/GAME.md)
- [ ] [Diagnostics](requirements/DIAGNOSTICS.md)

Project固有の追加Packが必要なら、Common Guideを増やす前に対象Project側へ置くことを優先します。

## 7. Data / Storage

詳細Ruleは [03 Data / Storage](../docs/03-data-storage.md) を正本とします。

| Data | Source of Truth | Schema / ID | 保存先 | 想定量 |
|---|---|---|---|---|
| | | | | |

- Existing data / save compatibility:
- Backup / Restore requirement:
- Migration requirement:
- 未保存状態 / 複数Tab競合（該当時）:

## 8. External Dependencies / Deployment

- API / Provider:
- CDN / Assets:
- DB / Auth:
- GitHub Pages / Electron / Other:
- 無料枠 / 維持費の制約:
- Provider failure時のFallback:
- Service停止時にも残すCore機能:

## 9. 崩してはいけない仕様

1. 
2. 
3. 

## 10. High-cost / Hard-to-change Decisions

Projectに該当するものだけ記録します。

- Storage / Schema / ID:
- URL / Deployment / Release:
- Navigation / Information Architecture:
- External Provider / Auth:
- Units / Coordinates / Time:
- Cross-module contract:
- その他:

各項目で必要に応じて、理由 / Compatibility / Rollback / safe alternativeを残します。User確認は [01 Requirements](../docs/01-requirements.md) のUser Decision条件に該当する場合だけBlockingにします。

## 11. 変更可能範囲

### 原則として改善してよい

- 

### Agentが慎重に扱うHigh-risk範囲

- 

### Blocking User Decisionが必要な例外

- 

## 12. Performance / Scale Constraints

詳細Ruleは [05 Performance / Reliability](../docs/05-performance-reliability.md) を正本とします。

- 想定Data / Item量:
- 想定Media量:
- 初期表示で重要なResource:
- 長時間処理 / Cancel requirement:
- Runtimeで重くなりやすい代表状態:

## 13. Completion Contract

詳細な実行確認は [Quality Checklist](QUALITY_CHECKLIST.md) と、今回RoutingされたOwner Docを使います。Domain-specific Checklistをここへ複製しません。

Project固有の完成条件:

- [ ] 主要利用フローがEnd-to-Endで成立
- [ ] 崩してはいけない仕様を維持
- [ ] 該当する保存 / Migration / External dependency contractを満たす
- [ ] 必要なStatic / Runtime / Browser / Visual / Playtest / Real-device Validationを実施、または未確認を明記
- [ ] 必要なDocumentationがCurrent Stateと一致
- [ ] 重大Known Issueが残っていない、または完成不可として明示
- [ ] 実装を止めるBlocking Decisionがない、またはNot readyとして明示

追加Project-specific completion:

- [ ] 

## 14. 未確認 / Known Limitations

- 

## 15. Implementation Handoff

詳細Workflowは [01 Requirements](../docs/01-requirements.md) を正本とします。

- Status: Ready for implementation / Not ready
- Requirements updated:
- GitHub save verified: Yes / No
- Blocking Decisions: None / 
- Important Assumptions: None / 
- Implementation conversation: `Repository名（実装）`
