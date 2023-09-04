const { sendResponse } = require('../../responses/index')
const events = require('../../events.json')

module.exports.handler = async (event) => {
  console.log(event)

  return sendResponse(200, events)
};
