const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// CORS middleware
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Middleware to set Permissions-Policy header (at the top)
app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()"
  );
  //console.log("Permissions-Policy Header Set:", res.get("Permissions-Policy")); // Log the header
  next();
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB before defining routes
const URI = process.env.MONGODB_URL;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB ✅");
    startServer(); // Start the server only after DB connection
  })
  .catch((err) => {
    console.error("MongoDB Connection Error ❌:", err);
    process.exit(1); // Exit if DB connection fails
  });

// Function to start server after DB is connected
function startServer() {
  app.use("/user", require("./routes/userRouter.js"));
  app.use("/api", require("./routes/categoryRouter.js"));
  app.use("/api/upload", require("./routes/upload.js")); // ✅ Fixed Route
  app.use("/api", require("./routes/productRouter.js"));

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Base route
app.get("/", (req, res) => {
  res.send("Hello World");
});
