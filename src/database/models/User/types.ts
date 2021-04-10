import { IUser } from '../../types'

export type UpdateUser = <TField = {}>(id: string, fields: TField) => Promise<IUser | undefined>
export type CreateUser = <TField = {}>(fields: TField) => Promise<IUser>
export type GetUserByToken = (userId: string, token: string | undefined) => Promise<IUser>
export type GetUser = (id: string | number) => Promise<IUser>

export interface DBUser {
    getUser: GetUser
    getUserByToken: GetUserByToken
    createUser: CreateUser
    updateUser: UpdateUser
}