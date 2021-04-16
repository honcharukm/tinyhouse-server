import { IBooking } from '../../types'
import { GetBookings } from './types'
import { count } from '../../database.count'
import { select } from '../../database.select'

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

    const bookingsIdString = bookingsId.join(', ')
    const where = `id IN (${bookingsIdString})`

    const total = await count('bookings', where)

    const result = await select<IBooking[]>(
        'bookings',
        undefined,
        where,
        undefined,
        limit,
        page
    )

    return {
        total: total,
        result
    }
}