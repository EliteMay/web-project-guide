# 05 Performance / Reliability

## 目的

「軽い」を感覚だけで判断せず、初期表示・操作応答・長時間利用・外部依存の観点で確認します。

## Core Web Vitalsの目安

公開Webでは以下を参考値にします。

- LCP: 2.5秒以下を良好目安
- INP: 200ms以下を良好目安
- CLS: 0.1以下を良好目安

個人用ツールでも、操作が明らかに固まる場合は改善対象とします。

## Long Task

50msを大きく超える同期処理が続く場合は分割を検討します。

候補:
- chunk処理
- `requestAnimationFrame`
- `requestIdleCallback`（補助用途）
- `setTimeout` / yield
- Web Worker
- 二段階解析

長い処理には進捗表示とCancelを検討します。

## 初期ロード

最初の画面で不要なものを読み込みません。

- 重い解析JS
- ZIP生成
- 大きなChartライブラリ
- ffmpeg.wasm
- 未使用画面用データ

必要になった時点でLazy Load / Dynamic Importを検討します。

## 画像

- `width` / `height`を可能な範囲で指定
- 画面外画像は`loading="lazy"`を検討
- サムネイルと原寸を分ける
- 同じ画像をData URLとして大量複製しない
- WebP等を用途に合わせて使用

## fetch / 外部API

`fetch()`は404/500でも自動的にrejectされないため、`response.ok`を確認します。

すべての外部通信に以下を考えます。

```text
Loading
↓
Success
または
Error → Retry / Fallback / 別Provider
```

## Cancel

長時間通信・解析では`AbortController`等でキャンセル可能にすることを検討します。

## CDN / 第三者JS

第三者CDNは便利ですが、重要機能を1つの外部配信元だけに依存させないことを優先します。

- 必要性を確認
- Lazy Load
- Fallback
- 対応可能ならSRI
- CDN停止時にサイト全体を停止させない

## Progressive Enhancement

高度機能が利用できなくても、可能なら基本操作を残します。

例:
- ZIPライブラリ失敗 → JSON/TXT個別出力
- Service Worker不可 → 代替保存方式
- 自動解析不可 → 手動入力

## メモリ

Blob URLは不要になったら`URL.revokeObjectURL()`で解放します。

長時間利用するプレイヤー・画像編集・動画解析ではイベントListener、Timer、Object URL、巨大配列が残り続けないか確認します。
