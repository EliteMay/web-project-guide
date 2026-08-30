# Web Project Guide

今後の個人向けWebサイト / Electron制作で最初に確認する共通基準書です。

このリポジトリはテンプレートサイトではなく、**設計・実装・保存・UI・品質確認・保守の判断基準を一元化するためのSource of Truth**です。

## 優先順位

1. 操作性
2. 分かりやすさ
3. 安定性
4. 軽量化
5. 保守・修正しやすさ
6. 見た目

見た目のために操作性・安定性・性能を大きく犠牲にしません。
不要に重いライブラリや複雑な構成を導入しません。

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
10. `docs/10-project-management.md` でGitHub運用・変更手順・変更可否を確認
11. Electron指定時は `docs/11-electron-distribution.md` を確認
12. `catalog/` で過去の失敗・成功・アンチパターンを確認

小規模な修正では、毎回フルの要件定義をやり直す必要はありません。変更対象・影響範囲・保存互換性など、その修正に必要な範囲だけ確認します。

## GitHubを基準にする

Web制作ではGitHubリポジトリを基本の保存・管理先とします。

既存プロジェクトでは、特別な理由がない限り、古いZIPや過去の会話より**現在のGitHubリポジトリを最新状態の基準**とします。

変更前には必要に応じて以下を確認します。

- README.md
- 仕様書
- 作業報告書 / CHANGELOG
- package.json等
- ファイル構成
- HTML / CSS / JavaScript
- JSON / Schema
- 保存形式 / Storage Key
- GitHub Pages設定
- Tests / GitHub Actions
- プロジェクト固有ルール

詳細は `docs/10-project-management.md` を参照してください。

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
- 保存形式・主要機能・公開方式など大きな仕様変更を勝手に確定しない。
- Electron指定のプロジェクトを勝手にWeb版へ変更しない。
- 公開GitHub / GitHub Pagesへ秘密情報を置かない。

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

## READMEに最低限書くこと

- プロジェクトの目的
- 主な機能
- 崩してはいけない仕様
- 利用方法
- GitHub Pages利用方法（対応時）
- ファイル構成
- データ保存場所
- 設定保存方法
- 外部サービス
- 注意点
- 既知の問題
- 開発・更新時の注意

## 完成条件

以下を満たして初めて「完成」と扱います。

- 要求された主要機能が実装済み
- 通常利用に重大な問題がない
- 主要操作が反応する
- 既知の重大不具合がない
- データ保存・復元が必要な範囲で機能する
- 既存保存データを壊さない
- GitHub Pages対応サイトは公開可能でパス問題がない
- README / 仕様書 / 作業報告が現行実装と一致
- 自動検証がある場合は成功
- 未確認項目が明記されている

主要機能が未実装、または重大部分が未確認の場合は完成扱いにしません。

## このガイドの由来

このガイドは、VReview / English Worksheet Lab / LyricTube / ASMRTube / Lineup Lab / AP Study Notes / DesignShelf / osu! Hubなどの実制作で起きた問題と、W3C・MDN・web.dev・OWASP等の一般的なWebベストプラクティスを統合して作っています。

詳細は `catalog/failures.md` と `catalog/success-patterns.md` を参照してください。
