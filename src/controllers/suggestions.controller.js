import { prisma } from '../config/prisma.client.js'
import { generateSuggestion } from '../config/gemini.config.js'

/**
 * Create Issue Controller for Express.js
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

/**
 * @route POST /api/v1/suggestions/create-suggestion
 * @desc allows users to create a suggestion
 * @private
 */

export const createSuggestion = async (req, res, next) => {
    try {
        const { issueId } = req.body;

        if ( !issueId ) {
            return res.status(400).json({
                success: false,
                error: 'Missing required field.'
            })
        }

        const findIssue = await prisma.issue.findUnique({
            where: {
                id: issueId,
            }
        })

        if ( !findIssue ) {
            return res.status(400).json({
                success: false,
                error: `Issue with id: ${issueId} does not exists`
            })
        }

        const issueDescription = findIssue.description

        if ( !issueDescription ) {
            return res.status(400).json({
                success: false,
                error: 'Issue description not found.'
            })
        }

        const suggestion = await generateSuggestion(issueDescription);

        const newIssue = await prisma.aISuggestion.create({
            data: {
                issueId: issueId,
                suggestion: suggestion
            }
        })

        if ( newIssue ) {
            res.status(200).json({
                success: true,
                message: 'Suggestion created successfully.',
                data: newIssue
            })
        }

    } catch ( error ) {
        next(error);
    }
}

/**
 * @route GET /api/v1/suggestions/get-suggestions
 * @desc allows users to fetch all the suggestions
 * @private
 */

export const getSuggestions = async (req, res, next) => {
    try {
        const suggestions = await prisma.aISuggestion.findMany()

        if ( !suggestions ) {
            return res.status(400).json({
                success: false,
                error: 'Suggestions not found.'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Suggestions found successfully.',
            data: suggestions
        })

    } catch ( error ) {
        next(error);
    }
}

/**
 * @route GET /api/v1/suggestions/get-suggestion/:id
 * @desc allows users to fetch a suggestion with specific id
 * @private
 */

export const getSuggestionById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if ( !id ) {
            return res.status(400).json({
                success: false,
                error: 'Id cannot be found or is empty.'
            })
        }
        
        const aIsuggestion = await prisma.aISuggestion.findUnique(
            {
                where: {
                    id: id
                }
            }
        )
        
        if ( !aIsuggestion ) {
            return res.status(400).json({
                success: false,
                error: `Suggestion with id: ${id} cannot be found.`
            })
        }
        
        res.status(200).json({
            success: true,
            message: 'Suggestion found successfully.',
            data: aIsuggestion
        })
    } catch ( error ) {
        next(error);
    }
}
