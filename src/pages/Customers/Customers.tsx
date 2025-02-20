import React, { useState } from "react";

interface Customer {
  id: number;
  image: string;
  name: string;
  email: string;
  phone: string;
  status: string;
}

const customersData: Customer[] = [
  {
    id: 1,
    image: "/images/user/user-17.jpg",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 123-456-7890",
    status: "Active",
  },
  {
    id: 2,
    image: "/images/user/user-18.jpg",
    name: "Alice Smith",
    email: "alice@example.com",
    phone: "+1 987-654-3210",
    status: "Pending",
  },
  {
    id: 3,
    image: "/images/user/user-19.jpg",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+1 456-789-0123",
    status: "Inactive",
  },
];

export default function Customers() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [customers, setCustomers] = useState(customersData);

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = (id: number, updatedCustomer: Customer) => {
    setCustomers(customers.map((customer) => (customer.id === id ? updatedCustomer : customer)));
    setEditingId(null);
  };

  const handleStatusToggle = (id: number) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === id
          ? { ...customer, status: customer.status === "Active" ? "Inactive" : "Active" }
          : customer
      )
    );
  };

  const handleDelete = (id: number) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) =>
            editingId === customer.id ? (
              <tr key={customer.id}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={customer.name}
                    onChange={(e) => (customer.name = e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="email"
                    className="form-control"
                    defaultValue={customer.email}
                    onChange={(e) => (customer.email = e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={customer.phone}
                    onChange={(e) => (customer.phone = e.target.value)}
                  />
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${customer.status === "Active" ? "btn-success" : "btn-danger"}`}
                    onClick={() => handleStatusToggle(customer.id)}
                  >
                    {customer.status}
                  </button>
                </td>
                <td>
                  <button className="btn btn-primary btn-sm" onClick={() => handleSave(customer.id, customer)}>
                    Save
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={customer.id}>
                <td>
                  <img src={customer.image} alt={customer.name} className="rounded-circle me-2" width="40" height="40" />
                  {customer.name}
                </td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  <button className={`btn btn-sm ${customer.status === "Active" ? "btn-success" : "btn-danger"}`}>
                    {customer.status}
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
                        <button className="dropdown-item" onClick={() => handleEdit(customer.id)}>
                          Edit
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={() => handleStatusToggle(customer.id)}>
                          {customer.status === "Active" ? "Mark Inactive" : "Mark Active"}
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={() => handleDelete(customer.id)}>
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
