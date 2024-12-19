import Express from "express";
import { MongoClient } from "mongodb";
const port = 8000;
const app = Express();
app.use(Express.json());
const url = "mongodb://localhost:27017";
const clint = new MongoClient(url);
if (clint.connect()) {
  console.log("Connected to the database");
} else {
  console.log("Not connected to the database");
}

app.use((req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
