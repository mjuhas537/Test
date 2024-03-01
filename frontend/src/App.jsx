import { useState, useEffect, useRef } from 'react'

function App() {
  const [users, setUsers] = useState(new Array)
  const [user, setUser] = useState(new Object);
  const url = "http://localhost:3000/users"

  const fetchGet = async (url) => {
    const response = await fetch(`${url}`);
    const users = await response.json()
    setUsers(users)
  }

  const fetchPost = async (newUser) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser)
    };
    await fetch(url, requestOptions)
  };

  const deleteItem = async (item) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }

    await fetch(`${url}/:${item}`, requestOptions);
    await fetchGet(url);
  }

  useEffect(() => {
    fetchGet(url);
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = () => {
    fetchPost(user);
  }

  const cleanDb = () => {
    deleteItem("all");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your 1st name:
          <input
            type="text"
            name="firstName"
            value={user.username}
            onChange={handleChange}
          />
        </label>
        <label>Enter your 2st name:
          <input
            type="text"
            name="lastName"
            value={user.username}
            onChange={handleChange}
          />
        </label>
        <label>Enter your age:
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
          />
        </label>
        <label>Enter your State:
          <input
            type="text"
            name="state"
            value={user.state}
            onChange={handleChange}
          />
        </label>
        <button type="submit" > Submit Form </button>
      </form>
      <button type="button" onClick={cleanDb} >Clean database</button>
      <p className="read-the-docs">
        TITLE
      </p>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, row) => {
            return <tr key={row}>
              <td>{row + 1}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>{item.state}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App
