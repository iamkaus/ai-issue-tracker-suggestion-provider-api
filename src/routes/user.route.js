import { Router } from 'express'
import { deleteUserById, getUserById, getUsers, updateUserById } from "../controllers/user.controller.js";
import {userAuthenticationMiddleware} from "../middlewares/user.middleware.js";
import {adminMiddleware} from "../middlewares/admin.middleware.js";

const userRoutes = Router()

/**
 * @route GET /api/v1/users/get-users
 * @desc the route allows authorized users to fetch all users
 * @private
 */

userRoutes.get('/get-users', adminMiddleware, getUsers)

/**
 * @route GET /api/v1/users/get-user/:id
 * @desc the route allows authorized users to fetch a user with provided id
 * @private
 */

userRoutes.get('/get-user/:id', userAuthenticationMiddleware, getUserById)

/**
 * @route PUT /api/v1/users/update-user/:id
 * @desc the route allows authorized users to update a user with provided id
 * @private
 */

userRoutes.put('/update-user/:id', userAuthenticationMiddleware, updateUserById)


/**
 * @route DELETE /api/v1/users/delete-user/:id
 * @desc the route allows authorized users to delete a user with provided id
 * @private
 */

userRoutes.delete('/delete-user/:id', userAuthenticationMiddleware, deleteUserById)

export default userRoutes