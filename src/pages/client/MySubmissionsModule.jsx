import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

const formatDateTime = (value) => {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const MySubmissionsModule = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/client/submissions")
      .then((data) => {
        setError("");
        setSubmissions(data.submissions || []);
      })
      .catch((requestError) => setError(requestError.message));
  }, []);

  return (
    <div className="dashboard-panel">
      <div className="dashboard-heading">
        <p className="dashboard-kicker">Client submissions</p>
        <h1>My submissions</h1>
        <p>Inquiries and admission requests received through your site.</p>
      </div>

      {error ? <p className="dashboard-error">{error}</p> : null}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td data-label="Type">
                  <span className="table-pill">{submission.type}</span>
                </td>
                <td data-label="Name">
                  {submission.data?.name || submission.data?.studentName || "-"}
                </td>
                <td data-label="Phone">{submission.data?.phone || "-"}</td>
                <td data-label="Status">{submission.status}</td>
                <td data-label="Date">{formatDateTime(submission.createdAt)}</td>
              </tr>
            ))}
            {!submissions.length ? (
              <tr>
                <td colSpan="5">No submissions yet.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySubmissionsModule;
