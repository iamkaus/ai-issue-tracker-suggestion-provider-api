import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Welcome to Ai issue tracker and suggestions provider API.')
})

app.listen(8080, () => {
    console.log(`AI issue tracker and suggestions provider API Listening on port: http://localhost:${8080}`)
});

export default app;