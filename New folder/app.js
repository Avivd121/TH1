const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Phone", price: 800 },
  { id: 3, name: "Tablet", price: 600 },
];

const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

// מסלול שמחזיר את כל המוצרים
app.get("/products", (req, res) => {
  res.json(products);
});

//מסלול שמחזיר את כל המשתמשים
app.get("/users", (req, res) => {
  const { age } = req.query;

  if (!age) {
    return res.json(users);
  }

  // המרת age למספר וסינון המשתמשים שגילם שווה או גבוה יותר
  const minAge = parseInt(age);
  const filterUser = users.filter((user) => user.age >= minAge);

  res.json(filterUser);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

//מחזיר מסלול ראשי
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "main.html"));
});

// שרת קבצים סטטיים
app.use(express.static(path.join(__dirname, "assets")));

app.use((req, res) => {
  //send error
  res.sendFile(path.join(__dirname, "assets", "404.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
