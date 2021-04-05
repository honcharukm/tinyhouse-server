import { RowDataPacket, OkPacket } from 'mysql2'

type Collection<TData> = TData[] | RowDataPacket[]

export type GetListings = () => Promise<Collection<IListing>>
export type DeleteListing = (id: number) => Promise<OkPacket>

export type GetUser = (id: string) => Promise<IUser | RowDataPacket>
export type UpdateUser = <TField = {}>(id: string, fields: TField) => Promise<IUser | RowDataPacket | undefined>
export type CreateUser = (fields: IUser) => Promise<IUser | RowDataPacket>
export type GetUserById = (id: number) => Promise<IUser | RowDataPacket>
export type GetUserByToken = (userId: string, token: string | undefined) => Promise<IUser | RowDataPacket>

export interface IDatabase {
    listing: { 
        getListings: GetListings
        deleteListing: DeleteListing
    },
    user: {
        getUser: GetUser
        updateUser: UpdateUser
        createUser: CreateUser,
        getUserByToken: GetUserByToken
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
}

export interface IBooking {
    id: number
    listing: number
    tenant: string
    chekIn: string
    checkOut: string
}