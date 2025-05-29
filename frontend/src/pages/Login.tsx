import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("admin@local");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { access_token } = await login(email, password, otp);
      localStorage.setItem("access_token", access_token);
      navigate("/dashboard");
    } catch (e: any) {
      setError(e.response?.data?.detail || "Login failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Mikrotik Manager Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            margin="normal"
            fullWidth
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
          />
          <TextField
            label="Password"
            type="password"
            margin="normal"
            fullWidth
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <TextField
            label="2FA Code"
            type="text"
            margin="normal"
            fullWidth
            value={otp}
            onChange={e => setOtp(e.target.value)}
            autoComplete="one-time-code"
            helperText="If enabled for this user"
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;