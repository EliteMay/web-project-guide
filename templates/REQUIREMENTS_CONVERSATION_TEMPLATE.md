# Requirements Conversation Resume Template

要件定義を別日・別ChatGPT会話で再開するための開始Promptです。

このTemplate自体はProject固有要件のSource of Truthではありません。対象Repositoryの現在状態と正式な`REQUIREMENTS.md`を基準にし、`REQUIREMENTS_DRAFT.md`がある場合は未確定差分として確認します。既にGitHubへ保存済みの決定を聞き直さず、未確定事項から要件定義を再開するためのRouterとして使います。

このPromptを貼り忘れても、Project設定やUserが明示した情報から対象Repositoryを一意に特定できる場合は、[GitHub中心のプロジェクト管理](../docs/10-project-management.md) のPromptなし復旧Ruleに従ってGitHubから対象Repositoryを特定し、正式要件とDraftから再開できます。Promptの存在自体は要件定義再開の必須条件ではありません。

要件定義中の保存Timing、質問を抑える基準、完了時の正式保存とImplementation Handoffは [01 要件定義](../docs/01-requirements.md) を唯一の正本とします。このTemplateへ同じWorkflow全文は複製しません。

## 使用方法

- `{{REPOSITORY_URL}}` を対象GitHub Repository URLへ置換する
- `{{REPOSITORY_FULL_NAME}}` を`owner/repository`形式へ置換する
- `{{REPOSITORY_NAME}}` をRepository名へ置換する
- 要件定義を別会話へ移す場合は、ChatGPTが最新CheckpointのGitHub保存成功を確認したうえで置換済みPromptをそのまま出力する
- 会話名はProjectで定義された固定形式を優先する

## Template

```text
GitHub Repository：
{{REPOSITORY_URL}}

このRepositoryの要件定義を続けます。

最初に最新の `EliteMay/web-project-guide` の `README.md` と `START_HERE.md` を確認し、今回の要件定義に必要なルールだけ参照してください。

その後、`{{REPOSITORY_FULL_NAME}}` の現在のGitHub上の状態を確認してください。
`REQUIREMENTS.md` を現在の正式な要件のSource of Truthとして扱い、`REQUIREMENTS_DRAFT.md` が存在する場合は未確定の引き継ぎ差分として確認してください。README、SPEC、PROJECT_LEARNINGSなど要件判断に関係する現行資料と必要な実装も確認してから続きを開始してください。

古い会話や記憶だけを基準にせず、現在のGitHub上の内容を優先してください。

既にGitHubへ保存済みの確定要件を最初から聞き直さず、Draftの未確定事項、未解決のCore Decision / High-cost Decision、または今回変更したい内容から要件定義を再開してください。

要件定義中は `docs/01-requirements.md` のRepository-backed Requirements Checkpoint Ruleに従い、意味のある決定がまとまった区切りで `REQUIREMENTS_DRAFT.md` を自動保存してください。各Turnを機械的にCommitせず、近接した決定はまとめてCheckpoint化してください。保存するかどうかだけを確認する質問は行わないでください。

Userが「要件定義終わり」等で完了を明示し、未解決の重大Decisionがない場合は、追加の確認質問を挟まず、最新Checkpoint保存 → 正式 `REQUIREMENTS.md` への統合 → GitHub保存成功確認 → Draft解消 → 置換済みImplementation Conversation Prompt出力まで進めてください。

既存仕様と新しい要件が重大に衝突する場合は、破壊的な変更を勝手に確定せず重要な矛盾を示してください。

会話名：
{{REPOSITORY_NAME}}（相談・調査）
```

## Usage Contract

- Promptは過去会話の長いSummaryを複製しない
- GitHub上のCurrent Repositoryと正式`REQUIREMENTS.md`を先に確認する
- `REQUIREMENTS_DRAFT.md`は未確定差分として区別し、実装Source of Truthにしない
- GitHubへ保存済みの確定Decisionを理由なく再質問しない
- 要件定義中は`docs/01-requirements.md`のCheckpoint Ruleに従い、意味のある区切りでDraftを自動保存する
- 会話移行前は最新Checkpointの保存成功を確認してからこのPromptを出す
- 要件定義完了後は追加の「保存する？」「実装Promptを出す？」確認を挟まず、正式保存成功後にDraftを解消してImplementation Handoff Workflowへ進む
- Promptを貼り忘れた場合でも、対象Repositoryを一意に特定できるならGitHubから復旧し、Repositoryが曖昧ならURLまたは`owner/repository`だけ確認する
