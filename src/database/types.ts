import { RowDataPacket} from 'mysql2'
import { DBBooking } from './models/Boooking/types'
import { DBListing } from './models/Listing/types'
import { DBUser } from './models/User/types'

export interface IDatabase {
    listing: DBListing,
    user: DBUser
    booking: DBBooking
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

export interface IListing extends RowDataPacket {
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

export interface IUser extends RowDataPacket {
    id?: number
    userId: string
    token: string
    name: string
    avatar: string
    contact: string
    walletId?: string
    income: number
    bookings: string
    listings: string
    authorized?: boolean
}

export interface IBooking extends RowDataPacket {
    id: number
    listing: number
    tenant: string
    chekIn: string
    checkOut: string
}