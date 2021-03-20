import dotenv from 'dotenv'
import mysql from 'mysql'

dotenv.config()

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '3306'),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

db.connect((errorConnect) => {
    if (errorConnect) {
        console.error('[MYSQL error connect]', errorConnect.message)
    } else {
        console.log('database is connected')
    }
})

export { db }