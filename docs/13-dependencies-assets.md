# 13 Dependencies / Assets

この章は**Dependency選定・更新、Assetの権利・配布元・Repository管理**の正本です。

AssetのInitial Transfer、First View画像、Lazy Load、Media Load Timing、外部ResourceのPage Load Costは [05 Performance / Reliability](05-performance-reliability.md) を正本とします。

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
- 重いLibraryを追加する場合、初期表示へ本当に必要かを [05 Performance / Reliability](05-performance-reliability.md) で確認する。

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

CDNを利用していること自体を「軽い / 高速」の根拠にはしません。Page Load Costと読み込みTimingは [05 Performance / Reliability](05-performance-reliability.md) で判断します。

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

外部画像もPerformance上は外部Resourceなので、Initial Costから除外しません。詳細は [05 Performance / Reliability](05-performance-reliability.md) を確認します。

## Font

Web Fontを使う場合は、読み込み失敗時のfallbackを用意します。

Font Family / WeightのPage Load Cost、初期表示への必要性は [05 Performance / Reliability](05-performance-reliability.md) で判断します。

## 大容量Asset / Repository管理

この章では、AssetをRepositoryへ保持するか、権利・更新・配布上どう管理するかを確認します。

- Source AssetとWeb配信用Assetを同一視しない
- 大容量動画・大量MediaをGitへ直接入れる前に、RepositoryとしてVersion管理する必要があるか確認する
- Git履歴の肥大化やclone / maintenance Costを考慮する
- 外部Storage / Release Asset / CDN等へ分ける場合は、可用性・権利・更新方法を確認する

実際の配信用画像寸法、WebP / AVIF、`srcset` / `sizes`、Thumbnail、Lazy Load、First View Budget等の詳細は [05 Performance / Reliability](05-performance-reliability.md) を正本とし、この章へ数値Ruleを複製しません。
