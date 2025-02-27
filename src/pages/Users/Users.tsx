import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  image: string;
  name: string;
  company: string;
  account_name: string;
  role: string;
  email: string;
  phone: string;
  country: string;
  status: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/api/users/all", {
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN`,
        },
      })
      .then((response) => setUsers(response.data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleEdit = (user: User) => setEditingUser(user);

  const handleSave = async () => {
    if (editingUser) {
      try {
        await axios.put(
          `http://localhost:5000/admin/api/users/${editingUser.id}`,
          editingUser,
          {
            headers: {
              Authorization: `Bearer YOUR_ACCESS_TOKEN`,
            },
          }
        );
        setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
        setEditingUser(null);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingUser) {
      setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="table-responsive">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">All Users</h3>
      {editingUser ? (
        <div className="card p-4">
          <h4>Edit User</h4>
          <input
            type="text"
            name="company"
            value={editingUser.company}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="account_name"
            value={editingUser.account_name}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <input
            type="email"
            name="email"
            value={editingUser.email}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <input
            type="phone"
            name="phone"
            value={editingUser.phone}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <input
            type="country"
            name="country"
            value={editingUser.country}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Company</th>
              <th>Account Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.company}</td>
                <td>{user.account_name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className={`btn btn-sm ${
                      user.status === "active" ? "btn-success" : "btn-danger"
                    }`}
                  >
                    {user.status}
                  </button>
                </td>
                <td>
                  <div className="dropdown">
                    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                      ⋮
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="dropdown-item" onClick={() => handleEdit(user)}>
                          Edit
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item">{user.status === "Active" ? "Mark Inactive" : "Mark Active"}</button>
                      </li>
                      <li>
                        <button className="dropdown-item text-danger">Delete</button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
