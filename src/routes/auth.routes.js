import { Router } from 'express'

const authRoutes = Router()

/**
 *
 * @route POST /api/v1/auth
 * @desc allows a user to create an account [ create a new user ]
 * @public
 */

authRoutes.post('/sign-up', async (req, res, next) => {})

/**
 * @route POST /api/v1/auth
 * @desc allows a user to sing-in to their account [log-in]
 * @public
 */

authRoutes.post('/sign-in', async (req, res, next) => {})

/**
 * @route POST /api/v1/auth
 * @desc allows a user to sign out of their account [log-out]
 * @public
 */


authRoutes.post('/sign-out', async (req, res, next) => {})

export default authRoutes
