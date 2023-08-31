const { sendResponse } = require('../../responses/index')
const events = require('../../events.json')
const { v4: uuidv4 } = require('uuid');


const ticketAmounts = [
  { eventId: 1, totalTickets: 100 },
  { eventId: 2, totalTickets: 50 },
  { eventId: 3, totalTickets: 150 },
  { eventId: 4, totalTickets: 25 },
]

async function postOrderTicket(body) {
  const orderedTicket = {
    ticketId: uuidv4(),
    eventInfo: events.find(ev => ev.id === body.eventId)
  }
  sendResponse(200, orderedTicket)
}

module.exports.handler = async (event) => {
  console.log(event)
  return postOrderTicket(event.body)
};
