import { connect } from '../../database.connect'
import { GetListing, GetListings} from './types'
import { RowDataPacket } from 'mysql2'
import { IListing } from '../../types'

export const getListings: GetListings = async (
    listingsId, 
    limit = 3,
    page = 1 
) => {
    if (listingsId.length === 0) {
        return {
            total: 0,
            result: []
        }
    }

    const db = await connect()

    const sqlTotal = `
        SELECT COUNT(*) 
        FROM listings 
        WHERE id IN (${listingsId.join(', ')})
    `

    const [ total ] = await db.execute<RowDataPacket[]>(sqlTotal)

    const sqlListings = `
        SELECT * 
        FROM \`listings\`
        WHERE id IN (${listingsId.join(', ')})
        LIMIT ${ page > 0 ? (page - 1) * limit : 0 }, ${limit}
    `

    const [ result ] = await db.execute<IListing[]>(sqlListings)

    return {
        total: total[0]['COUNT(*)'],
        result
    }
}

export const getListing: GetListing = async (id) => {
    const sql = `
        SELECT * FROM \`listings\` WHERE id = ${id}
    `

    const db = await connect()
    const [ result ] = await db.execute<IListing[]>(sql)

    return result[0]
}