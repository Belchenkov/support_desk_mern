const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res
        .status(200)
        .json({
        message: 'Welcome to the support desk API'
    });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port http://127.0.0.1:${PORT}`);
})