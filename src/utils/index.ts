import { Request } from 'express'
import { RowDataPacket } from 'mysql2'
import { IDatabase, IUser } from '../database/types'

export const authorize = async (
    db: IDatabase, 
    req: Request
): Promise<IUser| RowDataPacket | null> => {
    const token = req.get('X-CSRF-TOKEN')
    const viewer = await db.user.getUserByToken(
        req.signedCookies.viewer,
        token
    )

    return viewer
}