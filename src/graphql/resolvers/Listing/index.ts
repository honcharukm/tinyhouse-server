import { IResolvers } from 'apollo-server-express'
import { IDatabase, IListing, IUser } from '../../../database/types'
import { 
    ListingArgs,
    ListingBookingsArgs,
    ListingBookingsData,
    ListingsArgs,
    ListingsData,
    ListingsFilters
} from './types'
import { authorize } from '../../../utils/'
import { Request } from 'express'

export const ListingResolvers: IResolvers ={
    Query: {
        listing: async (
            _root: undefined,
            { id }: ListingArgs,
            { database, req }: { database: IDatabase, req: Request}
        ): Promise<IListing> => {
            try {
                const listing = await database.listing.getListing(id)

                if (!listing) {
                    throw new Error('Listing can\'t be found')
                }

                const viewer = await authorize(database, req)
                if (viewer && viewer.userId === listing.host) {
                    listing.authorized = true
                }

                return listing
            } catch (e) {
                throw new Error(`Failed to query listing: ${e}`)
            }
        },
        listings: async (
            _root: undefined,
            { filter, limit, page }: ListingsArgs,
            { database }: { database: IDatabase }
        ): Promise<ListingsData> => {
            try {
                let order

                if (filter && filter === ListingsFilters.PRICE_HIGH_TO_LOW) {
                    order = 'price DESC'
                }

                if (filter && filter === ListingsFilters.PRICE_LOW_TO_HIGH) {
                    order = 'price ASC'
                }

                const listings = database.listing.getListings(undefined, order, limit, page)

                return listings
            } catch (e) {
                throw new Error(`Failed to query listings: ${e}`)
            }
        }
    },
    Listing: {
        host: async (
            listing: IListing,
            _args: {},
            { database }: { database: IDatabase }
        ): Promise<IUser> => {
            const host = await database.user.getUser(listing.host)

            if (!host) {
                throw new Error('Host can\'t be found')
            }

            return host
        },
        bookingsIndex: (listing: IListing): string => {
            return JSON.stringify(listing.bookingsIndex)
        },
        bookings: async (
            listing: IListing,
            { limit, page }: ListingBookingsArgs,
            { database }: { database: IDatabase }
        ): Promise<ListingBookingsData | null> => {
            try {
                if (!listing.authorized) {
                    return null
                }

                const bookingsId = JSON.parse(listing.bookings)
                const listingBookings = 
                    await database.booking.getBookings(
                        bookingsId, 
                        limit, 
                        page
                    )

                return listingBookings
            } catch (e) {
                throw new Error(`Failed to query listing bookings: ${e}`)
            }
        } 
    }
}