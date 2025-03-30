import { Router } from 'express'
import {userAuthenticationMiddleware} from "../middlewares/user.middleware.js";
import {createIssue, getIssueById, getUserIssuesById, updateIssueById} from "../controllers/issue.controller.js";

const issuesRoutes = Router()

/**
 * @route POST /api/v1/issues/create-issue
 * @desc allows user to create an issue
 * @private
 */

issuesRoutes.post('/create-issue', userAuthenticationMiddleware , createIssue   )

/**
 * @route GET /api/v1/issues/get-issue/:id
 * @desc fetch id specific issue
 * @private
 */

issuesRoutes.get('/get-issue/:id', userAuthenticationMiddleware , getIssueById)

/**
 * @route GET /api/v1/issues/get-user-issues/:id
 * @desc get issues created by a user with specific id
 * @private
 */

issuesRoutes.get('/get-user-issues/:creatorId', userAuthenticationMiddleware , getUserIssuesById)

/**
 * @route PUT /api/v1/issues/update-issue/:id
 * @desc updates an issue with specific id
 * @private
 */

issuesRoutes.put('/update-issue/:id', userAuthenticationMiddleware , updateIssueById)

/**
 * @route DELETE /api/v1/issues/delete-issue/:id
 * @desc delete an issue with specific id
 * @private
 */

issuesRoutes.delete('/delete-issue/:id', userAuthenticationMiddleware , async (req, res, next) => {})

export default issuesRoutes 