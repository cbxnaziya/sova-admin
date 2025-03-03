import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

interface Role {
  id: number;
  _id: string;
  name: string;
  description: string;
  status: string;
}

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [addRole, setAddRole] = useState<Role>({ id: 0, _id: "", name: "", description: "", status: "active" });
  const [addRoleForm, setAddRoleForm] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);
  const [authToken] = useState("Bearer YOUR_ACCESS_TOKEN");

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
      setAddRole({ ...editingRole, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    if (!editingRole) return;
    try {
      const response = await axios.put(
        `http://localhost:5000/admin/api/roles/${editingRole._id}`,
        editingRole,
        { headers: { Authorization: authToken } }
      );
      toast.success(response.data.message);
      setRoles(roles.map((role) => (role._id === editingRole._id ? editingRole : role)));
      setEditingRole(null);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleAdd = async () => {
    console.log("add role",addRole);
    
    if (!addRole) return;
    try {
      const response = await axios.post(
        `http://localhost:5000/admin/api/roles/add`,
        addRole,
        { headers: { Authorization: authToken } }
      );
      setAddRoleForm(false)
      toast.success(response.data.message);
      // setRoles(roles.map((role) => (role._id === editingRole._id ? editingRole : role)));
      setEditingRole(null);
    } catch (error:any) {
      toast.error(error.response.data.message)
      console.error("Error updating role:", error);
    }
  };

  const confirmDelete = (id: string) => {
    setRoleToDelete(id);
  };

  const handleDelete = async () => {
    if (!roleToDelete) return;
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/api/roles/${roleToDelete}`,
        { headers: { Authorization: authToken } }
      );
      toast.success(response.data.message);
      setRoles(roles.filter((role) => role._id !== roleToDelete));
    } catch (error) {
      console.error("Error deleting role:", error);
    } finally {
      setRoleToDelete(null);
    }
  };

  const handleStatusToggle = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
       console.log(userId,currentStatus,"userId");
       
    try {
      const response = await axios.put(
        `http://localhost:5000/admin/api/roles/${userId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      toast.success(response.data.message);

      setRoles((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div className="table-responsive">
      <h3 className="text-lg font-semibold">All Roles</h3>
      <div >
        {
addRoleForm ?
          <button className="btn btn-dark mb-4 float-right" onClick={()=>{setAddRoleForm(false)}}>Back </button>

       :<button className="btn btn-danger mb-4 float-right" onClick={()=>{setAddRoleForm(true)}}>Add +</button>
        }
      </div>
      {editingRole ? (
        <div className="card p-4 w-100">
          <h4>Edit Role</h4>
          <div className="mb-3">
            <label className="form-label">Role Name</label>
            <input type="text" className="form-control" name="name" value={editingRole.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input type="text" className="form-control" name="description" value={editingRole.description} onChange={handleChange} />
          </div>
          <button className="btn btn-danger" onClick={handleSave}>Update</button>
        </div>
      ): addRoleForm ? (
        <div className="card p-4 w-100">
        <h4>Edit Role</h4>
        <div className="mb-3">
          <label className="form-label">Role Name</label>
          <input type="text" className="form-control" name="name" value={addRole?.name} onChange={(e)=>{ if(addRole){setAddRole({ ...addRole, [e.target.name]: e.target.value });}}}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input type="text" className="form-control" name="description" value={addRole?.description}  onChange={(e:any)=>{ if(addRole){setAddRole({ ...addRole, [e.target.name]: e.target.value });}}} />
        </div>
        <button className="btn btn-danger" onClick={handleAdd}>Add</button>
     
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
            {roles.map((role, i) => (
              <tr key={i}>
                <td>{role.name}</td>
                <td>{role.description}</td>
                <td>
                  <button className={`btn btn-sm ${role.status === "active" ? "btn-success" : "btn-danger"}`}>
                    {role.status}
                  </button>
                </td>
                <td>
                  <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    ⋮
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" onClick={() => handleEdit(role)}>Edit</button>
                      <li>
                        <button className="dropdown-item" onClick={() => handleStatusToggle(role._id, role.status)}>
                          {role.status === "active" ? "Mark Inactive" : "Mark Active"}
                        </button>  
                      </li>
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={() => confirmDelete(role._id)}>Delete</button>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delete Confirmation Modal */}
      <div className={`modal fade  ${roleToDelete ? "show d-block" : "d-none"}`} tabIndex={-1} style={{ background: "rgba(0, 0, 0, 0.5)" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button type="button" className="btn-close" onClick={() => setRoleToDelete(null)}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this role?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setRoleToDelete(null)}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
