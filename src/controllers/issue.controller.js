

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
                    error: 'Status must be one of: [OPEN, IN-PROGRESS, RESOLVED, CLOSED]'
                }
            )
        }

    } catch ( error ) {
        next(error);
    }
}