import { IListing } from '../../types'

export interface ResultGetListings {
    total: number,
    result: IListing[]
}
export type GetListingsByUser = (
    listingsId: number[],
    limit?: number,
    page?: number
) => Promise<ResultGetListings>

export type GetListing = (id: string) => Promise<IListing>

export type GetListings = (
    where?: string,
    orderBy?: string,
    limit?: number,
    page?: number 
) => Promise<ResultGetListings>

export interface DBListing {
    getListingsByUser: GetListingsByUser
    getListing: GetListing
    getListings: GetListings
}

