const AsyncErrors = require("../middleware/AsyncErrors");
const Errorhandler = require("../utils/errorhandler");
const Orders = require("../models/orderModel");
const Item = require("../models/itemModel");

//Create new Order
exports.createnewOrder = AsyncErrors(async (req, res, next) => {
    const { shippinginfo, Itemsorder, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Orders.create({ shippinginfo, Itemsorder, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paidAt: Date.now(), user: req.user._id });
    res.status(201).json({
        success: true,
        order
    })
})

//Get Single Order Details
exports.getSingleOrderDetails = AsyncErrors(async (req, res, next) => {
    const order = await Orders.findById(req.params.id).populate("user",
        "name email");
    if (!order) {
        return next(new Errorhandler("Order not Found with this Id", 404));
    }
    res.status(200).json({
        success: true,
        order
    })
})

//Get All Orders to Logged In User
exports.myOrders = AsyncErrors(async (req, res, next) => {
    const orders = await Orders.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders
    })
})

//Get All Orders 
exports.getAllOrders = AsyncErrors(async (req, res, next) => {
    const orders = await Orders.find();
    let TotalAmount = 0;
    orders.forEach(order => {
        TotalAmount += order.totalPrice;
    })
    res.status(200).json({
        success: true,
        TotalAmount,
        orders
    })
})

//Update Order Status by Admin
exports.updateOrder = AsyncErrors(async (req, res, next) => {
    const order = await Orders.findById(req.params.id);
    if(!order){
        return next(new Errorhandler("Order not Found with this Id",404));
    }
    
    if (order.orderStatus === "Delivered") {
        return next(new Errorhandler("You have Already delivered this Order", 404));
    }
    order.Itemsorder.forEach(async (ord) => {
        await updateStock(ord.product, ord.quantity);
    })
    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        order
    })
})

const updateStock = async (id, quantity) => {
    const item = await Item.findById(id.toString());
    if (item.stock < quantity) {
        return next(new Errorhandler("Ordered Quantity is not in Stock", 404));
    }
    item.stock -= quantity;
    console.log(item.stock);
    await item.save({ validateBeforeSave: false });
}

//Delete Order by Admin
exports.deleteOrder = AsyncErrors(async (req, res, next) => {
    const order = await Orders.findById(req.params.id);
    if (!order) {
        return next(new Errorhandler("Order not Found with this Id", 404));
    }
    await Orders.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        order
    })
})