# Browser Validation Checklist

このTemplateはStatic Validationで確認できない、実ブラウザのLayout / Media / 保存復元 / 主要導線確認用です。

Project Profileと変更内容に合わせて不要項目は削除します。

## 対象

- Project:
- Commit / Build:
- URL:
- Date:
- Tester:

## Browser Matrix

| Browser | Version | OS | Result | Notes |
|---|---|---|---|---|
| Firefox | | | Not verified | |
| Chromium / Chrome | | | Not verified | |

## Viewport / Zoom

- [ ] 通常Desktop幅
- [ ] 低い縦解像度
- [ ] 100% Zoom
- [ ] 125% Zoom
- [ ] 150% Zoom
- [ ] Narrow viewport / Mobile相当（該当時）
- [ ] ページ全体へ不要な横overflowなし
- [ ] fixed / stickyが主要操作を隠さない

## Main Flow

```text
開始
↓

↓
完了
```

- [ ] 主要Navigation
- [ ] 主要Button / Input
- [ ] Loading State
- [ ] Empty State + 復帰導線
- [ ] Error State + Retry / Fallback
- [ ] Success State

## Keyboard / Accessibility

- [ ] Tabで主要操作へ移動できる
- [ ] focus-visibleが確認できる
- [ ] Enter / SpaceでButton相当操作が可能
- [ ] Keyboard Shortcutが入力欄と競合しない
- [ ] reduced-motion利用時に致命的な問題なし（該当時）

## Storage / TOOL

- [ ] 編集
- [ ] 保存
- [ ] 再読み込み
- [ ] 復元
- [ ] Backup → Restore（該当時）
- [ ] 保存失敗時に成功扱いしない
- [ ] 複数タブ競合（重要な場合）

## MEDIA

- [ ] 実際の対象Codecを読み込める
- [ ] 再生 / seek / pause
- [ ] Object URL cleanupを長時間利用で確認（必要時）
- [ ] Canvas / Crop / Geometry
- [ ] 大きいMediaで操作不能にならない

## AI-HANDOFF / Import

- [ ] 現行PackageをImport
- [ ] 旧対応VersionをImport（対応時）
- [ ] 壊れたPackageをError表示
- [ ] Unsupported VersionをError表示
- [ ] Export → Import Round Trip

## Console

- [ ] 起動時重大Errorなし
- [ ] 主要操作後重大Errorなし
- [ ] 404 / failed fetchなし

## Verification State

- [ ] Browser Validated
- [ ] Known Issueを記録
- [ ] Not verified項目を作業報告へ記録

## Notes

- 
