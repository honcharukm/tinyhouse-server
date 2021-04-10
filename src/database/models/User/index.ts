import { ResultSetHeader } from 'mysql2'
import { connect } from '../../database.connect'
import { IUser } from '../../types'
import { CreateUser, GetUser, GetUserByToken, UpdateUser} from './types'

export const getUser: GetUser = async (id) => {
    const whereId = typeof(id) === 'string' 
        ? `userId = '${id}'`
        : `id = ${id}`
        
    const sql = `SELECT * FROM \`users\` WHERE ${whereId}`

    const db = await connect()
    const [ result ] = await db.execute<IUser[]>(sql)

    return result[0]
}

export const getUserByToken: GetUserByToken = async (userId, token) => {
    const sql = `
        SELECT * FROM \`users\` 
        WHERE token = '${token}' AND userId = '${userId}'
    `

    const db = await connect()
    const [ result ] = await db.execute<IUser[]>(sql)

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
        return await getUser(result.insertId)
    } else {
        throw new Error('Failed to create user')
    }
}