import { IBooking, IListing } from '../../../database/types'

export enum ListingsFilters {
    PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW',
    PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH'
}

export interface ListingArgs {
    id: string
}

export interface ListingBookingsArgs {
    limit: number
    page: number
}

export interface ListingBookingsData {
    total: number,
    result: IBooking[]
}

export interface ListingsArgs {
    filter: ListingsFilters
    limit: number
    page: number
}

export interface ListingsData {
    total: number
    result: IListing[]
}