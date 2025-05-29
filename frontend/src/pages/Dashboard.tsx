import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" sx={{ mt: 6 }}>
        Mikrotik Manager Dashboard
      </Typography>
      <Typography sx={{ mt: 3 }}>Welcome! Extend this page with your device and template management.</Typography>
      <Button
        variant="outlined"
        sx={{ mt: 5 }}
        color="secondary"
        onClick={logout}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;