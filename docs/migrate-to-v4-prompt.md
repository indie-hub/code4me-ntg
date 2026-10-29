# Migration prompt: existing project to Code4Me 1.0 / v4

Use this prompt in the project to migrate. It authorizes local bookkeeping
cutover only, not changes to product code or a forced stop of active workers.

---

Migrate this project's Code4Me history to the current v4 contract. Preserve all
existing evidence and continuity. Work only on local Code4Me bookkeeping; do not
change product files, shared memory, board state, room settings, or Git history,
and do not commit or push.

1. Locate and read the installed Code4Me 1.0 skill, its task-contract reference,
   and the project's instructions. Confirm the loaded skill uses
   `code4me-ntg/v4`. Inspect the current repository and `.code4me/events.jsonl`
   directly; do not feed old history to the new Status reader. If the log is
   already v4, verify the existing cutover and report it without migrating again.

2. Reconstruct the old state from the last trustworthy checkpoint and subsequent
   events. Distinguish logical task IDs from overloaded old dispatch IDs. When
   available, consult the old contract or retained envelopes instead of guessing.
   Identify unfinished milestones/tasks, outstanding dispatches, accepted results,
   current target revisions, finding responses, waivers, blockers, board links,
   memory references, and the next authorized action. Historical completed work
   stays referenced history; it needs no invented new execution events.

3. Confirm that every outstanding old dispatch has a terminal result or an
   acknowledged stop through the existing transport. A missing result, idle room,
   stale roster, or elapsed time does not prove quiescence. Do not clear rooms,
   cancel work, or redispatch automatically. If a worker is unreachable or work
   remains in flight, leave the active log unchanged and report the exact gap
   and decision needed before cutover.

4. Check that every non-empty old line is valid JSON. Before any active-log
   replacement, copy the exact original bytes to a new uniquely named file under
   `.code4me/archive/`. Record its relative path, full SHA-256, byte size, event
   count, and timestamp range when available. Verify the copy byte for byte.
   Never overwrite an existing archive or modify previous archives. Malformed or
   ambiguous history blocks automatic cutover; preserve it and explain the gap
   rather than repairing or discarding records by assumption.

5. Build a fresh v4 log separately. Carry only current unresolved work with
   milestone_opened/task_opened events and explicit provenance to the archive,
   source line/stage IDs, and immutable result artifacts. Preserve logical task
   IDs where unambiguous; record any mapping explicitly. Create fresh stage IDs
   only when a later authorized dispatch actually occurs. Carry active Trello
   mappings locally with their original provenance; do not synchronize the board.
   Infer concise intent from original requests and decisions, label assumptions,
   and report consequential uncertainty. Do not restart accepted implementation,
   drop open findings, erase a waiver, or relabel unvalidated work as validated.

6. End the fresh log with one self-contained v4 handover checkpoint: repository,
   branch, HEAD, upstream sync, worktree scope and exclusions; accepted results
   and exact target references; unfinished tasks; open findings and responses;
   waivers, blockers, relevant memory references, and one exact next action.
   Include the verified archive boundary and old-to-current ID mapping. Keep
   previously validated work distinguishable from work accepted with a waiver.
   Do not fabricate task_validated events or claim current verification of an
   earlier target. If nothing remains open, use a closed handover with no new tasks.

7. Validate all fresh JSON records, references, ID correlations, and carryover
   completeness. Confirm the old active log still matches the source hash before
   atomically replacing it with the prepared v4 log. If preparation, verification,
   or replacement fails, leave the original active log intact. Keep the verified
   archive as the recovery copy.

8. Run the current read-only Code4Me Status against the new log and compare its
   resume view with the reconstructed state. Do not start product work. Report
   the archive path/hash, carried tasks, ID mappings, unresolved questions or
   limitations, and the exact next action. If the new state cannot be verified,
   report that explicitly and use the preserved source to recover; never treat
   an incomplete cutover as ready.
