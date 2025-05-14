import { Router } from 'express'
import { signUp, signIn, signOut } from '../controllers/auth.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

const authRouter = Router()

authRouter.post('/sign-up', signUp)

authRouter.post('/sign-in', signIn)

authRouter.post('/sign-out', authMiddleware, signOut)

export default authRouter
