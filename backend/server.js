const express = require('express');
const dotenv = require('dotenv').config();

const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res
        .status(200)
        .json({
        message: 'Welcome to the support desk API'
    });
});

// Routes`
app.use('/api/users', require('./routes/userRoutes'));

// Middlewares
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port http://127.0.0.1:${PORT}`);
})