import { ResultSetHeader } from 'mysql2'
import { connection } from './connect'

export const listings = async() => {
    const [listings] = await (await connection()).execute('SELECT * FROM listings')
    return listings
}

export const delete_listing = async(id: number): Promise<number> => {
    const [ countDeletedRows ] = await (await connection()).execute<ResultSetHeader>('DELETE FROM listings WHERE id = ?', [id])
    
    return countDeletedRows.affectedRows
}
