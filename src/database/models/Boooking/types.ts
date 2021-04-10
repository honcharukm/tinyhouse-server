import { IBooking } from "../../types";

export interface ResultGetBooking {
    total: number
    result: IBooking[]
}

export type GetBookings = (
    bookingsId: number[], 
    limit?: number,
    page?: number
) => Promise<ResultGetBooking>

export interface DBBooking {
    getBookings: GetBookings
}