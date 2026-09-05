# Implementation Conversation Handoff Template

要件定義完了後、または実装途中で新しいChatGPT会話へ移るときに、対象Repositoryの実装を開始・継続するための開始Promptです。

このTemplate自体はProject固有要件や実装状態のSource of Truthではありません。要件の正本は対象Repositoryの`REQUIREMENTS.md`等、実装の現在状態はGitHub上のCurrent Repository / Branch / Pull Requestです。このPromptは新しい会話から正本へ安全に到達するためのRouterとして使います。

このPromptを貼り忘れても、Project設定やUserが明示した情報から対象Repositoryを一意に特定できる場合は、[GitHub中心のプロジェクト管理](../docs/10-project-management.md) のPromptなし復旧Ruleに従ってGitHubから現在状態を復旧できます。Promptの存在自体は実装再開の必須条件ではありません。

## 使用方法

- `{{REPOSITORY_URL}}` を対象GitHub Repository URLへ置換する
- `{{REPOSITORY_FULL_NAME}}` を`owner/repository`形式へ置換する
- `{{REPOSITORY_NAME}}` をRepository名へ置換する
- `{{WORK_REF}}` は実装途中の引き継ぎで使う。`main`、Branch名、Pull Request等、続きの作業位置が分かる値へ置換する。不要なら行ごと省略する
- 要件定義完了時または実装会話移行時は、可能ならChatGPTが置換済みのPromptをそのまま出力する
- 会話名はProjectで定義された固定形式を優先する

## Template

```text
GitHub Repository：
{{REPOSITORY_URL}}

このRepositoryの実装を続けます。

最初に最新の `EliteMay/web-project-guide` の `README.md` と `START_HERE.md` を確認し、今回の実装に必要なルールだけ参照してください。

その後、`{{REPOSITORY_FULL_NAME}}` の現在のGitHub上の状態を確認してください。
Current work ref: {{WORK_REF}}
今回までに整理・保存した要件定義をSource of Truthとして扱い、README、REQUIREMENTS、SPEC、PROJECT_LEARNINGS、Work Report、現在のBranch / Pull Requestなど関連する現行資料と実装を確認してから作業を開始してください。

古い会話や記憶だけを基準にせず、現在のGitHub上の内容を優先してください。

既存仕様と要件定義に矛盾がある場合は、破壊的な変更を勝手に行わず重要な矛盾を示してください。

`REQUIREMENTS.md`のImplementation Handoffが`Ready for implementation`でない、GitHubへの正式保存が確認できない、または未解決のCore Decision / High-cost Decisionが残っている場合は、そのまま実装を開始せず状態を示してください。

実装途中の引き継ぎでは、未完成のCheckpointを完成済みとして扱わず、指定されたBranch / Pull Request / Commitと必要なWork Reportを確認して、その続きから進めてください。

指定されたCurrent work refが見つからない場合は、Pull Request、Commit、Merge履歴、Work Report等のGitHub Evidenceから同じCheckpointを復元してください。復元できない場合は`main`から推測で続けず、Current work refを未確認として示し、実装を開始しないでください。

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

## Implementation Resume Contract

実装途中で新しい`Repository名（実装）`会話へ移る場合は、次を満たしてから引き継ぎ完了とします。

- 現在の変更がGitHub上で復元可能な状態になっている
- 完了済みの変更なら通常のValidationを行い、必要ならMergeまで完了している
- 未完成の変更なら、無理にmainへ入れずBranch / Pull Request等へCheckpointを保存している
- 次の会話が読むべきBranch / Pull Request / Commitを`{{WORK_REF}}`で特定できる
- `{{WORK_REF}}`が消失している場合は、PR / Commit / Merge履歴等のEvidenceから復元し、復元できなければ実装を開始しない
- 必要に応じてWork Reportへ「完了したこと / 未完了 / 未確認 / 次に行うこと」を残している
- 再利用価値の高い失敗・成功だけ`PROJECT_LEARNINGS.md`へ反映している
- GitHubへの保存成功を確認するまで、会話移行の保存完了を主張しない
- 未完成のCheckpointをProject完成として扱わない
- Promptを貼り忘れた場合でも、対象Repositoryを一意に特定できるならGitHub Evidenceから復旧し、Repositoryが曖昧ならURLまたは`owner/repository`を確認する
