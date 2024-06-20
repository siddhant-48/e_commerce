const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
const User = require("../server/schemas/userSchema");
const Product = require("../server/schemas/productSchema");

const multer = require("multer");
const path = require("path");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "tnjdcJNsdjn";

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  })
);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

app.get("/", (req, res) => {
  console.log("hello");
});

mongoose.connect("mongodb://localhost:27017/market", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
// db.once("open", async (req, res) => {
//     try{
//         const add = await User.insertMany([
//             {
//                 email:"sid@yopmail.com",
//                 password:"123456",
//                 cnPassword:"123456",
//             }
//         ])
//     }
//     catch(error){
//         console.log(error);
//     }
// });

//signup
app.post("/signup", (req, res) => {
  const insert = new User(req.body);
  insert
    .save()
    .then((savedData) => {
      console.log("Data saved:", savedData);
      return res.status(200).json({
        message: "data recieved",
        data: savedData,
      });
    })
    .catch((err) => {
      console.error("Error inserting data:", err);
      return res
        .status(500)
        .json({ message: "Error inserting data", error: err });
    });
});

//sigin
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password === password) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET);
      return res
        .status(200)
        .json({ status: "ok", data: token, isAdmin: user.isAdmin });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error("Error during sign in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//validate log in
app.post("/userEmail", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const user_email = user.email;
    const userData = await User.findOne({ email: user_email });
    if (userData) {
      res
        .status(200)
        .send({ status: "ok", user: userData, isAdmin: userData.isAdmin });
    } else {
      res.status(404).send({ status: "error", message: "User not found" });
    }
  } catch (err) {
    console.error("Error fetching user email:", err);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
});

//image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "client", "public", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Add product
app.post("/add-product", upload.single("image"), async (req, res) => {
  try {
    const { name, description, rating, price, category } = req.body;
    const prefixRupees = "₹" + price;
    const image = `/uploads/${req.file.filename}`; //relative path

    const newProduct = new Product({
      image,
      name,
      description,
      rating,
      // price,
      price: prefixRupees,
      category,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
