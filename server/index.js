const http = require("http");
const express = require("express");

require("./config/mongo.js");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3000";
app.set("port", port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

// routes
require("./routes/book.js")(app);

// test
app.get("/", async (req, res) => {
  res.send("success");
});

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
  });
});

/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});
