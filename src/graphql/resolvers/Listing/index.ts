import { IResolvers } from 'apollo-server-express'
import { IDatabase } from '../../../database/types'

export const listingResolver: IResolvers = {
    Query: {
        listings: async (
            _root: undefined,
            _arg: undefined, 
            { database }: { database: IDatabase}
        ) => {
            return await database.listing.getListings()
        }
    },
    Mutation: {
        deleteListing: async (
            _: undefined, 
            { id }: { id: number }, 
            { database }: { database: IDatabase }
        ) => {
            return await database.listing.deleteListing(id)
        }
    }
}