import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  ChartNoAxesCombined,
  Mail,
  Settings,
  Bot,
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Applications", icon: BriefcaseBusiness },
  { name: "Resume Optimizer", icon: FileText },
  { name: "ATS Analyzer", icon: ChartNoAxesCombined },
  { name: "Email Updates", icon: Mail },
];

export default function Sidebar({
  activePage,
  onNavigate,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Bot size={23} />
        </div>
        <div>
          <h2>JobTrack AI</h2>
          <span>Career workspace</span>
        </div>
      </div>

      <p className="menu-label">WORKSPACE</p>

      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => onNavigate(item.name)}
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <button
          className={`nav-item ${
            activePage === "Settings" ? "active" : ""
          }`}
          onClick={() => onNavigate("Settings")}
        >
          <Settings size={19} />
          <span>Settings</span>
        </button>

        <div className="profile">
          <div className="avatar">P</div>
          <div>
            <strong>My Workspace</strong>
            <span>Personal account</span>
          </div>
        </div>
      </div>
    </aside>
  );
}