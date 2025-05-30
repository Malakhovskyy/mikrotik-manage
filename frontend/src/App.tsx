import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import DeviceCredentials from "./pages/DeviceCredentials";
import Users from "./pages/Users";
import UserGroups from "./pages/UserGroups";
import DeviceTemplates from "./pages/DeviceTemplates";
import SettingsGeneral from "./pages/SettingsGeneral";
import Settings2FA from "./pages/Settings2FA";
import SettingsEmail from "./pages/SettingsEmail";
import DeviceGroups from "./pages/DeviceGroups";
import Sidebar from "./components/Sidebar";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: "24px" }}>{children}</div>
    </div>
  );
}

function App() {
  const isAuth = !!localStorage.getItem("access_token");
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          isAuth ? (
            <PrivateLayout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/devices" element={<Devices />} />
                <Route path="/devices/credentials" element={<DeviceCredentials />} />
                <Route path="/devices/groups" element={<DeviceGroups />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/groups" element={<UserGroups />} />
                <Route path="/device-templates" element={<DeviceTemplates />} />
                <Route path="/settings/general" element={<SettingsGeneral />} />
                <Route path="/settings/2fa" element={<Settings2FA />} />
                <Route path="/settings/email" element={<SettingsEmail />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </PrivateLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}
export default App;