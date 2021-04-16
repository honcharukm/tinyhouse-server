import dotenv from 'dotenv'
import { Pool, PoolOptions, createPool } from 'mysql2/promise'

dotenv.config()

type Connect = (config?: PoolOptions | null) => Promise<Pool>

export const connect: Connect = async(config) => {
    if (config) {
        return await createPool(config)
    } 

    return await createPool({
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT || '3306'),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    })
}