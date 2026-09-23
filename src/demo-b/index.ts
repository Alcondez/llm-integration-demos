// Demo B — "thinking budget"
// Same multi-step task at low vs high effort, N >= 10 trials per setting.
// Output: table of accuracy, latency, tokens/cost. A mini eval, not a gotcha.
// Rule 2: effort buys odds, not guarantees.

import { client, MODEL } from "../shared/client.js";

const N = 30;

const task = `You may use any listed flights. Build one itinerary from GRU to the Vancouver meeting. Offsets only, no daylight-saving: GRU UTC-3, LIS UTC+0, JFK UTC-5, BOS UTC-5, SEA UTC-8, YVR UTC-8. An arrival clock earlier than that leg's departure clock is the next local day.

First landing in the United States (JFK or BOS) takes 80 minutes of immigration. Connection time starts after that. Then each airport's MCT must fit: LIS 45, JFK 50, BOS 40, SEA 40. A connection that is even one minute short is illegal. After YVR landing, 55 minutes to the venue. The meeting is Sunday 2026-03-08 07:00 local YVR. You must be at the venue strictly before 07:00.

Flights (local times):
A  GRU→LIS  dep Fri 2026-03-06 23:40  arr 13:10
B  LIS→JFK  dep Sat 14:50  arr 17:35
C  LIS→BOS  dep Sat 15:10  arr 17:50
D  JFK→SEA  dep Sat 19:20  arr 21:50
E  JFK→YVR  dep Sat 19:30  arr 23:00
F  JFK→SEA  dep Sat 23:40  arr 02:10
G  SEA→YVR  dep Sat 22:45  arr 23:35
H  SEA→YVR  dep Sun 05:20  arr 06:10
I  JFK→YVR  dep Sun 08:15  arr 11:50
K  BOS→YVR  dep Sat 19:45  arr 22:50
L  BOS→YVR  dep Sat 20:15  arr 23:20

Report the unique legal on-time itinerary as flight IDs joined by hyphens. Nothing else.`

// A-C-L. JFK paths miss the meeting. K misses MCT by 5.
const EXPECTED = "A-C-L";

const grade = (answer: string) => {
    const stripped = answer.toUpperCase().replace(/[*_`~.,:;!?()[\]{}"'“”‘’]/g, "");
    const token = EXPECTED.toUpperCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(?<![A-Z0-9-])${token}(?![A-Z0-9-])`).test(stripped);
};

const effortSettings = ['low', 'medium', 'high'] as const;

// Sonnet 5 list price. https://platform.claude.com/docs/en/about-claude/pricing
const INPUT_USD_PER_MTOK = 2;
const OUTPUT_USD_PER_MTOK = 10;

const median = (xs: number[]) => {
    const s = [...xs].sort((a, b) => a - b);
    const mid = Math.floor(s.length / 2);
    const a = s[mid];
    const b = s[mid - 1];
    if (a === undefined) return 0;
    return s.length % 2 === 1 || b === undefined ? a : (a + b) / 2;
};

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;

const estimatedCostUsd = (inputTokens: number, outputTokens: number) =>
    (inputTokens / 1e6) * INPUT_USD_PER_MTOK + (outputTokens / 1e6) * OUTPUT_USD_PER_MTOK;

type Outcome = "correct" | "wrong" | "truncated";

const outcomeOf = (answer: string, stop: string | null): Outcome => {
    if (stop === "max_tokens") return "truncated";
    return grade(answer) ? "correct" : "wrong";
};

const results: {
    effort: (typeof effortSettings)[number];
    outcome: Outcome;
    latencyMs: number;
    inputTokens: number;
    outputTokens: number;
    stop: string | null;
    answer: string;
}[] = [];

for (const effort of effortSettings) {
    for (let i = 0; i < N; i++) {
        const startTime = performance.now();
        const answer = await client.messages.create({
            model: MODEL,
            messages: [{ role: 'user', content: task }],
            max_tokens: 2500,
            output_config: {
                effort: effort as "low" | "medium" | "high" | "xhigh" | "max"
              }
        });
        const answerText = answer.content.filter((block) => block.type === "text").map((block) => block.text).join("");
        const stop = answer.stop_reason;
        results.push({
            effort,
            outcome: outcomeOf(answerText, stop),
            latencyMs: performance.now() - startTime,
            inputTokens: answer.usage?.input_tokens ?? 0,
            outputTokens: answer.usage?.output_tokens ?? 0,
            stop,
            answer: answerText,
        });
    }
}

const rows = effortSettings.map((effort) => {
    const trials = results.filter((r) => r.effort === effort);
    const correct = trials.filter((t) => t.outcome === "correct").length;
    const inputTokens = trials.reduce((s, t) => s + t.inputTokens, 0);
    const outputTokens = trials.reduce((s, t) => s + t.outputTokens, 0);
    return {
        effort,
        accuracy: `${correct}/${N}`,
        medianLatencyMs: Math.round(median(trials.map((t) => t.latencyMs))),
        meanOutputTokens: Math.round(mean(trials.map((t) => t.outputTokens))),
        estimatedCost: `$${estimatedCostUsd(inputTokens, outputTokens).toFixed(4)}`,
    };
});

console.table(results.map((r) => ({
    effort: r.effort,
    outcome: r.outcome,
    latencyMs: Math.round(r.latencyMs),
    outputTokens: r.outputTokens,
    stop: r.stop,
    answer: r.answer,
})));

const failures = results
    .filter((r) => r.outcome !== "correct")
    .map((r) => ({
        effort: r.effort,
        stop: r.stop,
        answerTail: r.answer.slice(-80),
    }));
if (failures.length > 0) {
    console.table(failures);
}

console.table(rows);
