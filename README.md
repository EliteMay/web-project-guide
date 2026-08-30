# Web Project Guide

今後の個人向けWebサイト制作で最初に確認する共通基準書です。

このリポジトリはテンプレートサイトではなく、**設計・実装・保存・UI・品質確認・保守の判断基準を一元化するためのSource of Truth**です。

## 優先順位

1. 操作性
2. 分かりやすさ
3. 軽量化
4. 保守・修正しやすさ
5. 見た目

見た目のために操作性や性能を犠牲にしません。

## 制作開始時の基本フロー

1. `docs/01-requirements.md` で要件定義
2. `docs/02-architecture.md` で構成・責務・正本を決定
3. `docs/03-data-storage.md` でSchemaと保存先を決定
4. `docs/04-ui-ux-accessibility.md` でUI/レスポンシブ/アクセシビリティ確認
5. `docs/05-performance-reliability.md` で性能・外部依存・失敗時挙動を確認
6. `docs/06-security.md` で公開情報・入力・秘密情報を確認
7. `docs/07-testing-quality.md` で自動検証と実機確認を決定
8. `docs/08-github-pages.md` で公開方式を確認
9. `docs/09-maintenance.md` でVersion・互換性・移行方針を決定
10. `catalog/` で過去の失敗・成功・アンチパターンを確認

## 最重要ルール

- 同じ情報の正本を複数作らない。
- バージョン別JSを重ねて既存関数を上書きし続けない。
- 大容量データ・画像・音声・動画・手書きをlocalStorageへ直接保存しない。
- 保存形式にはSchema Versionと移行方針を持たせる。
- GitHub Pagesで使う場合は相対パスとサブパスを前提にする。
- 未実装機能を完成済みのように見せない。
- Loading / Empty / Error / Successを設計する。
- 削除・上書き・初期化にはUndo / Backup / 確認のいずれかを用意する。
- 外部API/CDNが失敗しても、可能な範囲でサイト全体は使えるようにする。
- 実機確認できていないものは確認済みと書かない。
- README・仕様・実装・Schemaを矛盾させない。

## 推奨プロジェクト構成

```text
/
├─ index.html
├─ pages/                 # 必要な場合
├─ css/
│  ├─ base.css
│  ├─ layout.css
│  └─ components.css
├─ js/
│  ├─ app.js
│  ├─ state.js
│  ├─ storage.js
│  └─ ...責務別
├─ data/
│  ├─ manifest.json
│  └─ ...用途別JSON
├─ assets/
├─ tests/
├─ .github/workflows/
├─ README.md
├─ 仕様書.md
└─ 作業報告書.md
```

小規模サイトでは無理に全ディレクトリを作らず、必要なものだけ使います。

## Single Source of Truth

同じ情報をHTML / JS / JSON / READMEへ別々に手入力しないことを原則とします。

例:

| 情報 | 推奨正本 |
|---|---|
| Version / Build | `version.js` または `version.json` |
| 大量データ | `data/*.json` |
| Schema | `*.schema.json` またはSchema定義JS |
| 件数・構成 | Manifest / Index JSON |
| UI設定初期値 | settings JSON / config |
| 教材・判定ルール | 専用JSON |

## 完成条件

以下を満たして初めて「完成」と扱います。

- 要求された主要機能が実装済み
- 主要操作が反応する
- 既知の重大不具合がない
- データ保存・復元が必要な範囲で機能する
- GitHub Pages対応サイトはパス問題がない
- README / 仕様書 / 作業報告が現行実装と一致
- 自動検証がある場合は成功
- 未確認項目が明記されている

## このガイドの由来

このガイドは、VReview / English Worksheet Lab / LyricTube / ASMRTube / Lineup Lab / AP Study Notes / DesignShelf / osu! Hubなどの実制作で起きた問題と、W3C・MDN・web.dev・OWASP等の一般的なWebベストプラクティスを統合して作っています。

詳細は `catalog/failures.md` と `catalog/success-patterns.md` を参照してください。
