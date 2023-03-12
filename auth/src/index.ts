import express from 'express'

import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

const port = 3000

const app = express()

app.use(express.json())
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.get('*', () => {throw new NotFoundError()})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
