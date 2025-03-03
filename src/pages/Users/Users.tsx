import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface User {
  id: number;
  _id: number;
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
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

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
        const response = await axios.put(
          `http://localhost:5000/admin/api/users/${editingUser._id}`,
          editingUser,
          {
            headers: {
              Authorization: `Bearer YOUR_ACCESS_TOKEN`,
            },
          }
        );
        toast.success(response.data.message);
        setUsers(users.map((user) => (user._id === editingUser._id ? editingUser : user)));
        setEditingUser(null);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleStatusToggle = async (userId: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    try {
      const response = await axios.put(
        `http://localhost:5000/admin/api/users/${userId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN`,
          },
        }
      );

      toast.success(response.data.message);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleDelete = async () => {
    if (userToDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/admin/api/users/${userToDelete._id}`,
          {
            headers: {
              Authorization: `Bearer YOUR_ACCESS_TOKEN`,
            },
          }
        );
        toast.success(response.data.message);
        setUsers(users.filter((user) => user._id !== userToDelete._id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
      setUserToDelete(null);
    }
  };

  return (
    <div className="table-responsive">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">All Users</h3>
      {editingUser ? (
        <div className="card p-4">
          <h4>Edit User</h4>
          <input type="text" name="company" value={editingUser.company} onChange={(e) => setEditingUser({ ...editingUser, company: e.target.value })} className="form-control mb-2" />
          <input type="text" name="account_name" value={editingUser.account_name} onChange={(e) => setEditingUser({ ...editingUser, account_name: e.target.value })} className="form-control mb-2" />
          <input type="email" name="email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} className="form-control mb-2" />
          <button className="btn btn-danger" onClick={handleSave}>Save</button>
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
            {users.map((user, i) => (
              <tr key={i}>
                <td>{user.company}</td>
                <td>{user.account_name}</td>
                <td>{user.email}</td>
                <td>
                  <button className={`btn btn-sm ${user.status === "active" ? "btn-success" : "btn-danger"}`} onClick={() => handleStatusToggle(user._id, user.status)}>
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
                        <button className="dropdown-item" onClick={() => handleEdit(user)}>Edit</button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={() => handleStatusToggle(user._id, user.status)}>
                          {user.status === "active" ? "Mark Inactive" : "Mark Active"}
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={() => setUserToDelete(user)}>Delete</button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
     {userToDelete && (
  <div className="modal fade show d-block" tabIndex={-1} style={{ background: "rgba(0, 0, 0, 0.5)" }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Confirm Delete</h5>
          <button type="button" className="btn-close" onClick={() => setUserToDelete(null)}></button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete {userToDelete.account_name}?</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={() => setUserToDelete(null)}>Cancel</button>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
