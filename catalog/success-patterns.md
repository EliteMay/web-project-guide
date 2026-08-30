# Success Pattern Catalog

過去プロジェクトで効果が高かった設計を再利用するための一覧です。

## S-001 Single Source of Truth

Version、Schema、件数、教材ルール、データ本体を1か所へ集約する。

効果:
- 表示ズレ減少
- 旧hardcode減少
- Validatorを書きやすい

## S-002 JSON Manifest / Index

大量データを用途別JSONへ分割し、Manifest / Indexだけを入口にする。

効果:
- JSへの直書き防止
- 件数検証
- Lazy Loadしやすい

## S-003 Controller / Adapter

複数の実装を1つの契約へ統合する。

例:
- YouTube / Local Media → Player Controller
- 複数Lyrics Provider → Provider Adapter

## S-004 IndexedDB Media Store

画像・音声・動画・手書き等をIndexedDBへ保存し、localStorageには軽い参照だけを持つ。

## S-005 Schema + Migration

保存データをVersion付きで読み、旧形式をnormalizeしてから利用する。

## S-006 Snapshot

更新後も過去記録の意味を変えたくないデータは開始時点のSnapshotを保存する。

## S-007 Undo / Snapshot / Recovery

削除後Undo、復元直前Snapshot、破損JSON退避など、「戻れる」設計を持つ。

## S-008 Data Diagnostics

自動修正する前に、重複・壊れた参照・不正値を確認できる診断画面を持つ。

## S-009 Human-in-the-loop

自動検出・AI判定には手動修正とConfidence/要確認を用意する。

## S-010 Feedback Package

AIへ渡すデータを、その場限りの文章ではなく固定Schema/ZIPで書き出す。

例:

```text
manifest.json
input-data.json
notes.txt
images/
return.schema.json
```

## S-011 Regression Dataset

Parser / Detector / 自動分類は、実例を集めて同じCaseで比較できるようにする。

## S-012 GitHub Actions Validation

最低限JS/JSON/参照切れをpush時に自動検証する。

## S-013 Browser E2E

Canvas、2Pane、主要導線などStatic Checkでは分からない部分をFirefox/Chromiumで実際に通す。

## S-014 Product Shell

複数サイトで再利用価値が高かったUI:

- モバイルドロワー
- コンパクト表示
- 動きを減らす
- Help
- Data Management
- Empty State復帰導線
- Dashboard / 数値カード
- キーボードShortcut

ただし全サイトへ機械的に載せず、用途に必要なものだけ採用する。

## S-015 Progressive Enhancement

高度機能が失敗しても基本フローを残す。

例:
- ZIP失敗 → 個別JSON/TXT
- 自動検出失敗 → 手動追加
- 高度保存API不可 → Fallback

## S-016 Feature Detection

ブラウザ名ではなく、そのWeb APIが使えるかを判定する。

## S-017 未確認を明示

CIで確認したことと、Windows実機・スマホ・外部サービスで未確認なことを分離する。

これは「完成」の誤判定防止に効果が高い。
