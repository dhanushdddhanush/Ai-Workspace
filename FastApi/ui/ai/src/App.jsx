import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const Users = () => {
  const [users, setUsers] = useState([]); 
  const [formData, setFormData] = useState({ name: "", email:"",role:"",company:""});

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/")
      .then((res) => setUsers(res.data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/users/", formData);
      setUsers([...users, res.data.user]);
      alert("User added successfully!");
      setFormData({ name: "", email:"",role:"",company:"" });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add user.");
    }
  };

  return (
    <>
      <div className="header">
        <h1>Fast API User Management</h1>
      </div>

      <div className="container">
        <h2>Add User</h2>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="role"
              placeholder="Enter Role"
              value={formData.role}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Enter Company"
              value={formData.company}
              onChange={handleChange}
              required
            />
            
            <button type="submit">Add User</button>
          </form>
        </div>

        <h2>Users List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
