# 01 要件定義

新規制作では、実装前に最低限以下を整理します。

## 必須項目

- 目的: 何を解決するサイト / アプリか
- 利用者: 自分だけ / 友人共有 / 一般公開
- 必要機能: MVPと後回し機能を分ける
- 画面構成: 各画面の役割と主要導線
- データ構成: 何をJSON / 保存データにするか
- 保存方法: localStorage / IndexedDB / GitHub JSON / 外部DB / Electron userData等
- 崩してはいけない仕様
- 完成条件

結果を大きく左右しない不明点は、仮定を明記したうえで進めます。
重要な仕様だけ確認します。

## 小規模な修正

小さな修正で毎回フルの要件定義をやり直す必要はありません。

最低限、以下だけ確認します。

- 何を直すか
- どこまで影響するか
- 保存データや互換性へ影響するか
- 既存仕様を壊さないか
- 完了条件は何か

## 先に決めるべき高コスト項目

後から変えると修正コストが高い項目は、見た目より先に決めます。

1. 保存データSchema
2. ID体系
3. 座標・時間・単位などの内部表現
4. GitHub Pages対応有無
5. 外部API依存
6. 大容量メディアの保存先
7. 主要画面のレイアウト原則
8. 既存データ互換性
9. 自動処理の評価方法
10. Webだけで完結するか、Electron等が必要か

## Visual Design Direction

### CONDITIONAL: Visual Qualityが重要なProject

Landing Page、Portfolio / Showcase、Media、一般公開Product、UI刷新など、Visual Directionが完成度へ大きく影響する場合は、CSS実装前に [UI / UX / Accessibility](04-ui-ux-accessibility.md) のVisual Design Qualityを確認します。

最低限、次を整理します。

- Design Concept
- Reference Direction
- Layout Type
- Navigation Type
- Content Density
- Typography Direction
- Color Rule
- Component Rule
- Decorative Effect Policy

重要な新規Designでは、色違いではなく**構造的に異なる2〜3方向**をWireframe / lightweight mockで比較することを推奨します。

この段階ではGradient、Shadow、Glassmorphism等を先に決めず、Information Architecture / Navigation / Grid / Typography / Spacingを優先します。

DesignShelfを利用する場合も、配色選択器としてだけではなく、構造的に異なるLayout候補を比較する補助Toolとして扱います。

## MVP

初期版では「主要な1本の利用フロー」が最後まで通ることを優先します。

例:

```text
登録 → 保存 → 一覧 → 編集 → 削除 → バックアップ
```

未実装画面を先に大量に作らず、使える導線を完成させます。

## 非機能要件

必要に応じて以下も決めます。

- 対応ブラウザ
- PC / スマホ / ペンタブ
- オフライン可否
- データ量の想定
- 画像/動画最大サイズ
- 初期表示速度
- キーボード操作
- バックアップ
- 外部サービス停止時の挙動
- GitHub Pages公開可否
- 秘密情報の有無
- Visual Qualityの重要度
- Design Direction比較が必要か

## 完成条件の書き方

「見た目が整った」ではなく、観測可能な条件にします。

悪い例:
- 使いやすい
- モダンで高品質に見える

良い例:
- 主要ボタンがすべて反応する
- 320px幅でページ全体の横スクロールが発生しない
- 保存後に再読み込みしてもデータが残る
- GitHub ActionsのStatic Validationが成功する
- 未確認項目が作業報告書へ記録されている
- Visual重視Projectでは、選択したDesign Directionと比較した代替案が説明できる
- Accent Colorを外しても、Typography / Spacing / Layoutで主要Hierarchyが読み取れる
