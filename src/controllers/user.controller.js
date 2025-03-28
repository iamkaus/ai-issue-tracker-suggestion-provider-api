

/**
 * @route GET /api/v1/users/get-users
 * @desc lists all the user
 * @private
 */ import {prisma} from "../config/prisma.client.js";


export const getUsers = async ( req, res, next ) => {
    try {
        const users = await prisma.user.findMany({
            omit: {
                password: true
            }
        })

        if ( !users || users.length === 0 ) {
            return res.status(404).json({
                success: false,
                error: 'No users found',
            })
        }

        res.status(200).json({
            success: true,
            data: {
                users: users,
            }
        })
    } catch ( error ) {
        next(error);
    }
}

/**
 * @route GET /api/v1/users/:id
 * @desc the route allows authorized users to fetch a user with provided id
 * @private
 */

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if ( !id ) {
            return res.status(404).json({
                success: false,
                error: 'Id cannot be empty',
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
            omit: {
                password: true
            }
        })

        if ( !user ) {
            return res.status(404).json({
                success: false,
                error: `No user with UserId: ${id} found`,
            })
        }

        res.status(200).json({
            success: true,
            data: {
                user: user,
            }
        })
    } catch ( error ) {
        next(error);
    }
}

/**
 * @route PUT /api/v1/users/:id
 * @desc the route allows authorized users to update a user with provided id
 * @private
 */

export const updateUserById = async (req, res, next) => {
    try {
        const { email, password, name, role } = req.body
        const { id } = req.params;

        if ( !email && !password && !name && !role ) {
            return res.status(400).json({
                success: false,
                error: 'Missing required update fields. At least one field is needed for update.',
            })
        }
        const existingUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if ( !existingUser ) {
            return res.status(400).json({
                success: false,
                error: `User with UserId: ${id} not found`,
            })
        }

        let updateFields = {}
        if ( email ) updateFields.email = email
        if ( password ) updateFields.password = password
        if ( name ) updateFields.name = name
        if ( role ) updateFields.role = role

        const updatedUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: updateFields
        })

        if ( !updatedUser ) {
            return res.status(404).json({
                success: false,
                error: `User with UserId: ${ id } not found}`,
            })
        }

        res.status(200).json({
            success: true,
            data: {
                user: updatedUser,
            }
        })
    } catch ( error ) {
        next(error);
    }
}

/**
 * @route DELETE /api/v1/users/:id
 * @desc the route allows authorized users to delete a user with provided id
 * @private
 */

export const deleteUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if ( !id ) {
            return res.status(404).json({
                success: false,
                error: 'Id cannot be empty'
            })
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if ( !existingUser ) {
            return res.status(404).json({
                success: false,
                error: `User with UserId: ${id} not found`,
            })
        }

        const deletedUser = await prisma.user.delete({
            where: {
                id: id
            }
        })

        if ( !deletedUser ) {
            return res.status(404).json({
                success: false,
                error: `User with UserId: ${id} not found`,
            })
        }

        res.status(200).json({
            success: true,
            message: `User with UserId: ${id} deleted successfully.`,
        })
    } catch ( error ) {
        next(error);
    }
}