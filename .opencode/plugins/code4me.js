const PRODUCER_GUIDANCE = "Code4Me producer check.\nLoad the installed code4me skill. Capture original intent, consult Basic Memory, and choose direct work or a bounded runnable draft only when uncertainty warrants it. Delegate building to an eligible room or native subagent and reserve independent cross-vendor validation. Keep the main context for coordination. Confirm effective settings after controls and preserve stage-specific results. A challenge permits finishing, never production acceptance. Use System One only to eliminate named expensive work. Recover required Headroom originals through /v1/retrieve/<hash> and read original_content.";
const GUIDANCE = "Code4Me task envelope detected.\nLoad the installed code4me skill and its Incoming worker contract; return blocked if unavailable. Read original intent, context_refs, and supplied Basic Memory references before planning. Execute only the assigned v4 stage here; delegation is forbidden. A draft proves its declared claim, a read-only challenge checks direction, and final verify requires correctness and intent alignment. Keep finding IDs and return truthful checks, tool_evidence, resolutions, decision_receipts, memory_candidates, and deferred_work with matching IDs and exact target. Retrieve required Headroom originals at /v1/retrieve/<hash> and read original_content; a marker is not evidence. Before expensive exploration, consider System One context shortlisting or probe selection using the provider reference. Source comments explain code only. Follow the Code4Me Technical English profile. After an accepted Crowded result send, end the turn without polling; native results return normally for the producer to join.";
const INVALID_GUIDANCE = "Code4Me task contract unavailable or invalid. Return blocked. Load the current code4me skill and request a code4me-ntg/v4 task with type task, required_skill code4me, delegation forbidden, task_id, stage_id, and goal. Do not translate legacy IDs or execute an unsupported envelope.";

function envelopeHeader(text) {
  try {
    const value = JSON.parse(text);
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch {
    return Object.fromEntries([...text.matchAll(/^(protocol|type|required_skill|task_id|stage_id|delegation|goal):\s*(.*?)\s*$/gm)]
      .map(([, key, value]) => [key, value.replace(/^(["'])(.*)\1$/, "$2")]));
  }
}

function isCode4MeEnvelope(text) {
  const header = envelopeHeader(text);
  return header.protocol === "code4me-ntg/v4" && header.type === "task"
    && header.required_skill === "code4me" && header.delegation === "forbidden"
    && typeof header.task_id === "string" && header.task_id.trim().length > 0
    && typeof header.stage_id === "string" && header.stage_id.trim().length > 0
    && typeof header.goal === "string" && header.goal.trim().length > 0;
}

function looksLikeTask(text) {
  const header = envelopeHeader(text);
  if (header.type === "result") return false;
  return header.required_skill === "code4me"
    || (typeof header.protocol === "string" && /^code4me-ntg\/v\d+$/.test(header.protocol));
}

function isProducerPrompt(text) {
  return !looksLikeTask(text)
    && (/(?:^|\s)crowd:/i.test(text)
      || /\b(?:code4me|build|implement|fix|repair|refactor|audit|validate|test|investigate|review)\b/i.test(text));
}

const Code4Me = {
  id: "code4me.ntg",
  async setup(ctx) {
    await ctx.session.hook("prompt", (event) => {
      const text = event.prompt.text ?? "";
      if ([GUIDANCE, PRODUCER_GUIDANCE, INVALID_GUIDANCE].some((guidance) => text.endsWith(`\n\n${guidance}`))) return;
      const guidance = isCode4MeEnvelope(text) ? GUIDANCE
        : looksLikeTask(text) ? INVALID_GUIDANCE : isProducerPrompt(text) ? PRODUCER_GUIDANCE : null;
      if (!guidance) return;
      const marker = guidance.split("\n")[0];
      if (!text.includes(marker)) event.prompt.text = `${text}\n\n${guidance}`;
    });
  },
};

export default Code4Me;
