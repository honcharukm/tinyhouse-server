import { connect } from './../src/database/database.connect'
import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise'

const deleteTable = async(db: Pool, tableName: string) => {
    try {
        const [ table ]  = 
            await db.execute<RowDataPacket[]>(`SHOW TABLES LIKE '${tableName}'`)

        if (table.length !== 0) {
            const [ deleteTable ] = 
                await db.execute<ResultSetHeader>(`DROP TABLE ${tableName}`)

            if (deleteTable.serverStatus === 2) {
                console.log(`[TABLE DELETE]: ${tableName}`)
            }
        }
    } catch (e) {
        console.error(`[TABLE DELETE]: ${tableName} error`, e)
    }
}

const clear = async () => {
    console.log('[CLEAR]: starting')

    try {
        const db: Pool = await connect()

        await deleteTable(db, 'bookings')
        await deleteTable(db, 'users')
        await deleteTable(db, 'listings')
    } catch (e) {
        console.error(e)
    }

    console.log('[CLEAR]: END')
}

clear()