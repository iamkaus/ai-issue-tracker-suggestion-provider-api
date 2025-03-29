import { prisma } from '../config/prisma.client.js'

/**
 * Create Issue Controller for Express.js
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

/**
 * @route POST /api/v1/issues/create-issue
 * @desc allows user to create an issue
 * @private
 */

export const createIssue = async (req, res, next) => {
    try {

        const { title, description, status, priority, assigneeId } = req.body;

        if( !title || title.length === 0 ) {
            return res.status(400).json(
                {
                    error: 'Title must be at least 3 characters long'
                }
            );
        }

        if ( !description || description.length === 0 ) {
            return res.status(400).json(
                {
                    error: 'Description must be at least 3 characters long'
                }
            )
        }

        const issueStatus = ['OPEN', 'IN-PROGRESS', 'RESOLVED', 'CLOSED'];
        if ( status && !issueStatus.includes(status.toUpperCase()) ) {
            return res.status(400).json(
                {
                    success: false,
                    error: 'Status must be one of: [OPEN, IN-PROGRESS, RESOLVED, CLOSED]'
                }
            )
        }

        const validPriorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
        if ( priority && !validPriorities.includes(priority.toUpperCase()) ) {
            return res.status(400).json(
                {
                    success: false,
                    error: 'Priority must be one of: [LOW, MEDIUM, HIGH, CRITICAL]'
                }
            )
        }

        if ( assigneeId ) {
            const assignee = await prisma.user.findUnique({
                where: {
                    id: assigneeId
                }
            })

            if ( !assignee ) {
                return res.status(400).json(
                    {
                        success: false,
                        error: `Assignee with id: ${assigneeId} not found`
                    }
                )
            }
        }

        const creatorId = req.user.id

        if ( !creatorId ) {
            return res.status(400).json(
                {
                    success: false,
                    error: 'Creator id not found'
                }
            )
        }

        const newIssue = await prisma.issue.create({
            data: {
                title: title,
                description: description,
                creatorId: creatorId,
                ...(status && { status: status.toUpperCase() }),
                ...(priority && { priority: priority.toUpperCase() }),
                ...(assigneeId && { assigneeId: assigneeId }),
            }
        })

        if ( !newIssue ) {
            return res.status(400).json(
                {
                    success: false,
                    error: 'Failed to create issue'
                }
            )
        }

        return res.status(201).json(
            {
                success: true,
                message: 'Issue created successfully',
                data: newIssue
            }
        )

    } catch ( error ) {
        next(error);
    }
}