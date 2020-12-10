const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));

const CONNECTION_URL =
  "mongodb+srv://shivppatel:pasword123@cluster0.dinmg.mongodb.net/<dbname>?retryWrites=true&w=majority";


mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

  mongoose.set('useFindAndModify', false);

// API calls
app.get('/api', (req, res) => {
  res.send('Hello welcome to CrimeSurge\'s API')
})
app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});
app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "Client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "Client/build", "index.html"));
  });
  app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, "Client/build", "index.html"));
  });
}