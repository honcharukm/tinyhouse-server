import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { connect } from '../database.connect'
import { CreateUser, GetUser, GetUserById, UpdateUser} from '../types'

export const getUser: GetUser = async (userId) => {
    const sql = `
        SELECT * FROM users WHERE FIND_IN_SET(userId, '${userId}')
    `

    const db = await connect()
    const [ result ] = await db.execute<RowDataPacket[]>(sql)

    return result[0]
}

export const getUserById: GetUserById = async (id) => {
    const sql = `
        SELECT * FROM users WHERE id = ${id}
    `

    const db = await connect()
    const [ result ] = await db.execute<RowDataPacket[]>(sql)

    return result[0]
}

export const updateUser: UpdateUser = async (userId, fields) => {
    const set: string[] = []

    for (let name in fields) {
        set.push(`${name} = '${fields[name]}'`)
    }

    const sql = `
        UPDATE users SET ${set.join(', ')} WHERE FIND_IN_SET(userId, '${userId}')
    `
    
    const db = await connect()
    const [ result ] = await db.execute<ResultSetHeader>(sql)

    if (result.affectedRows > 0) {
        const res = await getUser(userId)
        return res
    }
    
    return undefined
}

export const createUser: CreateUser = async (fields) => {
    const sql = `
        INSERT INTO users (${Object.keys(fields).join(', ')})
        VALUES (${Object.keys(fields).map(_ => '?').join(', ')})
    `
    const db = await connect()
    const [ result ] = await db.execute<ResultSetHeader>(sql, Object.values(fields))

    if (result.affectedRows > 0) {
        return await getUserById(result.insertId)
    } else {
        throw new Error('Failed to create user')
    }
}