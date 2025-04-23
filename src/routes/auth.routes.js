import { Router } from 'express'
import {signIn, signOut, signUp} from "../controllers/auth.controller.js";

const authRoutes = Router()

/**
 *
 * @route POST /api/v1/auth
 * @desc allows a user to create an account [ create a new user ]
 * @public
 */

authRoutes.post('/sign-up', signUp)

/**
 * @route POST /api/v1/auth
 * @desc allows a user to sing-in to their account [log-in]
 * @public
 */

authRoutes.post('/sign-in', signIn)

/**
 * @route POST /api/v1/auth
 * @desc allows a user to sign out of their account [log-out]
 * @public
 */

/**
 *
 * @todo the sign-out method is yet to be implemented, the route is not up for use at the moment
 *
 */


authRoutes.post('/sign-out', signOut)

export default authRoutes
