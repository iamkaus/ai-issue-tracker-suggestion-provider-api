import express from 'express';
import cors from 'cors';
import authRoutes from "./src/routes/auth.routes.js";
import issuesRoutes from "./src/routes/issues.routes.js";
import userRoutes from "./src/routes/user.route.js";
import {PORT} from "./src/config/env.config.js";
import suggestionsRouter from "./src/routes/suggestions.routes.js";
import { arcjetRateLimitingMiddleware } from "./src/middlewares/arcjet-rate-limiting.middleware.js";

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(arcjetRateLimitingMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to Ai issue tracker and suggestions provider API.')
})

// main routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/issues', issuesRoutes);
app.use('/api/v1/suggestions', suggestionsRouter)

app.listen(PORT, () => {
    console.log(`AI issue tracker and suggestions provider API Listening on port: http://localhost:${PORT}`)
});

export default app;