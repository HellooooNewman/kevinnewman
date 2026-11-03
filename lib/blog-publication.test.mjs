import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isPostPublished } from './blog-publication.ts';

const now = new Date('2026-11-03T12:00:00Z');

test('only due, published, non-draft posts can appear in listings', () => {
  const cases = [
    [{ date: '2026-11-03' }, true],
    [{ date: '2026-11-03', published: true }, true],
    [{ date: '2026-11-03', published: false }, false],
    [{ date: '2026-11-03', draft: true }, false],
    [{ date: '2026-11-03', draft: true, published: true }, false],
    [{ date: '2026-11-04', published: true }, false],
  ];
  for (const [post, expected] of cases) assert.equal(isPostPublished(post, now), expected, JSON.stringify(post));
});

test('scheduled publication starts at midnight UTC', () => {
  const post = { date: '2026-11-04', published: true };
  assert.equal(isPostPublished(post, new Date('2026-11-03T23:59:59Z')), false);
  assert.equal(isPostPublished(post, new Date('2026-11-04T00:00:00Z')), true);
});

test('an explicit unpublished state remains hidden after the date is due', () => {
  assert.equal(isPostPublished({ date: '2025-01-01', published: false }, now), false);
});
