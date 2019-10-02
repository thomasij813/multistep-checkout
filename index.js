const express = require('express');

const app = express();

app.use('/', express.static('client'));

app.get('/test', (req, res, next) => {
    res.send('hello world');
});

const port = 3000;

app.listen(port, () => console.log(`Server listening on port: ${port}`));