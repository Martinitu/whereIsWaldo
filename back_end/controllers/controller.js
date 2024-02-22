const Score = require("../models/highscore");
const Coordenates = require("../models/coordenadas");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


// create a score
exports.create_score_post = [
    // Validate and sanitize fields.
    body("name", "name must not be empty.")
    .trim()
    .isLength({ min: 2 })
    .escape(),
    body("time", "time must not be empty.")
    .trim()
    .escape(),


    // Process request after validation and sanitization.
asyncHandler( async (req, res, next) => {
   const errors = validationResult(req);
   
   if (!errors.isEmpty()) {
         console.log(req.body) ;
         // Store the errors in the flash messages
         errors.array().forEach((error) => {
           req.flash('error', error.msg);
         });
        console.log(req.body)
         console.log(errors)
         res.send(errors)
       };
       try {
           const score = new Score({
             
             name: req.body.name,
            time: req.body.time,
           
           });
           const result = await score.save();
           res.send(score)
    
         } catch(err) {
           return next(err);
         };
 
})

];



// Get list of all scores.
exports.score_list = asyncHandler(async (req, res, next) => {
  const allScores = await Score.find({}, "name time ")
    .sort({ time: 1 })
    .populate("name")
    .populate("time")
    

    .exec();

  res.send(allScores);
});


//create coordenates post request
exports.create_coordenates_post = [
    // Validate and sanitize fields.
    body("name", "name must not be empty.")
    .trim()
    .escape(),
    body("x", "x must not be empty.")
    .trim()
    .escape(),
    body("y", "y must not be empty.")
    .trim()
    .escape(),


    // Process request after validation and sanitization.
asyncHandler( async (req, res, next) => {
   const errors = validationResult(req);
   
   if (!errors.isEmpty()) {

         // Store the errors in the flash messages
         errors.array().forEach((error) => {
           req.flash('error', error.msg);
         });
        console.log(req.body)
         console.log(errors)
         res.send(errors)
       };
       try {
           const coordenates = new Coordenates({
             
             name: req.body.name,
             x: req.body.x,
             y: req.body.y,
           });
           const result = await coordenates.save();
           res.send(coordenates)
    
         } catch(err) {
           return next(err);
         };
 
})

];
 
//Get specifics coordenates of a character

exports.coordenates_detail = asyncHandler(async (req, res, next) => {
  // Get details of charactes
  const coordenates  = await Promise.all([
    Coordenates.findById(req.params.id).populate("name").populate("x").populate("y").exec(),
    
  ]);

  if (!coordenates) {
    // No results.
    const err = new Error("Coordinates not found");
    err.status = 404;
    return next(err);
  }
  

  res.send(coordenates);
});
