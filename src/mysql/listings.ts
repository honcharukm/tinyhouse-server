import { MysqlError } from 'mysql'
import { db } from './connect'
import { IListing } from './types'

export const listings = async(): Promise<IListing[]> => {
    const promise = new Promise<IListing[]>(
        (
            resolve: (listings: IListing[]) => void, 
            reject: (err: MysqlError) => void
        ) => {
        db.query('SELECT * FROM listings', (error: MysqlError, result: IListing[]) => {
            if (error) {
                reject(error)
            }

            resolve(result)
        })
    })

    const listings: IListing[] = await promise
    return listings
}

