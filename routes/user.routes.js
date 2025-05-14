import { Router } from 'express'

import authMiddleware from '../middleware/auth.middleware.js'
import { getUsers, getUser } from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', authMiddleware, getUser)

export default userRouter
