const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const uri = "mongodb+srv://task-admin:BtoqN6rLi8e7DWPt@task-manager.u5awn.mongodb.net/?retryWrites=true&w=majority&appName=Task-Manager";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(cors());
app.use(express.json());

// Database connection
async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

// Run database connection and start the server
run().catch(console.error);

app.get("/", (req, res) => {
  res.send("Welcome to Blood-Bank-API");
});
app.listen(port, () => {
  console.log("Server running on port", port);
});
