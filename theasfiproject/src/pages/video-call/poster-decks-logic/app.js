const express = require("express");
const pool = require("./routes/db.config");

const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL;
const dotenv = require("dotenv").config();


const app =  express();
const cookie = require("cookie-parser");
const PORT = process.env.PORT || 2020;
const server = require("http").Server(app)
const session = require("express-session"); 

const bodyParser = require("body-parser");
const { CreateTableForPosterDecks } = require("./routes/queries");
const MySQLStore = require('express-mysql-session')(session);


  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(express.json());


app.set("view engine", "ejs");
app.set("views", ["./views"]);

app.use("/css", express.static(__dirname + "/public/css", { type: 'text/css' }))
app.use("/js", express.static(__dirname + "/public/js", { type: 'text/javascript' }))


CreateTableForPosterDecks();

app.use("/", require("./routes/pages"));
// server.listen(PORT);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// client.end();  // Close the client when you're done with your queries
