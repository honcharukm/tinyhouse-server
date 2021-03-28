import { IResolvers } from 'apollo-server-express'

export const resolvers: IResolvers = {
    Query: {
        listings: async (
            _root: undefined,
            _arg: undefined, 
            { db }
        ) => {
            return await db.listings()
        }
    },
    Mutation: {
        deleteListing: async (
            _: undefined, 
            { id }: { id: number }, 
            { db }
        ) => {
            return await db.delete_listing(id)
        }
    }
}