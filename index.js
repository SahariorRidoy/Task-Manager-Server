const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://task-admin:BtoqN6rLi8e7DWPt@task-manager.u5awn.mongodb.net/?retryWrites=true&w=majority&appName=Task-Manager"; // Mongo URI

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
    const result = await db.collection("users").insertOne({
      displayName,
      email,
      photoURL,
    });
    res.send(result);
});

// Check if user already exists
app.get("/users/:email", async (req, res) => {
  const { email } = req.params;
    const user = await db.collection("users").findOne({ email });
    res.send(user);
  
});


// Post a new task
app.post("/tasks", async (req, res) => {
  const { title, description, timestamp,category } = req.body;
    const result = await db.collection("tasks").insertOne({
      title,
      description,
      timestamp,
      category
    });
    res.send(result);
});

// Get all tasks
app.get("/tasks", async (req, res) => {
    const tasks = await db.collection("tasks").find().toArray();
    res.send(tasks);
});


// Delete a task
app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const result = await db.collection("tasks").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      res.send(result);
    } 

});


// Update a task
app.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, category } = req.body;
    const result = await db.collection("tasks").updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, description, category } }
    );
    res.json({ message: "Task updated successfully", result });
});

