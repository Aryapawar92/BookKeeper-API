import express from 'express'
import bookRoute from './Routes/books.routes.js'
import userRoutes from './Routes/user.routes.js'
import adminRoutes from './Routes/admin.routes.js'
import cookieParser from 'cookie-parser'

const app = express()


app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true , limit:"16kb"}))

app.use(cookieParser())


app.use('/api/v1/books',bookRoute)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/admin',adminRoutes)

export {app}