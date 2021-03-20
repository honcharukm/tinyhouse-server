import { listings } from './listings'
import { IDataBase } from './types'

export const database: IDataBase = {
    listings: listings()
}