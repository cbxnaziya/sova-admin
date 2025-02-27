import React, { useState, useEffect } from "react";
import axios from "axios";

interface Role {
  id: number;
  name: string;
  description: string;
  status: string;
}

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [authToken] = useState(
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjMwNjNlMjNkNzc2NzE1NTExN2YwZCIsImlhdCI6MTc0MDY1Njc2MSwiZXhwIjoxNzQwNjYwMzYxfQ.4Cml5BJS8JEe7ODCmne8iGrlw_ZrV9PoAhpRETJKQa0"
  );

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/api/roles", {
        headers: { Authorization: authToken },
      });
      setRoles(response.data.roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleEdit = (role: Role) => setEditingRole({ ...role });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingRole) {
      setEditingRole({ ...editingRole, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    if (!editingRole) return;
    try {
      await axios.put(`http://localhost:5000/admin/api/roles/${editingRole.id}`, editingRole, {
        headers: { Authorization: authToken },
      });
      setRoles(roles.map((role) => (role.id === editingRole.id ? editingRole : role)));
      setEditingRole(null);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="table-responsive">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">All Roles</h3>
      {editingRole ? (
        <div className="card p-4">
          <h4 className="mb-3">Edit Role</h4>
          <div className="mb-3">
            <label className="form-label">Role Name</label>
            <input type="text" className="form-control" name="name" value={editingRole.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input type="text" className="form-control" name="description" value={editingRole.description} onChange={handleChange} />
          </div>
          <button className="btn btn-primary" onClick={handleSave}>Update</button>
        </div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Role</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.description}</td>
                {/* <td>
                  <span className={`badge ${role.status === "Active" ? "bg-success" : "bg-danger"}`}>{role.status}</span>
                </td> */}
                 <td>
                  <button
                    className={`btn btn-sm ${
                      role.status === "active" ? "btn-success" : "btn-danger"
                    }`}
                  >
                    {role.status}
                  </button>
                </td>
                <td>

                  <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" >  ⋮
                  </button>
                  <ul className="dropdown-menu">
                      <li>
                        <button className="dropdown-item" onClick={() => handleEdit(role)}>
                          Edit
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item">{role.status === "Active" ? "Mark Inactive" : "Mark Active"}</button>
                      </li>
                      <li>
                        <button className="dropdown-item text-danger">Delete</button>
                      </li>
                    </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
