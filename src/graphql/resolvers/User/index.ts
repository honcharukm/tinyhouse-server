import { IResolvers } from 'apollo-server-express'
import { Request } from 'express'
import { IDatabase, IUser } from '../../../database/types'
import { authorize } from '../../../utils'
import { UserArgs, UserBookingsArgs, UserBookingsData, UserListingsArgs, UserListingsData } from './types'

export const UserResolvers: IResolvers = {
    Query: {
        user: async (
            _root: undefined,
            { id }: UserArgs,
            { database, req }: {database: IDatabase, req: Request}
        ): Promise<IUser> => {
            try {
                const user = await database.user.getUser(id) 

                if (!user) {
                    throw new Error('User cant\'t be found')
                }

                const viewer = await authorize(database, req)

                if (viewer && viewer.userId === user.userId) {
                    user.authorized = true
                }

                return user
            } catch (error) {
                throw new Error(`Failed to query user: ${error}`)
            }
        }
    },
    User: {
        hasWallet: (user: IUser): boolean => {
            return Boolean(user.walletId)
        },
        income: (user: IUser): number | null => {
            return user.authorized ? user.income : null
        },
        bookings: async (
            user: IUser,
            { limit, page }: UserBookingsArgs,
            { database }: { database: IDatabase }
        ): Promise<UserBookingsData | null> => {
            try {
                if (!user.authorized) {
                    return null
                }
                
                const bookingsId = JSON.parse(user.bookings)
                const bookings = await database.booking.getBookings(bookingsId, limit, page)

                return bookings
            } catch (error) {
                throw new Error(`Failed to query user bookings: ${error}`)
            }
        },
        listings: async (
            user: IUser,
            { limit, page }: UserListingsArgs,
            { database }: { database: IDatabase }
          ): Promise<UserListingsData | null> => {
            try {
                const listingsId = JSON.parse(user.listings)
                const listings = await database.listing.getListingsByUser(listingsId, limit, page)
                
                return listings
            } catch (error) {
              throw new Error(`Failed to query user listings: ${error}`)
            }
          }

    }
}