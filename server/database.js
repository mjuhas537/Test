import * as fs from "fs";

export class Database {

    get = () => {
        const user = fs.readFileSync("localDb.json")
        return JSON.parse(user)
    }

    save = (newUser) => {
        const users = fs.readFileSync("localDb.json")
        let people = JSON.parse(users)
        people.push(newUser)
        fs.writeFileSync("localDb.json", JSON.stringify(people, null, 2), 'utf8')
        const updateUsers = fs.readFileSync("localDb.json")
        return JSON.parse(updateUsers)

    }
    deleteAllUsers = () => {
        fs.writeFileSync("localDb.json", JSON.stringify([], null, 2), 'utf8')
        const updateUsers = fs.readFileSync("localDb.json")
        return JSON.parse(updateUsers)
    }
}