const express = require('express');
const controller = require('./controller');

const router = express.Router();
router.route('/').get(controller.getAll).post(controller.createUser);
router.param('id', controller.getId);
router
  .route('/:id')
  .put(controller.updateUser)
  .patch(controller.updateUser)
  .delete(controller.deleteUser);

module.exports = router;
