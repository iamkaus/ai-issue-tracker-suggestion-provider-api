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

        const issueStatus = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
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

/**
 * @route GET /api/v1/issues/get-issue/:id
 * @desc fetch id specific issue
 * @private
 */

export const getIssueById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if ( !id ) {
            return res.status(400).json(
                {
                    success: false,
                    error: 'Issue Id cannot be empty. Please provide an issue Id and try again later.'
                }
            )
        }

        const issue = await prisma.issue.findUnique({
            where: {
                id: id
            }
        })

        if ( !issue ) {
            return res.status(400).json(
                {
                    success: false,
                    error: `Issue with id: ${id} not found`
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: `Issue with id: ${id} found.`,
                data: issue
            }
        )
    } catch (error) {
        next(error);
    }
}

/**
 * @route GET /api/v1/issues/get-user-issues/:creatorId
 * @desc get issues created by a user with specific id
 * @private
 */

export const getUserIssuesById = async (req, res, next) => {
    try {
        const { creatorId } = req.params;

        if ( !creatorId ) {
            return res.status(400).json(
                {
                    success: false,
                    error: 'Creator id not found'
                }
            )
        }

        const userIssue = await prisma.issue.findMany({
            where: {
                creatorId: creatorId
            }
        })

        if ( !userIssue || userIssue.length === 0 ) {
            return res.status(400).json(
                {
                    success: false,
                    error: `Failed to get user issue with creatorId: ${creatorId}.`
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                message: `User issue with creatorId: ${creatorId} found.`,
                data: userIssue
            }
        )
    } catch ( error ) {
        next(error);
    }
}

/**
 * @route PUT /api/v1/issues/update-issue/:id
 * @desc updates an issue with specific id
 * @private
 */

export const updateIssueById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if ( !id ) {
            return res.status(400).json(
                {
                    success: false,
                    error: 'Issue id not found'
                }
            )
        }

        const existingIssue = await prisma.issue.findUnique(
            {
                where: {
                    id: id
                }
            }
        )

        if ( !existingIssue ) {
            return res.status(400).json(
                {
                    success: false,
                    error: `Issue with id: ${id} not found`
                }
            )
        }

        const creatorId = existingIssue.creatorId
        const currentUserId = req.user.id

        if ( creatorId !== currentUserId ) {
            return res.status(400).json(
                {
                    success: false,
                    error: `Current user cannot update issue with creatorId: ${creatorId}.`
                }
            )
        }

        const { status, priority, assigneeId } = req.body;
        const updateIssueStatus = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
        if ( status && !updateIssueStatus.includes(status.toUpperCase()) ) {
            return res.status(400).json(
                {
                    success: false,
                    error: 'Status must be one of: [OPEN, IN-PROGRESS, RESOLVED, CLOSED]'
                }
            )
        }

        const updateValidPriorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
        if ( priority && !updateValidPriorities.includes(priority.toUpperCase()) ) {
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

        let updateFields = {}

        if ( status ) updateFields.status = status.toUpperCase();
        if ( priority ) updateFields.priority = priority.toUpperCase();
        if ( assigneeId ) updateFields.assigneeId = assigneeId;

        if ( !updateFields || updateFields.length === 0 ) {
            return res.status(400).json(
                {
                    success: false,
                    error: 'Update fields cannot be empty. Please provide at least one update field [status, priority, assigneeId].'
                }
            )
        }

        const updatedIssue = await prisma.issue.update({
            where: {
                id: id
            },
            data: updateFields
        })

        if ( !updatedIssue ) {
            return res.status(400).json(
                {
                    success: false,
                    error: `Issue with id: ${id} failed to update. Either the issue with Id: ${id} does not exists or the issue Id is not valid.`
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                message: `Issue with id: ${id} was updated successfully.`,
                data: updatedIssue
            }
        )
    } catch ( error ) {
        next(error);
    }
}

/**
 * @route DELETE /api/v1/issues/delete-issue/:id
 * @desc delete an issue with specific id
 * @private
 */

export const deleteIssueById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if ( !id ) {
            return res.status(400).json(
                {
                    success: false,
                    error: 'Issue id cannot be empty.'
                }
            )
        }

        const issueFound = await prisma.issue.findUnique({
            where: {
                id: id
            }
        })

        if ( !issueFound ) {
            return res.status(400).json({
                success: false,
                error: `Issue with id: ${id} not found`
            })
        }

        if ( issueFound.creatorId !== req.user.id ) {
            return res.status(400).json({
                success: false,
                error: `Current user with id: ${req.user.id} cannot delete issue with creatorId: ${issueFound.creatorId}`
            })
        }

        const deletedIssue = await prisma.issue.delete({
            where: {
                id: id
            }
        })

        if ( !deletedIssue ) {
            return res.status(400).json(
                {
                    success: false,
                    error: `Issue with id: ${id} not found.`
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                message: `Issue with id: ${id} was deleted successfully.`,
            }
        )
    } catch ( error ) {
        next(error);
    }
}
