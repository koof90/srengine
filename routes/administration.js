var logger = require('lib/logger')(module);
var HttpError = require('error').HttpError;
var config = require('../config');

exports.get = function(req,res,next){
    res.locals.startTimeValue = config.get('startTime');
    logger.info(res.locals.startTimeValue);
    res.locals.finishTimeValue = config.get('finishTime');
    res.render('administration');
}

exports.post = function(req,res,next){
    var selector = req.body.selector;
    logger.info("selector = " + selector);
    if (selector === "startTime"|| selector === "finishTime") {
        logger.info(req.body[selector]);
        var newDate = req.body[selector];
        logger.info(newDate);
        if (!newDate){
            //вывести ошибку
            console.log("неверно задана дата!");
            return res.sendHttpError(new HttpError(500, 'Неверно задана дата'));
        }
        else {
            config.set(selector, newDate);
            logger.info("set new " + selector + ": " + config.get(selector));
        }
    }
    res.redirect("administration");
}