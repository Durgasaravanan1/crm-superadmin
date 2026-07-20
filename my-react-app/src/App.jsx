import React, { useState } from "react";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Overview from "./components/Overview";
import Tenants from "./components/Tenants";
import Billing from "./components/Billing";
import Plans from "./components/Plans";
import Announcements from "./components/Announcements";
import Settings from "./components/Settings";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedTenant, setSelectedTenant] = useState(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
  currentView={currentView}
  setCurrentView={setCurrentView}
  setSelectedTenant={setSelectedTenant}
/>
        <main className="flex-1 overflow-y-auto p-6 space-y-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-background">
          {currentView === "dashboard" && <Overview />}
          {currentView === "tenants" && (
  <Tenants
    selectedTenant={selectedTenant}
    setSelectedTenant={setSelectedTenant}
  />
)}
          {currentView === "billing" && <Billing />}
          {currentView === "plans" && <Plans />}
          {currentView === "announcements" && <Announcements />}
          {currentView === "settings" && <Settings />}
        </main>
      </div>
    </div>
  );
}

export default App;