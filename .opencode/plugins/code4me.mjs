const MARKER = "Code4Me task envelope detected.";
const GUIDANCE = `${MARKER}
Mandatory worker contract: load and follow the installed code4me skill's Incoming worker contract before acting. If that skill is unavailable, return blocked instead of silently bypassing it. Execute this task here; delegation is forbidden. Before planning, read every supplied Basic Memory memory:// reference. If memory.status is empty or unavailable, continue and preserve that status. Basic Memory is durable prior knowledge; .code4me/events.jsonl is task correlation; Context Mode is working-context processing. Return the same milestone, task, and stage IDs, non-empty truthful tool_evidence, and any durable evidenced memory_candidates. If reply_to.transport is crowded, end the turn after the accepted result send and do not launch a background waiter or poll for acknowledgement. If reply_to.transport is native, return the result normally; the producer must join the native subagent.
Actually open every supplied memory:// reference before planning. For standard or critical work, search Basic Memory for relevant gaps when available; report truthful Basic Memory tool evidence or an unavailable reason. memory.status used or empty requires memory.searched true; unavailable requires false and a reason. Always return memory_candidates, using [] when no durable lesson was found.
Source comments explain code only. Never put task or milestone IDs, status, TODO/FIXME items, plans, progress, deferred work, or handover notes in source comments. Return such information through deferred_work in the result envelope.
Use the Code4Me Technical English profile for all technical and operational communication. Use short active-voice sentences, one action or idea per sentence, consistent terms, and explicit actors, artifacts, and expected results. Do not use idioms or vague references. Preserve code, commands, paths, logs, error messages, and quotations exactly.
Toolbox: Basic Memory=past decisions and lessons; CodeGraph=exact structure; CCC=semantic source discovery; Context Mode=large derived or non-source output; narrow native reads when cheaper.`;

function isEnvelope(text) {
  return /\btask_id\s*:/i.test(text)
    && /\bdelegation\s*:\s*forbidden\b/i.test(text)
    && /\bgoal\s*:/i.test(text);
}

export const Code4Me = async () => ({
  "chat.message": async (_input, output) => {
    const part = output.parts?.find(
      (candidate) => candidate.type === "text" && isEnvelope(candidate.text ?? ""),
    );
    if (part && !part.text.includes(MARKER)) {
      part.text += `\n\n${GUIDANCE}`;
    }
  },
});
