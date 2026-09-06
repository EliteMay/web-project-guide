# 06 Security

この章はWeb / Cloud / Electron Projectの**Security decision boundary**の正本です。

個人利用中心でも、秘密情報公開、権限越境、Data破壊、XSS、CSRF、危険なFile処理、Remote abuse等の重大Riskは「小規模だから」で省略しません。一方、企業向けInfrastructureを目的なく導入することもしません。

Electron固有のRenderer / preload / IPC / navigation等は [11 Electron / Distribution](11-electron-distribution.md) を、Dependency / Assetは [13 Dependencies / Assets](13-dependencies-assets.md)、GitHub Actions / shared workflowは [16 Cross-Repository GitHub](16-cross-repository-github-infrastructure.md) を正本とします。

## 基本原則

1. **Least privilege** — 必要な主体へ必要な操作だけ許可する。
2. **Deny by default** — 許可条件が成立しないRequest / Actionを暗黙Allowにしない。
3. **Server-side / privileged boundaryで確認する** — Frontend表示やHidden UIをAuthorizationにしない。
4. **入力・保存済みData・外部Responseを信頼しない。**
5. **秘密情報をPublic artifact / Logへ出さない。**
6. **Security control失敗をCore Data破壊で回復しない。**
7. **高RiskなSecurity判断はCurrent official guidanceを再確認する。**

OWASPもAuthorizationではleast privilege、deny by default、各Requestでのpermission確認を推奨しています。

## Public Repository / Frontendへ置かないもの

- API Secret / private API key
- Password
- Access Token / Refresh Token
- Session Token
- Service-role key
- 秘密鍵
- Authorization Header
- 個人PC固有の秘密情報
- 非公開の個人Data
- 不要な元Media / private diagnostic data

公開Frontendへ配布した値はUserから見える前提で扱います。

Public client key等、公開を前提に設計されたCredentialがある場合も、それ自体をAuthorizationとして扱わずServer / RLS / Policy側で権限を制御します。

## Input / Output / XSS

Validation対象:

- URL Parameter / Query / Fragment
- User Input
- Import JSON / File
- localStorage / IndexedDB
- External API / Cloud response
- Remote Diagnostic Snapshot
- postMessage / IPC等のmessage payload

文字列表示は原則`textContent`等のsafe sinkを優先します。

外部入力をそのまま`innerHTML`へ入れません。HTMLを扱う必要がある場合は、信頼境界を明確にし、用途に合うsanitizationを行います。

URLも文字列連結だけで信用せず、scheme / origin / host / path等を用途に応じて検証します。

## Authentication / Authorization

CONDITIONAL: Login、非公開Data、Role、共有Workspace、Developer-only機能等があるProjectではAuthNとAuthZを分けて設計します。

### Authentication

- 「誰か」を確認する仕組みと、「何をしてよいか」を分ける。
- Sensitive actionではRiskに応じて再認証を検討する。
- Password / TokenをLogやURLへ出さない。
- Password reset / account recovery等がある場合、通常Loginより弱い抜け道にしない。

### Authorization

- UIでButtonを隠すだけで権限を守らない。
- Read / Write / Delete / Admin等、実際のoperation単位でpermissionを確認する。
- IDを推測できることとアクセス許可を混同しない。
- 新しいResource / Endpointは明示AllowがなければDeny側から始める。
- RLS / Server handler / API layer等、privileged boundaryで検証する。
- Authorization logicには可能ならUnit / Integration Testを持つ。

## Session / Cookie

CONDITIONAL: Cookie-based Sessionを持つ場合:

- Session IDは推測困難な値を使う。
- HTTPS前提で`Secure`を使う。
- JavaScriptから読む必要がないSession Cookieは`HttpOnly`を優先する。
- `SameSite`を用途に合わせて設定する。
- Login / privilege change等で必要に応じてSession rotationを行う。
- Logout /失効後に旧Sessionを継続利用できないようにする。

Cookie属性1つだけで全攻撃を防げるとは扱いません。

## CSRF

CONDITIONAL: Browserが自動付与するCookie等で認証し、State-changing Requestを行うBackendではCSRF対策を確認します。

- `GET`等のsafe methodでStateを変更しない。
- Framework標準のCSRF protectionがある場合は優先する。
- 必要に応じてCSRF Token / double-submit / Origin verification等を使う。
- `SameSite`は有用なdefense-in-depthだが、Project条件を確認せず唯一の防御と決めつけない。
- Client-side JSがattacker-controlled URL等からState-changing request先を組み立てないか確認する。

## Content Security Policy / Browser Security Boundary

CONDITIONAL: Script injectionやThird-party contentの影響がある公開WebではCSPをDefense in Depthとして検討します。

