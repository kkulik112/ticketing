import cookieSession from 'cookie-session'
import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'

import { currentUserRouter } from './routes/current-user'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

const port = 3000

const app = express()
app.set('trust proxy', true) // Allows connection through an ingress proxy
app.use(express.json())
app.use(cookieSession({
  signed: false, // Disables encryption
  secure: true // Requires HTTPS connection
}))
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', async () => {throw new NotFoundError()})

app.use(errorHandler)

const start = async () => {
  try{
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('Connected to MongoDB')
  } catch(error) {
    console.error(error)
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

start()
