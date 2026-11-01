
import type { Application } from "../types/application";

interface Props {
  applications: Application[];
  onEdit: (application: Application) => void;
  onDelete: (id: string) => void;
}

export default function ApplicationTable({
  applications,
  onEdit,
  onDelete,
}: Props) {
  const handleDelete = (id: string, company: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the application for ${company}?`
    );

    if (confirmed) {
      onDelete(id);
    }
  };

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Location</th>
            <th>Applied Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty-state">
                No applications found. Add your first application!
              </td>
            </tr>
          ) : (
            applications.map((app) => (
              <tr key={app.id}>
                <td className="company-name">{app.company}</td>
                <td>{app.position}</td>
                <td>{app.location}</td>
                <td>{app.appliedDate}</td>
                <td>
                  <span
                    className={`status status-${app.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {app.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => onEdit(app)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleDelete(app.id, app.company)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
