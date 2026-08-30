# 02 アーキテクチャ

## 基本原則

- 1機能1責務を意識する。
- 同じ機能の実装を複数残さない。
- UIから保存・外部API・再生エンジンへ直接依存しすぎない。
- 後付け上書きではなく、Controller / Adapter / Hook / Event / Module等の明示された接続点を使う。

## 禁止寄りの構造

```text
app.js
↓
app-v2.js が関数上書き
↓
app-v3.js がさらに上書き
↓
fix-final.js がDOM監視で補正
```

短期的には速くても、責任範囲と読み込み順が不明になり、回帰が増えます。

## 推奨構造

```text
UI
↓
Controller / Use Case
├─ State
├─ Storage
├─ Data Loader
└─ External Adapter
```

例: 複数再生ソース

```text
Player UI
↓
Player Controller
├─ YouTube Adapter
└─ Local Media Adapter
```

UIは「今の再生元が何か」を直接意識しすぎない構造を優先します。

## Single Source of Truth

同じ値やルールを複数箇所に手書きしません。

- Version → 1ファイル
- 問題件数 → manifest
- データ本体 → JSON
- Schema → Schema定義
- Feature Flag → config

## ID設計

保存・参照に使うIDは表示名と分離します。

- 名前変更でIDを変えない
- IDを再利用しない
- 配列indexを永続IDとして使わない
- 削除済みIDを別データへ安易に再割当しない

## DOM後付けについて

`MutationObserver`による既存UIへの後付けは、互換レイヤーなど限定用途にします。

本来のrender処理を変更できるなら、正式なrender pathへ統合します。

### Renderer owns its DOM

アプリ自身が生成しているDOMは、原則として**そのRenderer / Component自身が最終形を生成する**ようにします。

悪い例:

```text
practice.js が回答Headerをrender
↓
review-layout.js がMutationObserverでHeaderを検出
↓
後から保存Buttonを差し込む
```

推奨:

```text
practice.js が回答Header + 保存Buttonを一緒にrender
↓
review-layout.js はサイズ計算だけ担当
```

この分離により、次の問題を減らせます。

- Renderのたびに後付け処理が必要
- Observer timing依存
- DOM構造変更でSelectorが壊れる
- 同じButtonが二重生成される
- 「誰がこのDOMを作ったか」が不明になる

例外:

- 第三者Widget
- Browser Extension
- 自分で変更できない外部DOM
- Legacy互換レイヤー

例外でもObserver側の責務を狭くし、正式Rendererへ移せる処理は残し続けません。

## 状態更新

元stateを直接壊してから検証しません。

```text
コピー
↓
変更
↓
normalize
↓
validate
↓
成功時だけcommit
```

不正入力でも元データが壊れないようにします。

## 外部機能の境界

外部API/CDN/Supabase/YouTube等はAdapter層へ閉じ込め、UI全体と密結合させないことを優先します。

## 関連Catalog

- Failure: [F-001 / F-008 / F-010 / F-019](../catalog/failures.md)
- Success: [S-003 / S-023](../catalog/success-patterns.md)
- Anti-pattern: [AP-001 / AP-002 / AP-003](../catalog/anti-patterns.md)
