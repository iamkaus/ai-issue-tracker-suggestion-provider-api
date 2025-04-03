import { Router } from "express";
import {userAuthenticationMiddleware} from "../middlewares/user.middleware.js";
import {adminMiddleware} from "../middlewares/admin.middleware.js";
import {createSuggestion, getSuggestionById, getSuggestions} from "../controllers/suggestions.controller.js";
const suggestionsRouter = Router();

/**
 * @route POST /api/v1/suggestions/create-suggestion
 * @desc allows users to create a suggestion
 * @private
 */

suggestionsRouter.post('/create-suggestion', userAuthenticationMiddleware, createSuggestion);

/**
 * @route GET /api/v1/suggestions/get-suggestions
 * @desc allows users to fetch all the suggestions
 * @private
 */

suggestionsRouter.get('/get-suggestions', adminMiddleware, getSuggestions);

/**
 * @route GET /api/v1/suggestions/get-suggestions/:id
 * @desc allows users to fetch a suggestion with specific suggestion id
 * @private
 */

suggestionsRouter.get('/get-suggestion/:id', userAuthenticationMiddleware, getSuggestionById)

export default suggestionsRouter;
