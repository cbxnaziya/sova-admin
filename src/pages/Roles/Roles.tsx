import React, { useState } from "react";

interface Role {
  id: number;
  name: string;
  description: string;
  status: string;
}

const rolesData: Role[] = [
  { id: 1, name: "Admin", description: "Full access to all settings", status: "Active" },
  { id: 2, name: "Editor", description: "Can edit content", status: "Pending" },
  { id: 3, name: "Viewer", description: "Can view content only", status: "Inactive" },
];

export default function Roles() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [roles, setRoles] = useState(rolesData);

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = (id: number, updatedRole: Role) => {
    setRoles(roles.map((role) => (role.id === id ? updatedRole : role)));
    setEditingId(null);
  };

  const handleStatusToggle = (id: number) => {
    setRoles(
      roles.map((role) =>
        role.id === id ? { ...role, status: role.status === "Active" ? "Inactive" : "Active" } : role
      )
    );
  };

  const handleDelete = (id: number) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    
    <div className="table-responsive">
          <h3 className=" text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
       All Roles
        </h3>
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
          {roles.map((role) =>
            editingId === role.id ? (
              <tr key={role.id}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={role.name}
                    onChange={(e) => (role.name = e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={role.description}
                    onChange={(e) => (role.description = e.target.value)}
                  />
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${role.status === "Active" ? "btn-success" : "btn-danger"}`}
                    onClick={() => handleStatusToggle(role.id)}
                  >
                    {role.status}
                  </button>
                </td>
                <td>
                  <button className="btn btn-primary btn-sm" onClick={() => handleSave(role.id, role)}>
                    Save
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.description}</td>
                <td>
                  <button className={`btn btn-sm ${role.status === "Active" ? "btn-success" : "btn-danger"}`}>
                    {role.status}
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
                        <button className="dropdown-item" onClick={() => handleEdit(role.id)}>
                          Edit
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={() => handleStatusToggle(role.id)}>
                          {role.status === "Active" ? "Mark Inactive" : "Mark Active"}
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={() => handleDelete(role.id)}>
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
