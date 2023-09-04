const { sendResponse } = require('../../responses/index')
const { db } = require('../../services/db')
const events = require('../../events.json')
const { v4: uuidv4 } = require('uuid');

const ticketAmounts = [
  { eventId: 1, totalTickets: 100 },
  { eventId: 2, totalTickets: 50 },
  { eventId: 3, totalTickets: 150 },
  { eventId: 4, totalTickets: 25 },
]

async function postOrderTicket(body) {
  const parsedBody = JSON.parse(body)
  
  const orderedTicket = {
    id: uuidv4(),
    eventId: parsedBody.eventId,
    eventInfo: events.events.find(ev => ev.id == parsedBody.eventId),
    redeemed: null
  }

  await db.put({
    TableName: 'tickets',
    Item: {...orderedTicket}
  }).promise()

  return sendResponse(200, orderedTicket)
}

module.exports.handler = async (event) => {
  console.log(event)
  try {
    return await postOrderTicket(event.body)
  } catch (error) {
    return sendResponse(400, error.message)
  }
};
