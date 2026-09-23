# llm-integration-demos

Runnable proof for the post *"Your LLM is an unreliable external API: 3 integration rules for software engineers"*.

## Setup

```sh
pnpm install
cp .env.example .env   # add your ANTHROPIC_API_KEY
```

## Demos

| Demo | Command | Shows |
|---|---|---|
| A — recall vs context | `pnpm demo:a` | Niche fact from memory wobbles; same fact in context is correct. |
| B — thinking budget | `pnpm demo:b` | Low vs high effort over N runs: accuracy, latency, tokens. |
