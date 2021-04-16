import { select } from '../../database.select'
import { count } from '../../database.count'
import { GetListing, GetListings, GetListingsByUser} from './types'
import { IListing } from '../../types'

export const getListingsByUser: GetListingsByUser = async (
    listingsId, 
    limit = 3,
    page = 1 
) => {
    if (listingsId.length === 0) {
        return {
            total: 0,
            result: []
        }
    }

    const listingsIdString = listingsId.join(', ')

    const totalListings = await count('listings', `id IN (${listingsIdString})`)

    const result = await select<IListing[]>(
        'listings', 
        undefined, 
        `id IN (${listingsIdString})`, 
        undefined,
        limit,
        page 
    )

    return {
        total: totalListings,
        result
    }
}

export const getListing: GetListing = async (id) => {
    const result = await select<IListing[]>('listings', undefined, `id = ${id}`)
    return result[0]
}

export const getListings: GetListings = async (where, orderBy, limit = 3, page = 1) => {
    try {
        const totalListings = await count('listings', where)
        const listings = await select<IListing[]>('listings', undefined, where, orderBy, limit, page)

        return {
            total: totalListings,
            result: listings
        }
    } catch (e) {
        throw new Error(`Failed to get liistings: ${e}`)
    }
}