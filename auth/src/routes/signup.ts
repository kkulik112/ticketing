import express, {Request, Response} from 'express'
import {body, validationResult} from 'express-validator'
import jwt from 'jsonwebtoken'

import { BadRequestError } from '../errors/BadRequestError'
import { RequestValidationError } from '../errors/request-validation-error'
import {User} from '../models/user'

const router = express.Router()

router.post('/api/users/signup', [
  body('email')
  .isEmail()
  .withMessage('Invalid email address'),
  body('password')
  .trim()
  .isLength({min: 4, max: 20})
  .withMessage('Password must be between 4 and 20 characters long')
],
async (req: Request, res: Response) => {
  const errors = validationResult(req)
  
  if(!errors.isEmpty()){
    throw new RequestValidationError(errors.array())
  }
  
  const {email, password} = req.body

  const existingUser = await User.findOne({email})

  if(existingUser) {
    throw new BadRequestError('Email in use')
  }

  const user = User.build({email, password})
  await user.save()

  // Generate JWT token
  const userJwt = jwt.sign({
    user: user.id,
    email: user.email
  },
    process.env.JWT_KEY!
   )

  // Store JWT token in a session
  req.session = {
    jwt: userJwt
  }

  res.status(201).send(user)
})

export {router as signupRouter}

