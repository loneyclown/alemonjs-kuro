import assert from 'node:assert/strict';
import test from 'node:test';
import { setTimeout as delay } from 'node:timers/promises';
import { createTestApp } from 'alemonjs/testing';
import { withProcessingFeedback, processingLazy } from '../lib/model/processing.js';

test('fast commands stay silent; slow commands notify once; failure clears the timer', async () => {
  let notifications = 0;
  const notify = async () => {
    notifications++;
  };
  assert.equal(await withProcessingFeedback(async () => 42, notify, 10), 42);
  await delay(25);
  assert.equal(notifications, 0);
  await withProcessingFeedback(
    async () => {
      await delay(40);
    },
    notify,
    5
  );
  assert.equal(notifications, 1);
  await assert.rejects(
    withProcessingFeedback(
      async () => {
        throw new Error('failed');
      },
      notify,
      5
    ),
    /failed/
  );
  await delay(25);
  assert.equal(notifications, 1);
  assert.equal(
    await withProcessingFeedback(
      async () => {
        await delay(25);
        return 'ok';
      },
      async () => {
        throw new Error('send failed');
      },
      5
    ),
    'ok'
  );
});

test('router wrapper includes lazy loading in its wait and preserves handler identity and return value', async () => {
  const app = createTestApp();
  const event = app.events.privateMessage({ text: '#mc体力' });
  const handler = await processingLazy(async () => {
    await delay(2100);
    return {
      default: received => {
        assert.equal(received, event);
        return true;
      }
    };
  })();
  try {
    const result = await app.runHandler(handler, event, 'alemonjs-kuro');
    assert.equal(result.value, true);
    assert.equal(result.messages.length, 1);
    assert.match(result.messages[0].text, /正在查询/);
  } finally {
    await app.dispose();
  }
});
