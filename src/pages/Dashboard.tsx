
import {
  BriefcaseBusiness,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Sparkles,
} from "lucide-react";

import type { Application } from "../types/application";
import StatCard from "../components/StatCard";
import ApplicationTable from "../components/ApplicationTable";

interface DashboardProps {
  applications: Application[];
  onAddApplication: () => void;
  onEditApplication: (application: Application) => void;
  onDeleteApplication: (id: string) => void;
}

export default function Dashboard({
  applications,
  onAddApplication,
  onEditApplication,
  onDeleteApplication,
}: DashboardProps) {
  const total = applications.length;

  const interviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const shortlisted = applications.filter(
    (app) => app.status === "Shortlisted"
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  return (
    <main className="main-content">
      <header className="top-header">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Dashboard</h1>
          <p className="page-description">
            Track your job search journey in one place.
          </p>
        </div>

        <button className="primary-button" onClick={onAddApplication}>
          <Plus size={18} />
          Add Application
        </button>
      </header>

      <section className="welcome-banner">
        <div>
          <span className="welcome-tag">
            <Sparkles size={15} /> YOUR CAREER WORKSPACE
          </span>
          <h2>Stay organized. Get hired.</h2>
          <p>
            Keep your applications organized and make your next career move
            with confidence.
          </p>
        </div>

        <BriefcaseBusiness size={70} className="banner-icon" />
      </section>

      <section className="stats-grid">
        <StatCard
          title="Total Applications"
          value={total}
          icon={BriefcaseBusiness}
          description="Applications tracked"
        />

        <StatCard
          title="Shortlisted"
          value={shortlisted}
          icon={Clock}
          description="Moving forward"
        />

        <StatCard
          title="Interviews"
          value={interviews}
          icon={CheckCircle2}
          description="Interview opportunities"
        />

        <StatCard
          title="Rejected"
          value={rejected}
          icon={XCircle}
          description="Closed applications"
        />
      </section>

      <section className="applications-section">
        <div className="section-heading">
          <div>
            <h2>Recent Applications</h2>
            <p>Your latest job application activity.</p>
          </div>

          <span className="record-count">{total} records</span>
        </div>

        <ApplicationTable
          applications={applications}
          onEdit={onEditApplication}
          onDelete={onDeleteApplication}
        />
      </section>
    </main>
  );
}
