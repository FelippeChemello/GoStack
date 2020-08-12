import express from 'express';

const port = process.env.PORT || 3333;

const app = express();

app.get('/', (request, response) => {
    return response.json({ message: 'Hello Felippe!' });
})

app.listen(port, () => {
    console.log('Server started on port ' + port);
})