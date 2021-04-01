import dotenv from 'dotenv'
import express, { Application } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './graphql'
import database from './database'

dotenv.config()

const mount = async (app: Application) => {
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers, 
        context: () => ({ database })
    })
    server.applyMiddleware({ app, path: '/' })

    app.listen(process.env.SITE_PORT)
    console.log(`[app]:http://localhost:${process.env.SITE_PORT}`)
} 

mount(express())