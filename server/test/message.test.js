const assert = require('assert');
const {
  generateMessage
} = require('../utils/message');

describe('generateMessage', () => {
  let from = 'Sumedha',
    text = 'see you all there!';
  let message = generateMessage(from, text);
  assert(message.from === from);
  assert(message.text === text);

});