import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../utills/api";
import { GET_ALL_USERS, UPDATE_USER } from "../../utills/endpoint";
import { checkPermission, getPagePermissions } from "../../utills/Services";
import { useNavigate } from "react-router";

interface Role {
  id: number;
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  description: string;
  status: string;
  role:string;
}

export default function Users() {
  const navigate = useNavigate()
  const authToken = localStorage.getItem("token"); // Check auth token
  const [roles, setRoles] = useState<Role[]>([]);
  const [editingRole, setEditingRole] = useState<Role | null >(null);
  const [addRole, setAddRole] = useState<Role>({ id: 0, _id: "", name: "",email:"",phone:"",password:"", description: "", status: "active" ,role:""});
  const [addRoleForm, setAddRoleForm] = useState(false);
  const [loader, setLoader] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);
  // const [authToken] = useState("Bearer YOUR_ACCESS_TOKEN");
  const [availableRoles, setAvailableRoles] = useState<{ _id: string; name: string }[]>([]);
  const [permissions, setPermissions] = useState({
    canView: false,
    canCreate: false,
    canEdit: false,
    canDelete: false,
  });

  // useEffect(() => {
  //   const perms = getPagePermissions("User");
  //   setPermissions(perms);
  

  //   if (!perms.canView) {
  //     navigate("/404", { replace: true });
  //   }
  // }, []);


  useEffect(() => {
    const perms = getPagePermissions("User");
    setPermissions(perms);
    
    // if (!perms.canView) {
    //   navigate("/404", { replace: true });
    // }
    if (!checkPermission("User")) {
     navigate("/404"); // Redirect to Page Not Found
    }

    const fetchRoles = async () => {
      try {
        const response = await api.get("/admin/api/roles/all");
        const activeRoles = response?.data?.roles.filter((role: any) => role.status === "active") || [];
        setAvailableRoles(activeRoles);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to fetch roles");
      }
    };
    fetchRoles();
  }, []);
  
  
  useEffect(() => {
  
    const fetchRoles = async () => {
      try {
        console.time("API Call Duration");
        // slow 
        // const response = await fetchHandler( GET_ALL_USERS, "",false,setLoader,"GET");
        const response = await api.get(GET_ALL_USERS);
    
        // very fast fetching the data
        // const response = await axios.get("http://localhost:5000/admin/api/users/all", {
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/api/users/all`, {
        //   headers: { Authorization: authToken },
        // });
        console.timeEnd("API Call Duration");
        setRoles(response?.data?.users);
      } catch (error:any) {
        toast.error(error?.response?.data.message)
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleEdit = (role: Role) => setEditingRole({ ...role });

  const handleChange = (e: any) => {
    console.log("test");
    
    if (editingRole) {
      setEditingRole({ ...editingRole, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    if (!editingRole) return;
    try {
      // const url =  `${UPDATE_USER}/${editingRole._id}`;
      // const response = await fetchHandler( url, editingRole,true,setLoader,"PUT");
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}admin/api/users/${editingRole._id}`,
        editingRole,
        { headers: { Authorization: authToken } }
      );
      setEditingRole(null);
      toast.success(response.data.message);
      setRoles(roles.map((role) => (role._id === editingRole._id ? editingRole : role)));
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleAdd = async () => {
    console.log("add role",addRole);
    
    if (!addRole) return;
    try {
      const response = await axios.post(
        `https://sova-admin.cyberxinfosolution.com/admin/api/users/add`,
        addRole,
        { headers: { Authorization: authToken } }
      );
      setAddRoleForm(false)
      toast.success(response.data.message);
      setRoles([...roles, addRole]);
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
        `https://sova-admin.cyberxinfosolution.com/admin/api/users/${roleToDelete}`,
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
        `https://sova-admin.cyberxinfosolution.com/admin/api/users/${userId}`,
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
      <h3 className="text-lg font-semibold">All Users</h3>
      <div >
        {
addRoleForm  || editingRole?
          <button className="btn btn-secondary mb-4 float-right" onClick={()=>{setAddRoleForm(false); setEditingRole(null);}}>Back </button>

       :<button className="btn btn-dark mb-4 float-right" disabled={!permissions.canCreate} onClick={()=>{setAddRoleForm(true)}}>Add + </button>
        }
      </div>
      {editingRole ? (
        <div className="card p-4 w-100">
          <h4>Edit User </h4>
          <div className="mb-3">
            <label className="form-label">User Name</label>
            <input type="text" className="form-control" name="name" value={editingRole.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">User Email</label>
            <input type="text" className="form-control" name="email" value={editingRole.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">User Phone</label>
            <input type="text" className="form-control" name="phone" value={editingRole.phone} onChange={handleChange} />
          </div>
         
          {/* <div className="mb-3">
            <label className="form-label">User Status  (active/inactive)</label>
            <input type="text" className="form-control" name="status" value={editingRole.status} onChange={handleChange} />
          </div> */}
          <div className="mb-3">
        <label className="form-label">Status</label>
        <select name="status" className="form-select" value={editingRole.status} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
          <div className="mb-3">
        <label className="form-label">Role</label>
          <select
  className="form-control"
  name="role"
  value={editingRole.role}
  // onChange={(e) => setEditingRole({ ...editingRole!, _id: e.target.value })}
  onChange={handleChange}
>
  {/* <option value="">Select Role</option> */}
  {availableRoles.map((role) => (
    <option key={role._id} value={role.name}>
      {role.name}
    </option>
  ))}
</select>

      </div>
     
          <button className="btn btn-dark" onClick={handleSave}>Update</button>
        </div>
      ): addRoleForm ? (
        <div className="card p-4 w-100">
        <h4>Add User </h4>
        <div className="mb-3">
          <label className="form-label">User Name</label>
          <input type="text" className="form-control" name="name" value={addRole?.name} onChange={(e)=>{ if(addRole){setAddRole({ ...addRole, [e.target.name]: e.target.value });}}}/>
        </div>
        <div className="mb-3">
          <label className="form-label">User Email</label>
          <input type="text" className="form-control" name="email" value={addRole?.email} onChange={(e)=>{ if(addRole){setAddRole({ ...addRole, [e.target.name]: e.target.value });}}}/>
        </div>
        <div className="mb-3">
          <label className="form-label">User Phone</label>
          <input type="text" className="form-control" name="phone" value={addRole?.phone} onChange={(e)=>{ if(addRole){setAddRole({ ...addRole, [e.target.name]: e.target.value });}}}/>
        </div>
        <div className="mb-3">
          <label className="form-label">User Password</label>
          <input type="text" className="form-control" name="password" value={addRole?.password} onChange={(e)=>{ if(addRole){setAddRole({ ...addRole, [e.target.name]: e.target.value });}}}/>
        </div>

        {/* <div className="mb-3">
          <label className="form-label">User Status</label>
          <input type="text" className="form-control" name="status" value={addRole?.status} onChange={(e)=>{ if(addRole){setAddRole({ ...addRole, [e.target.name]: e.target.value });}}}/>
        </div> */}
             <div className="mb-3">
        <label className="form-label">Status</label>
        <select name="status" className="form-select" value={addRole?.status} onChange={(e:any)=>{ if(addRole){setAddRole({ ...addRole, [e.target.name]: e.target.value });}}}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="mb-3">
      <label className="form-label">Role</label>
      <select
  className="form-control"
  name="role"
  value={addRole.role}
  // onChange={(e) => setAddRole({ ...addRole, _id: e.target.value })}
  onChange={(e:any)=>{ if(addRole){setAddRole({ ...addRole, [e.target.name]: e.target.value });}}}
>
  <option value="">Select Role</option>
  {availableRoles.map((role) => (
    <option key={role._id} value={role.name}>
      {role.name}
    </option>
  ))}
</select>
  </div>

        <button className="btn btn-dark" onClick={handleAdd}>Add</button>
     
      </div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              {/* <th>Password</th> */}
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, i) => (
              <tr key={i}>
                <td>{role.name}</td>
                <td>{role.email}</td>
                <td>{role.phone}</td>
                {/* <td>{role.description}</td> */}
                <td>
                  <button className={`btn btn-sm ${role.status === "active" ? "btn-outline-success" : "btn-outline-danger"}`}>
                    {role.status}
                  </button>
                </td>
                <td>
                 
                 <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    ⋮
                 
                  </button>
                  <ul className="dropdown-menu">
                  {permissions.canEdit && 

                    <li>
                      <button className="dropdown-item" onClick={() => handleEdit(role)}>Edit</button>
                      <li>
                        <button className="dropdown-item" onClick={() => handleStatusToggle(role._id, role.status)}>
                          {role.status === "active" ? "Mark Inactive" : "Mark Active"}
                        </button>  
                      </li>
                    </li>
                  }
                 {permissions.canDelete &&   <li>
                      <button className="dropdown-item text-danger" onClick={() => confirmDelete(role._id)}>Delete</button>
                    </li>}
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
