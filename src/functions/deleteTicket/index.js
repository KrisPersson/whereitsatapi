const { sendResponse } = require('../../responses/index')
const { db } = require('../../services/db')

async function deleteTicket(body) {
    const { ticketId } = body
    await db.delete({
        TableName: 'tickets',
        Key: {
            id: ticketId
        }
    }).promise()
    return sendResponse(200, 'Ticket successfully deleted!')
}

module.exports.handler = async (event) => {
    console.log(event)
    try {
        return await deleteTicket(JSON.parse(event.body))
        
    } catch (error) {
        return sendResponse(400, error.message)
    }
};
