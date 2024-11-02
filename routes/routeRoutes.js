const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');
const { validateRoute } = require('../middleware/validationMiddleware');
const { rateLimiter } = require('../middleware/rateLimiter');

router.route('/')
    .post(validateRoute, routeController.createRoute)
    .get(rateLimiter, routeController.getAllRoutes);

router.route('/:id')
    .get(routeController.getRoute)
    .put(validateRoute, routeController.updateRoute)
    .delete(routeController.deleteRoute);

router.get('/stats/overview', routeController.getRouteStats);

module.exports = router;