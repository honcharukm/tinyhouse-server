import { IBooking, IListing } from "../../../database/types"

export interface UserArgs {
    id: string
}

export interface UserBookingsArgs {
    limit: number
    page: number
}

export interface UserBookingsData {
    total: number
    result: IBooking[]
}

export interface UserListingsArgs {
    limit: number
    page: number
}

export interface UserListingsData {
    total: number
    result: IListing[]
}