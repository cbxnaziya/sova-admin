import React, { useState } from "react";

interface User {
  id: number;
  image: string;
  name: string;
  role: string;
  email: string;
  status: string;
}

const usersData: User[] = [
  {
    id: 1,
    image: "/images/user/user-17.jpg",
    name: "Lindsey Curtis",
    role: "Web Designer",
    email: "lindsey@example.com",
    status: "Active",
  },
  {
    id: 2,
    image: "/images/user/user-18.jpg",
    name: "Kaiya George",
    role: "Project Manager",
    email: "kaiya@example.com",
    status: "Pending",
  },
  {
    id: 3,
    image: "/images/user/user-19.jpg",
    name: "Zain Geidt",
    role: "Content Writer",
    email: "zain@example.com",
    status: "Inactive",
  },
];

export default function Users() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [users, setUsers] = useState(usersData);

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = (id: number, updatedUser: User) => {
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    setEditingId(null);
  };

  const handleStatusToggle = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
          : user
      )
    );
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    
    <div className="table-responsive">
          <h3 className=" text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
       All Users
        </h3>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            editingId === user.id ? (
              <tr key={user.id}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user.name}
                    onChange={(e) => (user.name = e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user.role}
                    onChange={(e) => (user.role = e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="email"
                    className="form-control"
                    defaultValue={user.email}
                    onChange={(e) => (user.email = e.target.value)}
                  />
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${
                      user.status === "Active" ? "btn-success" : "btn-danger"
                    }`}
                    onClick={() => handleStatusToggle(user.id)}
                  >
                    {user.status}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleSave(user.id, user)}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={user.id}>
                <td>
                  <img
                    src={user.image}
                    alt={user.name}
                    className="rounded-circle me-2"
                    width="40"
                    height="40"
                  />
                  {user.name}
                </td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className={`btn btn-sm ${
                      user.status === "Active" ? "btn-success" : "btn-danger"
                    }`}
                  >
                    {user.status}
                  </button>
                </td>
                <td>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary btn-sm dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ⋮
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleEdit(user.id)}
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleStatusToggle(user.id)}
                        >
                          {user.status === "Active" ? "Mark Inactive" : "Mark Active"}
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
