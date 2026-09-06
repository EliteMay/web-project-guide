# Implementation Conversation Handoff Template

要件定義完了後、または実装途中で新しいChatGPT会話へ移るときに、対象Repositoryの実装を開始・継続するための開始Promptです。

このTemplate自体はProject固有要件や実装状態のSource of Truthではありません。要件の正本は対象Repositoryの`REQUIREMENTS.md`等、実装の現在状態はGitHub上のCurrent Repository / Branch / Pull Requestです。このPromptは新しい会話から正本へ安全に到達するためのRouterとして使います。

Conversation Handoff / PromptなしRecovery / stale checkpoint / duplicate active conversationのBehavioral Ownerは [22 Conversation Handoff / Recovery](../docs/22-conversation-handoff-recovery.md) です。Promptを貼り忘れても、Target RepositoryとCurrent work refをGitHub Evidenceから一意に復元できる場合は作業を再開できます。

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

Current Repository / Requirements / Existing User Intent / Evidenceで合理的に解ける判断はBest Reasonable Decisionで進め、Core / High-costという分類だけを理由に承認待ちにしないでください。non-inferable preference、不可逆でsafe alternativeがない破壊的選択、外部Permission / Billing / Account操作、解消不能な重大Contract conflictだけUser Decisionとして扱ってください。

`REQUIREMENTS.md`のImplementation Handoffが`Ready for implementation`でない、GitHubへの正式保存が確認できない、またはBlocking Decisionが残っている場合は、その理由を確認してください。BlockingでないAssumptionだけを理由に実装を止めないでください。

実装途中の引き継ぎでは、未完成のCheckpointを完成済みとして扱わず、指定されたBranch / Pull Request / Commitと必要なWork Reportを確認して、その続きから進めてください。

指定されたCurrent work refが見つからない場合は、Pull Request、Commit、Merge履歴、Work Report等のGitHub Evidenceから同じCheckpointを復元してください。復元できない場合は`main`から推測で続けず、`Current work ref: unresolved`としてCode変更を開始しないでください。

会話名：
{{REPOSITORY_NAME}}（実装）
```

## Completion Contract

要件定義完了時にこのPromptを出す場合は、次を満たしてから`実装へ進めるPrompt`として扱います。

- 対象Repositoryへ正式な要件定義が保存済み
- GitHubへの保存成功を確認済み
- `REQUIREMENTS.md`のImplementation Handoffが`Ready for implementation`
- Blocking Decisionsがない
- Important Assumptionsは必要に応じて明示済み
- `REQUIREMENTS.md`等の正式要件とPrompt本文で異なる仕様を追加しない
- Promptは会話履歴を複製せず、最新Repositoryと正式文書を読むよう案内する

## Implementation Resume Contract

実装途中で新しい`Repository名（実装）`会話へ移る場合は、次を満たしてから引き継ぎ完了とします。

- 現在の変更がGitHub上で復元可能な状態になっている
- 完了済みの変更なら通常のValidationを行い、必要ならMergeまで完了している
- 未完成の変更なら、無理にmainへ入れずBranch / Pull Request等へCheckpointを保存している
- 次の会話が読むべきBranch / Pull Request / Commitを`{{WORK_REF}}`で特定できる
- `{{WORK_REF}}`が消失している場合は、PR / Commit / Merge履歴等のEvidenceから復元し、復元できなければCode変更を開始しない
- 必要に応じてWork Reportへ「完了したこと / 未完了 / 未確認 / 次に行うこと」を残している
- 再発価値の高い失敗・成功は`PROJECT_LEARNINGS.md`へ継続蓄積している
- GitHubへの保存成功を確認するまで、会話移行の保存完了を主張しない
- 未完成のCheckpointをProject完成として扱わない
- Promptを貼り忘れた場合でもTarget Repositoryを一意に特定できるならGitHub Evidenceから復旧する
