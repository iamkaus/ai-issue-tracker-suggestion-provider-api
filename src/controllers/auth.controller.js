import { prisma } from '../config/prisma.client.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.config.js'

/**
 * @route POST /api/v1/auth/sign-up
 * @desc signs up a user and creates a new user
 * @public
 */

export const signUp = async (req, res, next) => {
    try {
        const { email, password, name, role } = req.body

        if (!email || !password || !name || !role) {
            return res.status(400).json({
                success: false,
                error: 'Username or email or password is missing'
            })
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: 'User already exists'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: name,
                role: role.toUpperCase(),
            }
        })

        const token = jwt.sign({
            userId: newUser.id
        }, JWT_SECRET, {
            expiresIn: '1d',
        })

        res.status(201).json({
            success: true,
            message: 'User successfully signed up',
            data: {
                token,
                user: newUser,
            }
        })
    } catch (error) {
        console.error("Sign-Up error:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
        next(error);
    }
}

/**
 * @route POST /api/v1/auth/sign-in
 * @desc signs in a user
 * @public
 */

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password ) {
            return res.status(400).json({
                success: false,
                error: 'Email or Password is missing for signIn'
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if ( !user ) {
            return res.status(400).json({
                success: false,
                error: 'User not found.'
            })
        }

        const isValidPassword = await bcrypt.compare( password, user.password)

        if ( !isValidPassword ) {
            return res.status(400).json({
                success: false,
                error: 'Invalid password'
            })
        }

        const token  = jwt.sign({
            userId: user.id
        }, JWT_SECRET, {
            expiresIn: '1d',
        })

        if ( !token ) {
            return res.status(400).json({
                success: false,
                error: 'Error generating authorization token'
            })
        }

        res.status(200).json({
            success: true,
            message: 'User successfully logged in',
            data: {
                token: token,
                user: user
            }
        })
    } catch (error) {
        next(error)
    }
}

/**
 * @route POST /api/v1/auth/sign-out
 * @desc signs out a user
 * @public
 */

export const signOut = async (req, res, next) => {
    // TBI
}