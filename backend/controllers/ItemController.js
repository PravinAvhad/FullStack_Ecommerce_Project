const Item = require("../models/itemModel");
const Errorhandler = require("../utils/errorhandler");
const AsyncErrors = require("../middleware/AsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

//Create Item -- Admin
exports.createItem = AsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id
    const item = await Item.create(req.body);

    res.status(201).json({
        success: true,
        item
    })
})


//Update Item -- Admin
exports.updateItem = AsyncErrors(async (req, res, next) => {
    let item = await Item.findById(req.params.id);
    if (!item) {
        return next(new Errorhandler("Item not Found", 404));
    }
    item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: CSSFontFeatureValuesRule });
    res.status(200).json({
        success: true,
        item
    })
});

//Delete Item --Admin
exports.deleteItem = AsyncErrors(async (req, res, next) => {
    let item = await Item.findById(req.params.id);
    if (!item) {
        return next(new Errorhandler("Item not Found", 404));
    }
    await Item.findByIdAndDelete(req.params.id)
        .then(() =>
            res.status(200).json({
                success: true,
                message: "Item Deleted SuccessFully"
            })
        );

});

//Get All Items -- All Users
exports.getAllItems = AsyncErrors(async (req, res, next) => {
    const resultPerPage = 8;
    const itemsCount = await Item.countDocuments();
    const apiFeature = new ApiFeatures(Item.find(), req.query)
        .search()
        .filter();
    let items = await apiFeature.query.clone();
    let itemsFilteredCnt = items.length;
    apiFeature.pagination(resultPerPage);
    items = await apiFeature.query;
    res.status(200).json({
        success: true,
        items,
        itemsCount,
        itemsFilteredCnt,
        resultPerPage
    });
})

//Get Single Item Detail
exports.getItemDetail = AsyncErrors(async (req, res, next) => {
    let item = await Item.findById(req.params.id);
    if (!item) {
        return next(new Errorhandler("Item not Found", 404));
    }
    res.status(200).json({
        success: true,
        item
    })
})

//Create new Review or Update the review
exports.itemReview = AsyncErrors(async (req, res, next) => {
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
    }
    const item = await Item.findById(req.body.itemId);
    const isReviewed = item.reviews.find(rev => rev.user.toString() === req.user._id.toString());
    if (isReviewed) {
        item.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) 
                rev.rating = req.body.rating,
                rev.comment = req.body.comment
        })
    }
    else {
        item.reviews.push(review);
        item.numOfReviews = item.reviews.length;
    }
    let avg = 0;
    item.reviews.forEach((rev) => {
        avg += rev.rating;
    });
    avg = avg / item.reviews.length;
    item.ratings = avg;

    await item.save({validateBeforeSave:false});

    res.status(200).json({
        success:true
    })
})

//Get All Reviews of Single Item
exports.getItemsReviews = AsyncErrors(async(req,res,next)=>{
    const item = await Item.findById(req.query.itemid);
    if(!item){
        return next(new Errorhandler("Item not Found", 404));
    }
    res.status(200).json({
        success:true,
        Reviews:item.reviews
    })
})

//Delete Review of Single Item
exports.deleteItemReview = AsyncErrors(async(req,res,next)=>{
    const item = await Item.findById(req.query.itemId);
    if(!item){
        return next(new Errorhandler("Item not Found", 404));
    }
    const reviews = item.reviews.filter(rev => rev._id.toString() !== req.query.reviewId.toString());
    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    });
    const ratings = avg / reviews.length;
    const numOfReviews = reviews.length;
    await Item.findByIdAndUpdate(req.query.itemId,
        {reviews,ratings,numOfReviews},
        {new:true,runValidators:true,runValidators:true});

    res.status(200).json({
        success:true
    })
})