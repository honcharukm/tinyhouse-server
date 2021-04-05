import dotenv from 'dotenv'
import express, { Application } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './graphql'
import database from './database'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const mount = async (app: Application) => {
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))
    app.use(cookieParser(process.env.COOKIE_SECRET))

    const server = new ApolloServer({ 
        typeDefs, 
        resolvers, 
        context: ({ req, res }) => {
            return { database, req, res }
        }
    })
    server.applyMiddleware({ app, path: '/', cors: false })

    app.listen(process.env.SITE_PORT)
    console.log(`[app]:http://localhost:${process.env.SITE_PORT}`)
} 

mount(express())