const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.MONGO_URI || "mongodb+srv://task-admin:BtoqN6rLi8e7DWPt@task-manager.u5awn.mongodb.net/?retryWrites=true&w=majority&appName=Task-Manager"; // Mongo URI

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Use express middleware
app.use(cors());
app.use(express.json());

// Connect to the database
let db;
async function connectDb() {
  try {
    await client.connect();
    db = client.db("task-manager"); // Use 'task-manager' database
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the app if the connection fails
  }
}

// Make sure to connect before starting the server
connectDb().then(() => {
  // Server is started only after a successful database connection
  app.listen(port, () => {
    console.log("Server running on port", port);
  });
});

// Example Route to Check API
app.get("/", (req, res) => {
  res.send("Welcome to Task Manager API");
});

// CRUD Endpoints for Tasks
// Create a new task
app.post("/users", async (req, res) => {
  const { displayName, email, photoURL } = req.body;
  try {
    const result = await db.collection("users").insertOne({
      displayName,
      email,
      photoURL
    });
    res.send(result);
  } catch (error) {
    console.error("Error creating user:", error);
  ;
  }
});