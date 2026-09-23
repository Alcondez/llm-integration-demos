# llm-integration-demos

Runnable proof for the post *"Your LLM is an unreliable external API: 3 integration rules for software engineers"*.

## Setup

```sh
pnpm install
cp .env.example .env   # add your ANTHROPIC_API_KEY
```

## Demos

### A — recall vs context

`pnpm demo:a`. 

Niche fact from memory refuses; the same fact in context is answered from context.

A modal without context can only recall information from it's training data, so if asked a question that required context that is not part of that it will refuse to answer, ask for more information or even worse, guess and give you a wrong answer with confidence. That is why we need to provide the model with the right context to get a better and more accurate answer.

### B — thinking budget

`pnpm demo:b`. 

Low vs high effort over N runs: accuracy, latency, tokens.

One of the knobs we can use when calling an LLM is the effort level, think of it as telling the model how hard it should try when working through a problem before giving up. One thing to keep in mind is that a higher effort does guarantee a correct answer, it just gives us better odds of getting one at the cost of more tokens used, so this is a crucial decision when integrating an LLM, since it heavily impacts how efficient our use of it is. 

## Demo B sample run

N = 30 per effort, `claude-sonnet-5`. `estimatedCost` is the total for those 30 runs at today's Sonnet 5 list price: $2/MTok input, $10/MTok output.


| effort | accuracy | medianLatencyMs | meanOutputTokens | estimatedCost |
| ------ | -------- | --------------- | ---------------- | ------------- |
| low    | 28/30    | 4807            | 363              | $0.1464       |
| medium | 29/30    | 7748            | 787              | $0.2736       |
| high   | 26/30    | 14987           | 1542             | $0.5002       |



| effort | correct | wrong answer   | cut off at max_tokens                               |
| ------ | ------- | -------------- | --------------------------------------------------- |
| low    | 28      | 2 (A-B-E, C-L) | 0                                                   |
| medium | 29      | 0              | 1                                                   |
| high   | 26      | 0              | 4 (+1 cut off after the answer, which still passed) |


