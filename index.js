const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middle ware
app.use(cors());
app.use(express.json());

// get api
app.get("/", (req, res) => {
  res.send("get api is working");
});

// mongo db
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.vhnnfcc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const productCollections = client
      .db("User_main")
      .collection("ProductsDetails");
    const commentCollection = client.db("User_main").collection("userComment");
    // get all products api
    app.get("/products", async (req, res) => {
      const query = {};
      const sort = { time: -1 };
      const curser = productCollections.find(query).sort(sort);
      const result = await curser.toArray();
      res.send(result);
    });
    // product get api limit
    app.get("/products/limit", async (req, res) => {
      const query = {};
      const limit = 3;
      const sort = { time: -1 };
      const courser = productCollections.find(query).sort(sort).limit(limit);
      const result = await courser.toArray();
      res.send(result);
    });
    // get single product
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const user = await productCollections.findOne(query);
      res.send(user);
    });
    //post user comment
    app.post("/comment", async (req, res) => {
      const commentData = await req.body;
      console.log(commentData);
      const result = await productCollections.insertOne(commentData);
      res.send(result);
    });
    // get user comments my product id
    app.get("/comment/:id", async (req, res) => {
      const productID = req.params.id;
      const query = { productID: productID };
      const sort = { time: -1 };
      const curser = commentCollection.find(query).sort(sort);
      const result = await curser.toArray();
      res.send(result);
    });
    // post user comment api
    app.post("/comments", async (req, res) => {
      const productData = await req.body;
      const result = await commentCollection.insertOne(productData);
      res.send(result);
    });

    // post service a
    app.post("/products", async (req, res) => {
      const productData = await req.body;
      const result = await productCollections.insertOne(productData);
      res.send(result);
    });

        // get user comments my product user email
        app.get("/userComment/:email", async (req, res) => {
          const UserEmail = req.params.email;
          const query = { email: UserEmail };
          const sort = { time: -1 };
          const curser = commentCollection.find(query).sort(sort);
          const result = await curser.toArray();
          res.send(result);
        });
  } finally {
  }
}
run().catch((error) => {
  console.log(error);
});

// api listening
app.listen(port, () => {
  console.log(`api listening port is ${port}`);
});
