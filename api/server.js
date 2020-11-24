const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the GIMM DB." });
});

require("./routes/Characters.routes")(app);
require("./routes/UserCharacters.routes")(app);
require("./routes/Weapons.routes")(app);
require("./routes/UserWeapons.routes")(app);
require("./routes/Items.routes")(app);
require("./routes/UserItems.routes")(app);
require("./routes/Auth.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
