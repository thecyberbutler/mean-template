const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/signup').post(userController.signup);
router.route('/login').post(userController.login);

router.use(authController.validateAuth);

router
  .route('/:id')
  .get(authController.requestForMe, userController.getUser)
  .patch(authController.requestForMe, userController.updateUser)
  .delete(authController.requestForMe, userController.deleteUser);

module.exports = router;
