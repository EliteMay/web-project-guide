# 13 Dependencies / Assets

## 依存ライブラリ

### MUST

- 依存を追加する前に、標準Web APIや既存コードで十分でないか確認する。
- 公開フロントエンドへ秘密情報を埋め込まない。
- 依存更新と大規模機能変更を同時に大量実施しない。

### SHOULD

- 依存Versionは可能なら固定または管理可能な範囲へ制約する。
- package managerを使う場合はlock fileを管理する。
- 使っていない依存を残さない。
- CDNが落ちた場合の影響を確認する。
- 重要機能が1つの第三者CDNだけに依存しない構成を検討する。

### MAY

小規模な1機能のために巨大Libraryを追加するより、小さな自前実装の方が保守しやすい場合は自前実装を選べます。

ただし暗号、認証、sanitize等のSecurity-sensitive処理を安易に自作しません。

## 依存更新

依存更新では次を分離して考えます。

1. Security修正
2. Bug fix
3. Feature追加
4. Major upgrade

Major upgradeではBreaking Changesを確認します。

更新後は主要フローとBuild / Pagesを確認します。

## CDN

外部CDNを使う場合:

- HTTPS
- Version pinning
- 対応時はSRI
- timeout / failure時の表示
- 本当にCDNが必要か

を検討します。

## Assets

一般公開するRepository / Pagesでは、画像・動画・フォント・アイコン等を「入手できたから使える」とは扱いません。

### CONDITIONAL: 一般公開時

確認対象:

- 自作Assetか
- 利用規約上Web掲載できるか
- 再配布可能か
- Attributionが必要か
- 商用/非商用条件
- Logo / Game asset等のブランド利用条件

必要な場合は`CREDITS.md`やREADMEへ出典・Licenseを残します。

## 外部画像Hotlink

外部URLを直接Assetとして使う場合は、URL変更・CORS・Rate Limit・削除の影響があります。

重要UIでは恒久的に使える前提にしません。

## Font

Web Fontを使う場合は、読み込み失敗時のfallbackを用意します。

見た目だけのために大量のFont Weightを読み込まないようにします。

## Assetサイズ

大きなAssetでは次を確認します。

- 適切な画像寸法
- WebP/AVIF等の適用可否
- `width` / `height`
- lazy load
- Thumbnail生成
- Git Repository肥大化

大容量動画・大量MediaをGitへ直接入れる前に、Repositoryとして管理する必要が本当にあるかを確認します。
