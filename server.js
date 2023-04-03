const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const multer = require('multer');
// const upload = multer({ dest: 'uploads' });

const app = express();

const db = require("./app/models");

var corsOptions = {
    origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// // for parsing multipart/form-data
// app.use(upload.array()); 
// app.use(express.static('public'));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

// var type = upload.single('upload');
// console.log({ type })

// app.use((error, req, res, next) => {
//     console.log('This is the rejected field ->', req);
// });


db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });


require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});