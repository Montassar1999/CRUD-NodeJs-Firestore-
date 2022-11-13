const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const firebase = require("./db");
const firestore = firebase.firestore();

app.post("/create", async (req, res) => {
  try {
    const data = req.body;
    await firestore.collection("cars").doc().set(data);
    res.send({ msg: "Record saved successfuly" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/getCar", async (req, res) => {
    try {
    const id = req.body.id;
      const car = await firestore.collection("cars").doc(id);
      const data = await car.get();
      if (data.empty) {
        res.status(404).send("No Car record found");
      } else {
        res.send(data.data());
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

app.get("/allCars", async (req, res) => {
  try {
    const cars = await firestore.collection("cars");
    const data = await cars.get();
    if (data.empty) {
      res.status(404).send("No Car record found");
    } else {
      const list = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.send(list);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.put("/update", async (req, res) => {
    try {
        const id = req.query.id;
        const data = req.body
      await firestore.collection("cars").doc(id).set(data);
      res.send({ msg: "Record Updated successfuly" });
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  app.delete("/delete", async (req, res) => {
    try {
        const id = req.query.id;
        const data = req.body
      await firestore.collection("cars").doc(id).delete();
      res.send({ msg: "Record Deleted successfuly" });
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

app.listen(3000, () => console.log("Server running on port 3000"));
