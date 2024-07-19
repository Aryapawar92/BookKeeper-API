import express from 'express'
import bookRoute from './Routes/books.routes.js'

const app = express()


app.use(express.json({limit:"16kb"}))


app.use('/api/v1/books',bookRoute)

export {app}