const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  },
})

const upload = multer({ storage });

module.exports = app => {   
    const tutorials = require("../controllers/tutorial.controller.js");
  
    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", upload.single('image'), tutorials.create);
  
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", upload.single('image'), tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
  
    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);
  
    app.use('/api/tutorials', router);
  };