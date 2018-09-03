const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
    it('create and view a single item', async () => {
      // store an item in the database
      const item = await seedItemToDatabase();
      const itemId = item._id;
      // request the item
      const response = await request(app)
        .get('/items/' + itemId)
        .send(itemId);
      // Check if the created item's title and description are in the returned HTML
      assert.equal(response.status , 200);
      assert.include(parseTextFromHTML(response.text, '#item-title'), item.title);
      assert.include(parseTextFromHTML(response.text, '#item-description'), item.description);
    });
  });
});
