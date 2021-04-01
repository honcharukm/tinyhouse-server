import { connect } from '../database.connect'
import { GetListings, DeleteListing } from '../types'
import { OkPacket, RowDataPacket } from 'mysql2'

export const getListings: GetListings = async () => {
    const sql = `SELECT * FROM listings`

    const [ listings ] = await(await connect()).execute<RowDataPacket[]>(sql)
    return listings
}

export const deleteListing: DeleteListing = async (id) => {
    const sql = `DELETE FROM listings WHERE id = ?`
    const values = [ id ]

    const [ countDeletedRows ] = await (await connect()).execute<OkPacket>(sql, values)
    
    return countDeletedRows
}