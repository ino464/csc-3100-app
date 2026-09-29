import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import {
  addUser,
  deleteUserById,
  findUserById,
  findUserByJob,
  findUserByName,
  findUserByNameAndJob,
  getUsers,
} from "./services/user-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose.connect(MONGO_CONNECTION_STRING + "users").catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users/:id", (req, res) => {
  findUserById(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send("Resource not found.");
        return;
      }
      res.send(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Database error.");
    });
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  let usersPromise;

  if (name !== undefined && job !== undefined) {
    usersPromise = findUserByNameAndJob(name, job);
  } else if (name !== undefined) {
    usersPromise = findUserByName(name);
  } else if (job !== undefined) {
    usersPromise = findUserByJob(job);
  } else {
    usersPromise = getUsers();
  }

  usersPromise
    .then((users) => res.send({ users_list: users }))
    .catch((error) => {
      console.error(error);
      res.status(500).send("Database error.");
    });
});

app.post("/users", (req, res) => {
  addUser(req.body)
    .then((newUser) => res.status(201).send(newUser))
    .catch((error) => {
      console.error(error);
      res.status(500).send("Database error.");
    });
});

app.delete("/users/:id", (req, res) => {
  deleteUserById(req.params.id)
    .then((deletedUser) => {
      if (deletedUser === null) {
        res.status(404).send("Resource not found.");
        return;
      }
      res.status(204).send();
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Database error.");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
