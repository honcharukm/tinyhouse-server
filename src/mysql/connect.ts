import dotenv from 'dotenv'
import mysql2 from 'mysql2/promise'

dotenv.config()

const configToConnect = {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '3306'),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
}

const connection = async() => {
    return await mysql2.createConnection(configToConnect)
}

export { connection }