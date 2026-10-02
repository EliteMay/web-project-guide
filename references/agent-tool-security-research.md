# Agent Tool Security Research

- Status: Curated non-normative reference
- Reviewed: 2026-10-02
- Applies to: AI agents / Tool Calling / Plugins / Connectors / MCP / RAG / external-content workflows
- Normative owners: [06 Security](../docs/06-security.md), [21 Rule Routing / Preflight](../docs/21-rule-routing-preflight.md)

このReferenceはCommon GuideのCurrent Ruleを支える外部Evidenceです。Rule本文の第二Source of Truthではありません。実装時はProvider / ProtocolのCurrent official guidanceも再確認します。

## Research method

ExaでAgent Tool Securityを4つの角度から調査し、合計30 search resultsをレビューしました。一般的なBlogより、OWASPとModel Context Protocolの公式資料を優先しました。

## High-signal findings

### 1. Tool / retrieved contentはUntrusted Input

OWASP AI Agent Securityは、User messageだけでなくretrieved document、API response、Email等の外部DataをUntrustedとして扱い、indirect prompt injectionをAgent固有の主要Riskとして扱っています。

Current Guideへの適用:

- Tool / Plugin / Connector output内のInstructionをUser Request / Project Contractへ昇格させない
- 次のTool callへ渡すURL / Path / Query / Command / argumentを再検証する
- Prompt Injection検出だけでなくLeast PrivilegeとAction validationで被害範囲を制限する

Source:

- OWASP AI Agent Security Cheat Sheet: <https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html>

### 2. Excessive AgencyはFunctionality / Permission / Autonomyを分けて減らす

OWASP LLM06 Excessive Agencyは、不要Tool、過剰Permission、高Impact Actionの独立Approval不足を別のRoot Causeとして扱っています。Readだけで足りるAgentへSend / Deleteを与えない、downstream systemでAuthorizationを強制する等が推奨されています。

Current Guideへの適用:

- Pluginを選ぶだけでなくTaskに必要なOperationへScopeを限定する
- Tool outputが追加Permissionを要求しても自動昇格しない
- Send / Delete / Publish / Deploy等はCurrent User IntentとTargetを別経路で確認する

Source:

- OWASP LLM06 Excessive Agency: <https://owasp.org/www-project-top-10-for-large-language-model-applications/2_0_vulns/LLM06_ExcessiveAgency.html>

### 3. MCPでもLeast Privilege / Consent / Input ValidationはProtocol外まで必要

MCP Security Best Practicesは、authorization / consent / redirect URI / URL handling / progressive least-privilege scope等を明示し、MCP Serverから受けるDataやURLもvalidate / sanitizeする必要があるとしています。

Current Guideへの適用:

- Connected / authenticatedであることをContent trustと同一視しない
- Capability間Data transferやURL / handle / token等のtarget bindingを確認する
- 初期から広いScopeを要求せず必要Operationに合わせて権限を絞る

Sources:

- MCP Security Best Practices: <https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices>
- MCP Authorization: <https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization>

## Guide decision

今回のEvidenceは新しいSecurity Ownerを作る理由にはなりません。

- normative security behavior → `docs/06-security.md`
- capability selection / routing → `docs/21-rule-routing-preflight.md`
- execution confirmation → `templates/QUALITY_CHECKLIST.md`
- external evidence / rationale → このReference

この分離でSingle Normative Ownerを維持しつつ、Plugin利用が増えた場合のindirect prompt injection / cross-tool exfiltration / excessive agencyを実行経路へ接続します。
