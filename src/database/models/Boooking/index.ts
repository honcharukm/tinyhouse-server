import { OkPacket } from 'mysql2'
import { connect } from '../../database.connect'
import { IBooking } from '../../types'
import { GetBookings } from './types'

export const getBookings: GetBookings = async (
    bookingsId, 
    limit = 3,
    page = 1 
) => {
    if (bookingsId.length === 0) {
        return {
            total: 0,
            result: []
        }
    }

    const db = await connect()

    const sqlTotal = `
        SELECT COUNT(*) 
        FROM bookings 
        WHERE id IN (${bookingsId.join(', ')})
    `

    const [ total ] = await db.execute<OkPacket>(sqlTotal)

    const sqlBookings = `
        SELECT * 
        FROM bookings
        WHERE id IN (${bookingsId.join(', ')})
        LIMIT ${ page > 0 ? (page - 1) * limit : 0 }, ${limit}
    `

    const [ result ] = await db.execute<IBooking[]>(sqlBookings)

    return {
        total: total.fieldCount,
        result
    }
}