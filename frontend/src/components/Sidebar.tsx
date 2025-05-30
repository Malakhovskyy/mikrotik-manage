

import React, { useState } from "react";
import { Drawer, List, ListItemButton, ListItemText, Collapse, ListItemIcon } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DevicesIcon from "@mui/icons-material/Devices";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PeopleIcon from "@mui/icons-material/People";
import GroupIcon from "@mui/icons-material/Group";
import LayersIcon from "@mui/icons-material/Layers";
import SettingsIcon from "@mui/icons-material/Settings";
import TuneIcon from "@mui/icons-material/Tune";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EmailIcon from "@mui/icons-material/Email";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [openDevices, setOpenDevices] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const navigate = useNavigate();

  return (
    <Drawer variant="permanent" anchor="left">
      <List sx={{ width: 240 }}>
        <ListItemButton onClick={() => navigate("/dashboard")}> 
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* Devices */}
        <ListItemButton onClick={() => setOpenDevices(!openDevices)}>
          <ListItemIcon><DevicesIcon /></ListItemIcon>
          <ListItemText primary="Devices" />
          {openDevices ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openDevices} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/devices/credentials")}> 
              <ListItemIcon><VpnKeyIcon /></ListItemIcon>
              <ListItemText primary="Device Credentials" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/devices/groups")}> 
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary="Device Groups" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Users */}
        <ListItemButton onClick={() => setOpenUsers(!openUsers)}>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Users" />
          {openUsers ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/users/groups")}> 
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary="Users-Groups" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Device Templates */}
        <ListItemButton onClick={() => navigate("/device-templates")}> 
          <ListItemIcon><LayersIcon /></ListItemIcon>
          <ListItemText primary="Device Templates" />
        </ListItemButton>

        {/* System Settings */}
        <ListItemButton onClick={() => setOpenSettings(!openSettings)}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="System Settings" />
          {openSettings ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSettings} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/settings/general")}> 
              <ListItemIcon><TuneIcon /></ListItemIcon>
              <ListItemText primary="General" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/settings/2fa")}> 
              <ListItemIcon><VerifiedUserIcon /></ListItemIcon>
              <ListItemText primary="2FA" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/settings/email")}> 
              <ListItemIcon><EmailIcon /></ListItemIcon>
              <ListItemText primary="Email" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;