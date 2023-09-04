const { sendResponse } = require('../../responses/index')
const { db } = require('../../services/db')


async function verifyTicket(body) {
  const { ticketId } = body
  const ticket = await db.get({
    TableName: 'tickets',
    Key: {
      id: ticketId
    }
  }).promise()
  if (!ticket.Item) {
    return sendResponse(200, 'Ticket with provided ID not found')
  } else if (ticket.Item.redeemed !== null) {
    return sendResponse(200, `Ticket already redeemed on ${ticket.Item.redeemed}`)
  } else {
    await redeemTicket(ticketId)
    return sendResponse(200, 'Welcome!')
  }
}

async function redeemTicket(ticketId) {
  await db.update({
    TableName: 'tickets',
    Key: { id: ticketId },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'set redeemed = :redeemed',
    ExpressionAttributeValues: {
      ':redeemed': new Date().toLocaleString()
    }
  }).promise()
}

module.exports.handler = async (event) => {
  console.log(event)
  try {
    return await verifyTicket(JSON.parse(event.body))
    
  } catch (error) {
    return sendResponse(400, error.message)
  }
};
