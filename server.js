const express = require("express");
const axios = require("axios");
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather",async (req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
  const apiKey = "44f59ba9d16844335d1138bf5727a16f";

  // Add your logic here to fetch weather data from the API
  const Apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  let weather = null;
  let error = null;
try {
  const response = await axios.get(Apiurl);
  weather = response.data;
} catch (err) {
  console.error(err);
  error = "Error, please try again";
}

res.render("index", { weather, error });
});


// Start the server and listen on port 3000 or the value of the PORT environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
