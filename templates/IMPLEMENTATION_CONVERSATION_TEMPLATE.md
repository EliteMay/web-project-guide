# Implementation Conversation Handoff Template

要件定義完了後、新しいChatGPT会話で対象Repositoryの実装を開始・継続するための開始Promptです。

このTemplate自体はProject固有要件のSource of Truthではありません。要件の正本は対象Repositoryの`REQUIREMENTS.md`等に残し、このPromptは新しい会話から正本へ安全に到達するためのRouterとして使います。

## 使用方法

- `{{REPOSITORY_URL}}` を対象GitHub Repository URLへ置換する
- `{{REPOSITORY_FULL_NAME}}` を`owner/repository`形式へ置換する
- `{{REPOSITORY_NAME}}` をRepository名へ置換する
- 要件定義完了時は、可能ならChatGPTが置換済みのPromptをそのまま出力する
- 会話名はProjectで定義された固定形式を優先する

## Template

```text
GitHub Repository：
{{REPOSITORY_URL}}

このRepositoryの実装を続けます。

最初に最新の `EliteMay/web-project-guide` の `README.md` と `START_HERE.md` を確認し、今回の実装に必要なルールだけ参照してください。

その後、`{{REPOSITORY_FULL_NAME}}` の現在のGitHub上の状態を確認してください。
今回までに整理・保存した要件定義をSource of Truthとして扱い、README、REQUIREMENTS、SPEC、PROJECT_LEARNINGSなど関連する現行資料と実装を確認してから作業を開始してください。

古い会話や記憶だけを基準にせず、現在のGitHub上の内容を優先してください。

既存仕様と要件定義に矛盾がある場合は、破壊的な変更を勝手に行わず重要な矛盾を示してください。

`REQUIREMENTS.md`のImplementation Handoffが`Ready for implementation`でない、GitHubへの正式保存が確認できない、または未解決のCore Decision / High-cost Decisionが残っている場合は、そのまま実装を開始せず状態を示してください。

会話名：
{{REPOSITORY_NAME}}（実装）
```

## Completion Contract

要件定義完了時にこのPromptを出す場合は、次を満たしてから`実装へ進めるPrompt`として扱います。

- 対象Repositoryへ正式な要件定義が保存済み
- GitHubへの保存成功を確認済み
- `REQUIREMENTS.md`のImplementation Handoffが`Ready for implementation`
- 未解決のCore Decision / High-cost Decisionがある場合は明示済み
- `REQUIREMENTS.md`等の正式要件とPrompt本文で異なる仕様を追加しない
- Promptは会話履歴を複製せず、最新Repositoryと正式文書を読むよう案内する
