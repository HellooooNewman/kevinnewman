import { test } from 'node:test';
import assert from 'node:assert/strict';
import { estimateReadingMinutes, getPostReadMinutes } from './blog-reading-time.ts';

test('rounds up at 200 words per minute, with a one-minute minimum', () => {
  assert.equal(estimateReadingMinutes(''), 1);
  assert.equal(estimateReadingMinutes('word '.repeat(200)), 1);
  assert.equal(estimateReadingMinutes('word '.repeat(201)), 2);
});

test('ignores implementation code, component attributes, and link destinations', () => {
  const source = `export const data = "${'hidden '.repeat(500)}";

[Read this](https://example.com/${'path/'.repeat(500)})

<Demo label="${'hidden '.repeat(500)}" />

${'visible '.repeat(180)}`;
  assert.equal(estimateReadingMinutes(source), 1);
});

test('counts formatted prose, inline code, fenced code, and table cells', () => {
  const source = `# Heading

**${'bold '.repeat(50)}** *${'italic '.repeat(50)}*

\`${'inline '.repeat(50)}\`

\`\`\`text
${'code '.repeat(50)}
\`\`\`

| Column |
| --- |
| ${'cell '.repeat(50)} |`;
  assert.equal(estimateReadingMinutes(source), 2);
});

test('uses a manual override without needing to read the article', async () => {
  assert.equal(await getPostReadMinutes({ slug: 'no-source-needed', readMinutes: 7 }), 7);
});

test('rejects invalid manual overrides', async () => {
  for (const readMinutes of [0, -1, 1.5, NaN]) {
    await assert.rejects(getPostReadMinutes({ slug: 'invalid', readMinutes }), /positive whole number/);
  }
});
