import { useState } from "react";
import type {
  Application,
  ApplicationStatus,
} from "../types/application";

interface Props {
  initialData?: Application;
  onSave: (application: Application) => void;
  onCancel: () => void;
}

const statuses: ApplicationStatus[] = [
  "Applied",
  "Shortlisted",
  "Interview",
  "Selected",
  "Rejected",
  "On Hold",
];

export default function ApplicationForm({
  initialData,
  onSave,
  onCancel,
}: Props) {
  const [form, setForm] = useState<Application>(
    initialData ?? {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      location: "",
      appliedDate: new Date().toISOString().slice(0, 10),
      status: "Applied",
      jobUrl: "",
      notes: "",
    }
  );

  const handleChange = (
    field: keyof Application,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(form);
  };

  return (
    <div className="form-overlay">
      <form className="application-form" onSubmit={handleSubmit}>
        <div className="form-heading">
          <div>
            <h2>{initialData ? "Edit Application" : "Add Application"}</h2>
            <p>Enter your job application details.</p>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onCancel}
            aria-label="Close form"
          >
            ×
          </button>
        </div>

        <label>
          Company Name *
          <input
            required
            value={form.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="e.g. Google"
          />
        </label>

        <label>
          Job Position *
          <input
            required
            value={form.position}
            onChange={(e) => handleChange("position", e.target.value)}
            placeholder="e.g. Java Developer"
          />
        </label>

        <div className="form-row">
          <label>
            Location *
            <input
              required
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="e.g. Pune / Remote"
            />
          </label>

          <label>
            Applied Date *
            <input
              type="date"
              required
              value={form.appliedDate}
              onChange={(e) => handleChange("appliedDate", e.target.value)}
            />
          </label>
        </div>

        <label>
          Application Status
          <select
            value={form.status}
            onChange={(e) =>
              handleChange("status", e.target.value)
            }
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label>
          Job URL
          <input
            type="url"
            value={form.jobUrl}
            onChange={(e) => handleChange("jobUrl", e.target.value)}
            placeholder="https://company.com/careers/job"
          />
        </label>

        <label>
          Notes
          <textarea
            rows={3}
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Add interview details or reminders..."
          />
        </label>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>

          <button type="submit" className="primary-button">
            Save Application
          </button>
        </div>
      </form>
    </div>
  );
}