import mongoose from 'mongoose'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js'

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { name, email, password } = req.body

    // Check if email already exists
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      await session.abortTransaction()
      session.endSession()
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const newUsers = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword
        }
      ],
      { session }
    )

    // Create JWT token
    const token = jwt.sign({ id: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    })

    // Commit transaction
    await session.commitTransaction()
    session.endSession()

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: newUsers[0]
      }
    })
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    console.error(error)
    next(error)
  }
}

export const signIn = async (req, res, next) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email }).select('+password')

    console.log(user)

    if (!user) {
      await session.abortTransaction()
      session.endSession()
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      await session.abortTransaction()
      session.endSession()
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    })

    // Commit transaction
    await session.commitTransaction()
    session.endSession()
    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        token,
        user
      }
    })
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    console.error(error)
    next(error)
  }
}
export const signOut = async (req, res, next) => {
  try {
    // Clear the JWT token from the client-side
    res.clearCookie('token')

    res.status(200).json({
      success: true,
      message: 'User signed out successfully'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
