const { sendResponse } = require('../../responses/index')

const soldTickets = [
  { ticketId: 'lkjsdflkjsdf', redeemed: null }
]

async function verifyTicket(body) {
  const { ticketId } = body
  const ticket = soldTickets.find(ticket => ticket.ticketId === ticketId)
  if (!ticket) {
    return sendResponse(200, 'Ticket with provided ID not found')
  } else if (ticket.redeemed !== null) {
    return sendResponse(200, 'Ticket already redeemed')
  } else {
    return sendResponse(200, 'Welcome!')
  }
}

module.exports.handler = async (event) => {
  console.log(event)
  return verifyTicket(JSON.parse(event.body))
};
