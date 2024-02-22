const express = require("express");
const router = express.Router();

const waldo = require("../controllers/controller")

//routes recuest for creating  a post
router.post("/createScore", waldo.create_score_post);

router.get("/", waldo.score_list);


//route for creating  a coordeanate

router.post("/createCoordenate", waldo.create_coordenates_post);

//route for getting  a coordeanate
router.get("/character/:id", waldo.coordenates_detail)




module.exports = router;
