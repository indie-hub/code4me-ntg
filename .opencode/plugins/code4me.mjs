const MARKER = "Code4Me task envelope detected.";
const GUIDANCE = `${MARKER}
Execute this task here; delegation is forbidden. Before planning, read every supplied Basic Memory memory:// reference. If memory.status is empty or unavailable, continue and preserve that status. Basic Memory is durable prior knowledge; .code4me/events.jsonl is task correlation; Context Mode is working-context processing. Return the same task ID and include durable, evidenced memory_candidates.
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
