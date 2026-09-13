# Task-based Usability Testing Research

Status: **current non-normative evidence**

Checked: **2026-09-14**

Purpose: Support `docs/07-testing-quality.md` with a compact, reusable evidence base for observing whether real or representative users can complete meaningful tasks. This file is evidence, not a second normative owner.

## Current official evidence reviewed

### Observe users attempting specific tasks

GOV.UK describes moderated usability testing as watching participants try to complete specific tasks with a service. It is useful for checking whether users understand what they need to do, can complete relevant tasks, and where language / layout / interaction problems block them.

Source:
- https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing

### Participants should be actual or likely users

The GOV.UK method recommends recruiting actual or likely users of the service. Testing does not need a formal research lab; remote or lightweight sessions can still produce useful evidence when the participants and tasks are representative enough for the decision being made.

Source:
- https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing

### Good tasks are realistic, goal-based, and non-leading

Good usability tasks should:

- give the participant a clear goal;
- be relevant and believable;
- be capable of exposing usability problems;
- avoid giving away the answer or hinting at the intended interaction path.

The facilitator should use neutral instructions, mostly observe and listen, and avoid steering participants toward the expected solution.

Sources:
- https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing
- https://userresearch.blog.gov.uk/2019/08/05/advice-for-better-moderated-usability-testing/

### Think-aloud is qualitative evidence, not task success by itself

GOV.UK recommends asking participants to describe what they are thinking while they work through a task. This helps explain confusion and decision points, but the primary observable evidence remains what the participant actually does and whether the task can be completed.

Source:
- https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing

### Benchmarking can use repeated tasks and observable outcomes

GOV.UK usability benchmarking recommends choosing tasks that are relevant, common, have a clear success condition, and are stable enough to repeat. Useful measures can include task completion and completion time. Repeating the same meaningful tasks over time can show whether a service is becoming easier or harder to use.

Sources:
- https://www.gov.uk/service-manual/measuring-success/usability-benchmarking-a-website-or-whole-service
- https://www.gov.uk/service-manual/measuring-success/measuring-the-success-of-your-service

### Personal data must be treated as research data, not casually captured

Real user data can produce stronger contextual evidence, but only when it can be handled safely. Dummy data is an acceptable substitute when real personal data would add unnecessary risk.

Source:
- https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing

## Promotion decision

Promote durable behavior into `docs/07`:

- use task observation when important usability uncertainty cannot be resolved by static review alone;
- prefer actual or likely users when practical;
- use realistic goal-based tasks that do not reveal the intended path;
- distinguish unassisted success from assisted / blocked / abandoned outcomes;
- record the observed problem, context and recovery instead of relying on preference alone;
- use repeated benchmark tasks only when trend measurement is useful;
- keep the method proportional for small personal projects instead of imposing a fixed participant quota or formal lab process.

Do not turn a fixed number of participants, a fixed session length, or a universal time-on-task threshold into a Common Rule. Those values depend on the product, task, risk and research question.
