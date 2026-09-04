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

### CONDITIONAL: Visual Directionが完成度へ大きく影響するProject

要件定義では、Visualの完成形を細かく決めるのではなく、最低限次だけ記録します。

- Visual Quality Baseline: Required / Not applicable
- Visual Ambition: baseline / high / flagship
- Primary Task / Content Model / Audience
- 現在UIがある場合の大きな制約・残したい要素
- Visual Researchが必要な変更か

意味のある新規Design / 大規模Redesignでは、実装前の調査Workflowを [Domain-first Visual Research](18-domain-first-visual-research.md)、Design原則を [UI / UX / Accessibility](04-ui-ux-accessibility.md) の正本で確認します。

要件定義へReference候補、2〜3案比較、Effect方針等の詳細手順を重複記載しません。

## Learning / Explanation Content

### CONDITIONAL: `LEARNING` Profile

学習・解説・知識集サイトでは、**教材件数や画面数だけで完成条件を決めません。** 実装前に最低限次を決めます。

- **Starting Knowledge:** 利用者が最初から知っている前提 / 知らない前提
- **Prerequisite Path:** 固有用語を教える前に必要な一般概念と学習順
- **Primary Learning Surface:** Dashboard / 一覧ではなく、実際に読む・考える・解く中心画面
- **Language / Terminology Policy:** 学習者へ見せる言語、英語・略語・内部Labelをそのまま露出してよい条件
- **Content Depth Contract:** 主要Lessonをどの深さまで説明すれば「教えた」と扱うか
- **Understanding Signal:** 読了、確認問題、自己理解度等のどれを「進捗」として扱うか
- **Next Step / Review Path:** Lesson後に何をするか、誤答や低理解度をどう復習へ戻すか

### Content Depth Contract

主要Lessonが用語の1行定義だけで終わると、Dataとして存在していても学習教材としては不足しやすくなります。

原則として主要Lessonでは、内容に応じて次を組み合わせます。

1. **何か** — まず短く定義する
2. **なぜ必要か** — 何の問題を解決するか
3. **どう動くか / どう考えるか** — 手順・関係・仕組み
4. **具体例** — 実際の場面へ対応付ける
5. **比較 / よくある勘違い** — 似た概念との差を必要に応じて示す
6. **理解確認** — 1問、説明し直す、判断する等で理解を確認する

すべてのGlossary項目へ同じ長さを強制しません。短い用語辞典と、理解させるためのLessonは役割を分けます。

### Beginner-first Ordering

初心者向けSiteでは、製品名・専門サービス名・試験用語から始める前に、その理解へ必要な一般概念を確認します。

例:

```text
Webの基本
→ Server / Network / DNS / Database / API
→ 製品固有Service
→ 構成例
→ 判断問題
```

前提知識が不足している利用者へ固有名詞だけを増やさないことを重視します。

### Learner-facing Copy

学習者向け画面では、開発者向け状態名・英語Content Type・内部監査用Copy等を通常表示へそのまま出しません。

英語や略語自体を学ぶ必要がある場合は、隠すのではなく日本語説明・読み方・意味・利用場面を添えます。

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
- Visual重視Projectでは採用Directionの理由と、調査した同種Referenceを説明できる
- Accent Colorを外しても、Typography / Spacing / Layoutで主要Hierarchyが読み取れる
- Learning Projectでは、主要LessonがStarting Knowledge / Content Depth Contractを満たす
- Learning Projectでは、学習者が次に何を学ぶか・理解確認をどこでするか説明できる
