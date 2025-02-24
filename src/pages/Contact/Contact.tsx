import React, { useState } from "react";

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  message: string;
  status: string;
}

const initialSubmissions: ContactSubmission[] = [
  { id: 1, name: "John Doe", email: "john@example.com", message: "Need help with my order.", status: "New" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", message: "Inquiry about product availability.", status: "Resolved" },
];

export default function Contact() {
  const [submissions, setSubmissions] = useState(initialSubmissions);

  const handleStatusToggle = (id: number) => {
    setSubmissions(
      submissions.map((submission) =>
        submission.id === id
          ? { ...submission, status: submission.status === "New" ? "Resolved" : "New" }
          : submission
      )
    );
  };

  return (
    <div className="container mt-4">
        <h3 className=" text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Contact Form Submissions
        </h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td>{submission.name}</td>
                <td>{submission.email}</td>
                <td>{submission.message}</td>
                <td>
                  <span
                    className={`badge ${submission.status === "New" ? "bg-warning" : "bg-success"}`}
                  >
                    {submission.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleStatusToggle(submission.id)}
                  >
                    {submission.status === "New" ? "Mark Resolved" : "Mark New"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
