---
name: code4me-status
description: Read and summarize the local Code4Me task event log without changing it. Use when the user asks for Code4Me status, delegated-task progress, active or awaiting tasks, recent worker results, or event-log problems.
---

# Code4Me Status

Report the smallest accurate view of `.code4me/events.jsonl`.

## Workflow

1. Find `.code4me/events.jsonl` in the current project. If it does not exist,
   report that Code4Me has no local task history and stop. Do not create it.
2. Read every non-empty line as one JSON event without modifying the file.
3. Group events by `task_id` in file order:
   - a dispatch without a later matching result is `awaiting result`;
   - a result matches only when its `task_id` and `worker` equal the dispatch;
   - a matching result is terminal when `outcome` is `complete`, `blocked`, or
     `failed`.
4. Flag malformed JSON, duplicate dispatches, results without dispatches, and
   results that do not match the dispatched worker.
5. Report:
   - all tasks awaiting results;
   - the five most recent terminal results, unless the user requests another
     limit;
   - event-log issues, or `none`.

Keep the report compact. Include each task's ID, producer, worker, goal or
summary, outcome, and timestamp when present. Never claim a worker is currently
running merely because its result has not arrived.
