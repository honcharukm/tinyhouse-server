import { select } from './database.select'

export const count = async (
    tableName: string,
    where?: string
): Promise<number> => {
    const totalCount = await select(tableName, 'COUNT(*)', where)
    return totalCount[0]['COUNT(*)']
}