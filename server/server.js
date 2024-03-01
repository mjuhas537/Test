import express from 'express';
import * as fs from "fs";
import cors from 'cors';

const app = express()
app.use(cors());
app.use(express.json());

const user = fs.readFileSync("localDb.json")
let people = JSON.parse(user)

app.get("/users", async (req, res) => {
  const user = fs.readFileSync("localDb.json")
  let people = JSON.parse(user)
  try {
    res.status(200).send(people)
  } catch (e) {
    res.send('There was an error')
  }
});

app.post('/users', (req, res) => {
  const user = fs.readFileSync("localDb.json")
  let people = JSON.parse(user)
  var newUser = req.body;
  people.push(newUser)
  fs.writeFileSync("localDb.json", JSON.stringify(people, null, 2), 'utf8')
  return res.status(200).send('User has been added successfully');

});

app.delete("/users/:id", (req, res) => {
  try {
    console.log(req.params.id);
    req.params.id == ":all" && fs.writeFileSync("localDb.json", JSON.stringify([], null, 2), 'utf8')
    res.sendStatus(204);
  } catch {
    res.sendStatus(404);
    console.log('Eroor with cleaning database');
  }
});

app.listen(3000, () => console.log("Listening on the port 3000"));
