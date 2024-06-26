import express from 'express';
import cors from 'cors';
import { Database } from "./database.js"

const database = new Database
const app = express()
app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
    try {
        const users = database.get()
        res.send(users)
    } catch (e) {
        res.send('There was an error');
    }
});

app.post('/users', (req, res) => {
    try {
        const newUser = req.body;
        const users = database.save(newUser)
        res.send(users)

    } catch (e) {
        res.send('There was an error');
    }
});

app.delete("/users/:id", (req, res) => {
    try {
        const users = req.params.id == ":all" && database.deleteAllUsers()
        res.send(users);
    } catch {
        res.send('There was an error');
    }
});

app.listen(3000, () => console.log("Listening on the port 3000"));

