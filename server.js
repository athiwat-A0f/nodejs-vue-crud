const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./app/models");

var corsOptions = {
    origin: "http://localhost:5173"
};

// process.env.TZ = "Asia/Bangkok";
// console.log(new Date().toString());

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// // for parsing multipart/form-data
// app.use(upload.array()); 
app.use(express.static('public'))

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});


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