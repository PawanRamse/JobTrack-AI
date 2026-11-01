
import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import ApplicationForm from "./components/ApplicationForm";

import type { Application } from "./types/application";

import {
  getApplications,
  saveApplications,
} from "./services/storageService";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [applications, setApplications] = useState<Application[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingApplication, setEditingApplication] =
    useState<Application | undefined>(undefined);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const savedApplications = await getApplications();
        setApplications(savedApplications);
      } catch {
        setError("Unable to load your applications.");
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, []);

  const handleSaveApplication = async (application: Application) => {
    const updatedApplications = [
      application,
      ...applications.filter((item) => item.id !== application.id),
    ];

    try {
      await saveApplications(updatedApplications);
      setApplications(updatedApplications);
      setShowForm(false);
      setEditingApplication(undefined);
      setError("");
    } catch {
      setError("Unable to save the application. Please try again.");
    }
  };

  const handleEditApplication = (application: Application) => {
    setEditingApplication(application);
    setShowForm(true);
  };

  const handleDeleteApplication = async (id: string) => {
    const updatedApplications = applications.filter(
      (application) => application.id !== id
    );

    try {
      await saveApplications(updatedApplications);
      setApplications(updatedApplications);
      setError("");
    } catch {
      setError("Unable to delete the application. Please try again.");
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingApplication(undefined);
  };

  const handleAddApplication = () => {
    setEditingApplication(undefined);
    setShowForm(true);
  };

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      {loading ? (
        <main className="main-content">
          <p>Loading your applications...</p>
        </main>
      ) : activePage === "Dashboard" ? (
        <Dashboard
          applications={applications}
          onAddApplication={handleAddApplication}
          onEditApplication={handleEditApplication}
          onDeleteApplication={handleDeleteApplication}
        />
      ) : activePage === "Applications" ? (
        <Applications
          applications={applications}
          onAddApplication={handleAddApplication}
          onEditApplication={handleEditApplication}
          onDeleteApplication={handleDeleteApplication}
        />
      ) : (
        <main className="main-content">
          <header className="top-header">
            <div>
              <p className="eyebrow">WORKSPACE</p>
              <h1>{activePage}</h1>
              <p className="page-description">
                This section will be implemented in an upcoming milestone.
              </p>
            </div>
          </header>
        </main>
      )}

      {error && (
        <div role="alert" className="error-message">
          {error}
        </div>
      )}

      {showForm && (
        <ApplicationForm
          initialData={editingApplication}
          onSave={handleSaveApplication}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
}

export default App;
