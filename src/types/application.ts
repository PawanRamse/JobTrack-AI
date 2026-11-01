export type ApplicationStatus =
  | "Applied"
  | "Shortlisted"
  | "Interview"
  | "Selected"
  | "Rejected"
  | "On Hold";

export interface Application {
  id: string;
  company: string;
  position: string;
  location: string;
  appliedDate: string;
  status: ApplicationStatus;
  jobUrl: string;
  notes: string;
}