import express from 'express'
import { PORT } from './config/env.js'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import { connectDB } from './database/mongodb.js'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middleware/error.middleware.js'
import arcjetMiddleware from './middleware/arcjet.middleware.js'
import subscriptionRouter from './routes/subscription.routes.js'
import workflowRouter from './routes/workflow.route.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(arcjetMiddleware)

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);


app.use(errorMiddleware)

app.get('/', (req, res) => {
  res.send('Welcome to the SubSnap API')
})

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  await connectDB()
})

export default app
