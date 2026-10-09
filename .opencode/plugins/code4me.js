const MARKER = "Code4Me task envelope detected.";
const PRODUCER_MARKER = "Code4Me producer check.";
const PRODUCER_GUIDANCE = `${PRODUCER_MARKER}
Keep the main context orchestration-only. Before you classify, assign, or dispatch any task, consult Basic Memory, make one targeted search, and record used, empty, or unavailable with truthful evidence. Use System 1 to recommend task shape, the cheapest capable eligible worker, model tier, effort, validation route, and relevant invariants. Discover any callable System One provider, declare its exact capability, default it to shadow mode, and attach a receipt for each claimed call. A System One call should eliminate expensive work: name the action it can avoid before calling, and record avoids plus avoided. If no expensive action can be named, do not call it. A declaration alone does not prove use. Use System 2 before consequential or uncertain decisions. Before you implement, repair, investigate, or validate, check the Crowded roster and native subagent availability. Delegate to the smallest capable eligible fresh context. If you implemented the change, you must not validate it. Reserve an independent validator before implementation. Do producer work inline only after you record the applicable fallback.`;
const GUIDANCE = `${MARKER}
Mandatory worker contract: load and follow the installed code4me skill's Incoming worker contract before acting. If that skill is unavailable, return blocked instead of silently bypassing it. Execute this task here; delegation is forbidden. Before planning, read every supplied Basic Memory memory:// reference. If memory.status is empty or unavailable, continue and preserve that status. Basic Memory is durable prior knowledge; .code4me/events.jsonl is task correlation; Context Mode is working-context processing. Return the same milestone, task, and stage IDs, non-empty truthful tool_evidence, and any durable evidenced memory_candidates. If reply_to.transport is crowded, end the turn after the accepted result send and do not launch a background waiter or poll for acknowledgement. If reply_to.transport is native, return the result normally; the producer must join the native subagent.
Actually open every supplied memory:// reference before planning. For every task, make one targeted Basic Memory search for relevant gaps when available; report truthful Basic Memory tool evidence or an unavailable reason. memory.status used or empty requires memory.searched true; unavailable requires false and a reason. Do not begin work until this consultation is complete. Always return memory_candidates, using [] when no durable lesson was found.
Use worker System 1 only when it can eliminate a named expensive action. Record avoids and whether it was actually avoided; if no expensive action can be named, do not call it. Use System 2 when risk, uncertainty, irreversibility, scope, or the contract changes. Read the system_one descriptor. Shadow advice never controls the action. Return decision_receipts for claimed calls; no receipt means no claimed use. Agent-supplied evidence cannot be verified.
Treat assigned_role, goal, acceptance, constraints, verification, including each invariant, and quality_bar as the producer's stage contract. Do not change them silently. Run every applicable verification command and invariant check, and report exact results in checks; a required failure prevents outcome complete. If the contract is unsafe, inconsistent, or impossible, return blocked or changes_requested with evidence. The validator decides the verdict independently.
Source comments explain code only. Never put task or milestone IDs, status, TODO/FIXME items, plans, progress, deferred work, or handover notes in source comments. Return such information through deferred_work in the result envelope.
Use the Code4Me Technical English profile for all technical and operational communication. Use short active-voice sentences, one action or idea per sentence, consistent terms, and explicit actors, artifacts, and expected results. Do not use idioms or vague references. Preserve code, commands, paths, logs, error messages, and quotations exactly.
Toolbox: Basic Memory=past decisions and lessons; CodeGraph=exact structure; CCC=semantic source discovery; Context Mode=large derived or non-source output; narrow native reads when cheaper.`;

function isEnvelope(text) {
  return /\btask_id\s*:/i.test(text)
    && /\bdelegation\s*:\s*forbidden\b/i.test(text)
    && /\bgoal\s*:/i.test(text);
}

function isProducerPrompt(text) {
  return !isEnvelope(text)
    && (/(?:^|\s)crowd:/i.test(text)
      || /\b(?:code4me|build|implement|fix|repair|refactor|audit|validate|test|investigate|review)\b/i.test(text));
}

const Code4Me = {
  id: "code4me.ntg",
  async setup(ctx) {
    await ctx.session.hook("prompt", (event) => {
      const text = event.prompt.text ?? "";
      if (isEnvelope(text) && !text.includes(MARKER)) {
        event.prompt.text = `${text}\n\n${GUIDANCE}`;
        return;
      }
      if (isProducerPrompt(text) && !text.includes(PRODUCER_MARKER)) {
        event.prompt.text = `${text}\n\n${PRODUCER_GUIDANCE}`;
      }
    });
  },
};

export default Code4Me;
