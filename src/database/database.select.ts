import { RowDataPacket } from 'mysql2'
import { connect } from './database.connect'

export const select = async <TData extends RowDataPacket[]>(
        tableName: string,
        fields?: string, 
        where?: string, 
        orderBy?: string,
        limit: number = 0,
        page: number = 1
): Promise<TData> => {
    try {
        const isWhere = where ? `WHERE ${where}` : ''
        const isFields = fields ? `${fields}` : '*'
        const isOrderBy = orderBy ? `ORDER BY ${orderBy}` : ''
        const isLimit = limit !== 0 
            ? `LIMIT ${ page > 0 ? (page - 1) * limit : 0 }, ${limit}` : ''

        const sql = `
            SELECT ${isFields}
            FROM \`${tableName}\`
            ${isWhere}
            ${isOrderBy}
            ${isLimit}
        `

        const databaseConnect = await connect()
        const [ result ] = await databaseConnect.execute<TData>(sql)
        return result
    } catch (error) {
        throw new Error(`Failed to select ${tableName}: ${error}`)
    }
}