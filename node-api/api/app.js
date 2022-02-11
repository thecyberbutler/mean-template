const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');

const globalError = require('../controllers/errorControllers');

const userRouter = require('../routes/userRoutes');

const app = express();
app.use(helmet());

app.use(morgan('dev'));
app.use(express.json());
app.use(mongoSanitize());

// eslint-disable-next-line new-cap
const apiv1 = express.Router();

app.use('/api/v1', apiv1);

apiv1.use('/users', userRouter);

app.use(globalError);

module.exports = app;
