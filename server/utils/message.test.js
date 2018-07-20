const expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message')

describe('generateMessage',()=>{
  it('should generate correct message object',()=>{
    var from = 'jen';
    var text = 'some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
  });
});
describe('generateLocationMessage',()=>{
  it('Should generate correct Location object',()=>{
    var from='goku'
    var latitude=28.5880391
    var longitude=77.3161336
    var location = generateLocationMessage(from,latitude,longitude);
    expect(location.createdAt).toBeA('number');
    expect(location.url).toEqual('https://www.google.com/maps?q=28.5880391,77.3161336')
  })
})
