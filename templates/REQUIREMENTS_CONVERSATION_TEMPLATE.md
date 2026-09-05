# Requirements Conversation Resume Template

要件定義を別日・別ChatGPT会話で再開するための開始Promptです。

このTemplate自体はProject固有要件のSource of Truthではありません。対象Repositoryの現在状態と正式な`REQUIREMENTS.md`等を確認し、既に確定した内容を聞き直さず、未確定事項から要件定義を再開するためのRouterとして使います。

## 使用方法

- `{{REPOSITORY_URL}}` を対象GitHub Repository URLへ置換する
- `{{REPOSITORY_FULL_NAME}}` を`owner/repository`形式へ置換する
- `{{REPOSITORY_NAME}}` をRepository名へ置換する
- 要件定義を別会話へ移す場合は、可能ならChatGPTが置換済みPromptをそのまま出力する
- 会話名はProjectで定義された固定形式を優先する

## Template

```text
GitHub Repository：
{{REPOSITORY_URL}}

このRepositoryの要件定義を続けます。

最初に最新の `EliteMay/web-project-guide` の `README.md` と `START_HERE.md` を確認し、今回の要件定義に必要なルールだけ参照してください。

その後、`{{REPOSITORY_FULL_NAME}}` の現在のGitHub上の状態を確認してください。
`REQUIREMENTS.md` を現在の正式な要件のSource of Truthとして扱い、README、SPEC、PROJECT_LEARNINGSなど要件判断に関係する現行資料と必要な実装を確認してから続きを開始してください。

古い会話や記憶だけを基準にせず、現在のGitHub上の内容を優先してください。

既に確定している要件を最初から聞き直さず、未確定事項、未解決のCore Decision / High-cost Decision、または今回変更したい内容から要件定義を再開してください。

既存仕様と新しい要件が重大に衝突する場合は、破壊的な変更を勝手に確定せず重要な矛盾を示してください。

会話名：
{{REPOSITORY_NAME}}（相談・調査）
```

## Usage Contract

- Promptは過去会話の長いSummaryを複製しない
- GitHub上のCurrent Repositoryと正式文書を先に確認する
- Draft要件がある場合はDraftであることを区別する
- 既に確定済みのCore Decisionを理由なく再質問しない
- 要件定義完了後は正式`REQUIREMENTS.md`へ統合し、Implementation Handoff Workflowへ進む
