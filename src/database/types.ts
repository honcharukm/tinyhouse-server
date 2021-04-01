import { RowDataPacket, OkPacket } from 'mysql2'

type Collection<TData> = TData[] | RowDataPacket[]

export type GetListings = () => Promise<Collection<IListing>>
export type DeleteListing = (id: number) => Promise<OkPacket>

export interface IDatabase {
    listing: { 
        getListings: GetListings
        deleteListing: DeleteListing
    }
}

export enum ListingType {
    Apartment = 'APARTMENT',
    House = 'HOUSE'
}

export interface BookingsIndexMouth {
    [key: string]: boolean
}

export interface BookingsIndexYear {
    [key: string]: BookingsIndexMouth
}

export interface BookingsIndex {
    [key: string]: BookingsIndexYear
}

export interface IListing {
    id: number
    title: string
    description: string
    image: string
    host: number
    type: ListingType
    address: string
    country: string
    admin: string
    city: string
    bookings: number[]
    bookingsIndex: BookingsIndex
    price: number
    numOfGuests: number
}

export interface IUser {
    id: number
    token: string
    name: string
    avatar: string
    contact: string
    walletId?: string
    income: number
    bookings: number[]
    listings: number[]
}

export interface IBooking {
    id: number
    listing: number
    tenant: string
    chekIn: string
    checkOut: string
}