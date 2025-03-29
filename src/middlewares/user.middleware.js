import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.config.js';
import { prisma } from '../config/prisma.client.js'

/**
 * @desc Authorization middleware to restrict access to private routes.
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Express next function.
 */

export const userAuthenticationMiddleware = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized: No token provided'
            });
        }
        const decodedToken = jwt.verify(token, JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: {
                id: decodedToken.userId
            }
        })

        if ( !user ) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized: No user found with that token.'
            })
        }

        req.user = user;
        next();
    } catch ( error ) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized: Invalid token' + error
        });
    }
}