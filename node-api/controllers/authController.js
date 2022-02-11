const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validateAuth = catchAsync(async (req, res, next) => {
  // Check for token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('Resource not found', 404));
  }

  // Validate token
  const validate = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(validate.id);
  if (!user || !user.checkPasswordChange) {
    return next(new AppError('Invalid Token', 401));
  }

  req.user = user;
  next();
});

exports.requestForMe = (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(new AppError('Permission Denied', 401));
  }
  next();
};
