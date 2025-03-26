import { Router } from 'express'

const userRoutes = Router()

/**
 * @route GET /api/v1/user
 * @desc the route allows authorized users to fetch all users
 * @private
 */

userRoutes.get('/get-users', async (req, res, next) => {})

/**
 * @route GET /api/v1/user/:id
 * @desc the route allows authorized users to fetch a user with provided id
 * @private
 */

userRoutes.get('/get-user/:id', async (req, res, next) => {})

/**
 * @route PUT /api/v1/user/:id
 * @desc the route allows authorized users to update a user with provided id
 * @private
 */

userRoutes.put('/update-user/:id', async (req, res, next) => {})


/**
 * @route DELETE /api/v1/user/:id
 * @desc the route allows authorized users to delete a user with provided id
 * @private
 */

userRoutes.delete('/delete-user/:id', async (req, res, next) => {})

export default userRoutes