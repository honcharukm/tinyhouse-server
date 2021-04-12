import { IListing } from '../../types'

export interface ResultGetListings {
    total: number,
    result: IListing[]
}
export type GetListings = (
    listingsId: number[],
    limit?: number,
    page?: number
) => Promise<ResultGetListings>

export type GetListing = (id: string) => Promise<IListing>

export interface DBListing {
    getListings: GetListings
    getListing: GetListing
}

