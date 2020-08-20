import express from 'express';

import routes from './routes';
import './database';

const port = process.env.PORT || 3333;

const app = express();

app.use(express.json());

app.use(routes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
