import crypto from 'crypto'
import { IResolvers } from 'apollo-server-express'
import { Google } from '../../../api'
import { Viewer } from '../../../types'
import { IDatabase, IUser } from '../../../database/types'
import { LogInArgs } from './types'
import { RowDataPacket } from 'mysql2'

const logInViaGoogle = async (
    code: string, 
    token: string, 
    db: IDatabase
): Promise<IUser | RowDataPacket> => {
    const { user } = await Google.logIn(code)
    
    if (!user) {
        throw new Error(`Google login error`)
    }

    const userNamesList = user.names && user.names.length ? user.names : null
    const userPhotosList = user.photos && user.photos.length ? user.photos : null
    const userEmailsList = user.emailAddresses && user.emailAddresses.length ? user.emailAddresses : null

    const userName = 
        userNamesList 
            ? userNamesList[0].displayName 
            : null
    
    const userId = 
        userNamesList &&
        userNamesList[0].metadata &&
        userNamesList[0].metadata.source
            ? userNamesList[0].metadata.source.id
            : null 

    const userAvatar = 
        userPhotosList && 
        userPhotosList[0].url
            ? userPhotosList[0].url
            : null

    const userEmail = 
        userEmailsList &&
        userEmailsList[0].value
            ? userEmailsList[0].value
            : null

    if (!userId || !userAvatar || !userEmail || !userName) {
        throw new Error('Google login error')
    }

    const updateUser = await db.user.updateUser(userId, {
        name: userName,
        avatar: userAvatar,
        contact: userEmail,
        token
    })

    let viewer = updateUser

    if (!viewer) {
        const createUser = await db.user.createUser({
            userId: userId,
            token,
            avatar: userAvatar,
            contact: userEmail,
            income: 0,
            name: userName,
            bookings: JSON.stringify([]),
            listings: JSON.stringify([])
        })

        viewer = createUser
    }

    return viewer
}

export const ViewerResolvers: IResolvers = {
    Query: {
        authUrl: (): string => {
            try {
                return Google.authUrl
            } catch (error) {
                throw new Error(`Failed to query Google Auth Url: ${error}`)
            }
        }
    },
    Mutation: {
        logIn: async (
            _root: undefined, 
            { input }: LogInArgs, 
            { database }: { database: IDatabase }
        ): Promise<Viewer> => {
            try {
                const code = input ? input.code : null
                const token = crypto.randomBytes(16).toString('hex')

                const viewer: IUser | RowDataPacket | undefined = code 
                    ? await logInViaGoogle(code, token, database) 
                    : undefined

                if (!viewer) {
                    return { didRequest: true }
                }

                return {
                    _id: viewer.userId,
                    token: viewer.token,
                    avatar: viewer.avatar,
                    walletId: viewer.walletId,
                    didRequest: true
                }

            } catch (error) {
                throw new Error(`Failed to log in: ${error}`) 
            } 
        },
        logOut: (): Viewer => {
            try {
                return {
                    didRequest: true
                }
            } catch (e) {   
                throw new Error(`Failed to log out: ${e}`)
            }
        }
    },
    Viewer: {
        id: (viewer: Viewer): string | undefined => { 
            return viewer._id 
        },
        hasWallet: (viewer: Viewer): boolean | undefined => {
            return viewer.walletId ? true : undefined
        }
    }
}