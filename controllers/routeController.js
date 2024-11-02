const Route = require('../models/Route');
const { catchAsync } = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createRoute = catchAsync(async (req, res) => {
    const route = await Route.create(req.body);
    res.status(201).json({
        status: 'success',
        data: route
    });
});

exports.getAllRoutes = catchAsync(async (req, res) => {
    const { page = 1, limit = 10, qayerdan, qayerga, sana, status } = req.query;
    const skip = (page - 1) * limit;

    const query = {};
    if (qayerdan) query.qayerdan = new RegExp(qayerdan, 'i');
    if (qayerga) query.qayerga = new RegExp(qayerga, 'i');
    if (sana) query.sana = sana;
    if (status) query.status = status;

    const [routes, total] = await Promise.all([
        Route.find(query)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 }),
        Route.countDocuments(query)
    ]);

    res.json({
        status: 'success',
        data: routes,
        meta: {
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            pages: Math.ceil(total / limit)
        }
    });
});

exports.getRoute = catchAsync(async (req, res) => {
    const route = await Route.findById(req.params.id);
    if (!route) throw new AppError('Route not found', 404);

    res.json({
        status: 'success',
        data: route
    });
});

exports.updateRoute = catchAsync(async (req, res) => {
    const route = await Route.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    
    if (!route) throw new AppError('Route not found', 404);

    res.json({
        status: 'success',
        data: route
    });
});

exports.deleteRoute = catchAsync(async (req, res) => {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) throw new AppError('Route not found', 404);

    res.json({
        status: 'success',
        message: 'Route deleted'
    });
});

exports.getRouteStats = catchAsync(async (req, res) => {
    const stats = await Route.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$sana" } },
                count: { $sum: 1 },
                routes: { $push: "$$ROOT" }
            }
        },
        { $sort: { _id: -1 } }
    ]);

    res.json({
        status: 'success',
        data: stats
    });
});