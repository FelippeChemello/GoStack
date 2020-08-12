import express, { request } from 'express';

const port = process.env.PORT || 3333;

const app = express();

app.use(express.json())

app.post('/users', (request, response) => {
    const { name, email } = request.body

    const user = { name, email };

    return response.json(user);
})

app.listen(port, () => {
    console.log('Server started on port ' + port);
})