- `script-src`等を必要なSourceへ絞る。
- Inline script / `eval`依存を増やす前に構造を見直す。
- CSPを導入しただけでXSS対策完了とは扱わない。
- Server / HostingでHeader設定できない場合は、利用可能な代替と制約を記録する。

CSP、SRI、safe DOM sinks等は互いを置き換えるものではありません。

## CORS

CORSはAuthentication / Authorizationではありません。

- `Access-Control-Allow-Origin: *`をPrivate APIの権限制御として使わない。
- Credentialed requestでは許可Originを用途に合わせて制限する。
- Browserから読めないことをServer Dataの保護と同義にしない。

## File Upload / Import

CONDITIONAL: UserがFileをUpload / Importする場合、拡張子やContent-Typeだけを信用しません。

必要に応じて:

- 必要なFile typeだけallowlist
- filename / pathをUser入力のまま保存Pathへ使わない
- Size / record count / decompressed sizeに上限
- Schema / signature / magic bytes等、用途に合うvalidation
- Upload / DownloadのAuthorization
- 実行可能Fileを通常Contentと同じ扱いで配信しない
- Webroot外 /隔離Storage等の安全な配置
- ZIP / archive展開時のPath traversalや巨大展開を考慮

Client側Importでも、不正Fileを理由にCurrent Dataを先に破壊しません。Data transactionの詳細は [03 Data / Storage](03-data-storage.md) を確認します。

## Public Endpoint / Abuse / Quota

CONDITIONAL: Anonymous write、Search API、Upload、Remote Diagnostics、AI/API proxy等を公開する場合:

- Rate / Size / Countの上限を持つ。
- 無制限anonymous writeをDefaultにしない。
- Free quotaやpaid APIを第三者に消費される経路を確認する。
- Error responseへSecret / stack / internal pathを不要に出さない。
- Abuse時にCore dataや他Userへ影響が広がらない境界を作る。

## Remote Diagnostic Handoff

Runtime DiagnosticsをRemote Storeへ保存する場合、診断の便利さのために管理権限を公開Frontendへ埋め込みません。

### MUST

- `service_role` / Secret Key / private API keyをBrowserへ置かない
- 公開SchemaのTableではRLSとDatabase Grantを確認する
- `projectKey`やProject名をAuthorizationとして使わない
- 無制限のanonymous Insert / Select / DeleteをDefaultにしない
- Payload Schema / 最大Size / Content typeを検証する
- Token / Cookie / Authorization Header / User入力全文 / Media bodyをRemoteへ保存しない
- Remote write失敗でLocal Diagnosticsを失わない
- Provider停止時にCore機能まで利用不能にしない

BrowserからRemoteへ書く場合は、認証済みDeveloper session等の安全な主体へ限定することを優先します。

Server / Edge FunctionでもClientから渡された`projectKey`だけを信用せず、認証・許可範囲・Payload size・Rateを確認します。

安全なRemote write pathを用意できない場合はLocal Diagnostics + One-click ExportへFallbackします。

## Third-party Script / Dependency / Supply Chain

第三者Codeは自Projectの権限で動く可能性があります。

- 依存を追加する必要性を確認する。
- Version / lock / update方針を持つ。
- 対応可能ならSRI等を利用する。
- GitHub Actions / reusable workflowのimmutable pinningは [16](16-cross-repository-github-infrastructure.md) を確認する。
- Security-sensitive処理を理由なく自作しない。
- Update時はSecurity fixとBreaking changeを分離して確認する。

## Destructive Action

大量削除・初期化・Account / Permission変更等は誤操作と途中失敗を想定します。

- Undo
- Confirmation
- Backup / Snapshot
- Rollback
- Re-authentication

のうちRiskに合うものを使います。

保存Dataのtransaction / reset write barrierは [03](03-data-storage.md) を正本とします。

## External Link / Navigation

- 新規Tabでは必要に応じて`rel="noopener noreferrer"`を使う。
- Redirect / `window.open` / external protocol等にUser入力URLをそのまま渡さない。
- Allowlistが必要な用途では正規のURL parserでorigin / host等を確認する。

## Electron

Electron固有のSecurity Checklistは [11 Electron / Distribution](11-electron-distribution.md#electron-security-contract) を正本とします。

Web共通としては、Rendererをtrusted boundaryとみなさず、preload / IPC / main側でprivileged operationを制限します。

## Security Verification

Riskに応じて次をTest対象にします。

- unauthorized user / roleでRead / Write / Deleteできない
- guessed / modified IDで他主体のDataへ越境しない
- invalid / oversized inputを拒否する
- CSRF / Origin条件（該当時）
- CSP violation / dangerous inline path（採用時）
- Secretがbuild / log / diagnosticsへ混入していない
- Remote provider / auth failure時のfallback
- Electron privileged IPCのsender / payload validation

実行できなかったSecurity確認は未確認として記録します。
