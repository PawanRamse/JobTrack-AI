
import { useMemo, useState } from "react";
import { Search, BriefcaseBusiness } from "lucide-react";

import type {
  Application,
  ApplicationStatus,
} from "../types/application";

import ApplicationTable from "../components/ApplicationTable";

interface ApplicationsProps {
  applications: Application[];
  onEditApplication: (application: Application) => void;
  onDeleteApplication: (id: string) => void;
  onAddApplication: () => void;
}

const statuses: (ApplicationStatus | "All")[] = [
  "All",
  "Applied",
  "Shortlisted",
  "Interview",
  "Selected",
  "Rejected",
  "On Hold",
];

export default function Applications({
  applications,
  onEditApplication,
  onDeleteApplication,
  onAddApplication,
}: ApplicationsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<ApplicationStatus | "All">("All");

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        application.company.toLowerCase().includes(search) ||
        application.position.toLowerCase().includes(search);

      const matchesStatus =
        selectedStatus === "All" ||
        application.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, selectedStatus]);

  return (
    <main className="main-content">
      <header className="top-header">
        <div>
          <p className="eyebrow">JOB TRACKER</p>
          <h1>Applications</h1>
          <p className="page-description">
            Manage, search and track all your job applications.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={onAddApplication}
        >
          <BriefcaseBusiness size={18} />
          Add Application
        </button>
      </header>

      <section className="applications-section">
        <div className="application-toolbar">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search company or job title..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <select
            className="status-filter"
            value={selectedStatus}
            onChange={(event) =>
              setSelectedStatus(
                event.target.value as ApplicationStatus | "All"
              )
            }
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === "All" ? "All Statuses" : status}
              </option>
            ))}
          </select>
        </div>

        <div className="section-heading">
          <div>
            <h2>All Applications</h2>
            <p>Manage your job search activity.</p>
          </div>

          <span className="record-count">
            {filteredApplications.length} of {applications.length} records
          </span>
        </div>

        <ApplicationTable
          applications={filteredApplications}
          onEdit={onEditApplication}
          onDelete={onDeleteApplication}
        />
      </section>
    </main>
  );
}
