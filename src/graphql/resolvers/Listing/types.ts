import { IBooking } from '../../../database/types'

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