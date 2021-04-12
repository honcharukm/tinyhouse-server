import merge from 'lodash.merge'
import { ViewerResolvers } from './Viewer'
import { UserResolvers } from './User'
import { ListingResolvers } from './Listing'

export const resolvers = merge(
    ViewerResolvers, 
    UserResolvers,
    ListingResolvers
)