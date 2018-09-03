const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('Single item view', () => {
  describe('fill out form and create a new item', () => {
    it('select and render the new item', () => {
      // setup
      const itemToCreate = buildItemObject();
      // excercise
      browser.url('/items/create');
      browser.setValue('#title-input', itemToCreate.title);
      browser.setValue('#description-input', itemToCreate.description);
      browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
      browser.click('#submit-button');
      browser.click('.item-card a');
      // verify
      assert.include(browser.getText('body'), itemToCreate.description);
    });
  });
});
