# 要件定義

## 0. Guide / Project Profile

- Adopted Guide Version:
- Profiles: STATIC / DATA / MEDIA / AI-HANDOFF / CLOUD / ELECTRON / TOOL / PUBLIC-CONTENT

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

## 5A. Visual Design Direction（必要時）

- Visual Quality重要度: low / normal / high
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
- 構造的に異なるDesign Directionを比較する: Yes / No
- 比較案A:
- 比較案B:
- 比較案C:
- 採用Directionと理由:
- DesignShelfを構造探索に使う: Yes / No
- 避けたいAI Template Pattern:

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
- [ ] Visual重視Projectでは採用Design Directionと理由を記録
- [ ] Visual重視Projectでは色 / Effectを外しても主要Hierarchyが成立
- [ ] 未確認事項が明示されている

## 15. 未確認予定

- 
