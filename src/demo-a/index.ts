import { client, MODEL } from "../shared/client.js";
import fs from 'fs';

const source = fs.readFileSync(new URL('./source.md', import.meta.url), 'utf8');

console.log('--------------------------------');
console.log('Question without the doc:');
console.log('--------------------------------');
const question = 'How many days of PTO can I take by November 1st if I have worked for 3 year in this company?';
  const answer = await client.messages.create({
    model: MODEL,
    messages: [{ role: 'user', content: question }],
    max_tokens: 1000,
  });
  for (const block of answer.content) {
    if (block.type === "text") {
      console.log(block.text);
    }
  }

  console.log('--------------------------------');
  console.log('Question with the doc:');
  console.log('--------------------------------');
  const systemMessage = `
  You are a helpful assistant that can answer questions about the company's vacation policy.
  The company's vacation policy is as follows:
  ${source}
  `;
const questionMessageWithSystemPrompt = `${systemMessage}\n\n${question}`;
const answerWithDoc = await client.messages.create({
  model: MODEL,
  messages: [{ role: 'user', content: questionMessageWithSystemPrompt }],
  max_tokens: 1000,
});
for (const block of answerWithDoc.content) {
  if (block.type === "text") {
    console.log(block.text);
  }
}