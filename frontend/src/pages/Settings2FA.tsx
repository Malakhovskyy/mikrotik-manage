import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Switch,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
const ENDPOINT = `${API_URL}/api/v1/settings/2fa`;

export default function Settings2FA() {
  const [type, setType] = useState<"local" | "duo">("local");
  const [enforce, setEnforce] = useState(false);
  const [duo, setDuo] = useState({
    apiHost: "",
    integrationKey: "",
    secretKey: "",
    applicationKey: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Get JWT from localStorage
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    // Fetch current settings on mount
    async function fetchSettings() {
      setLoading(true);
      setError(null);
      try {
        const resp = await fetch(ENDPOINT, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resp.ok) throw new Error("Failed to load settings");
        const data = await resp.json();
        setType(data.type);
        setEnforce(data.enforce);
        setDuo(data.duo || {
          apiHost: "",
          integrationKey: "",
          secretKey: "",
          applicationKey: "",
        });
      } catch (e: any) {
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
    // eslint-disable-next-line
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const resp = await fetch(ENDPOINT, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type, enforce, duo: type === "duo" ? duo : null }),
      });
      if (!resp.ok) throw new Error("Failed to save settings");
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}><CircularProgress /></Box>;

  return (
    <Paper sx={{ maxWidth: 520, mx: "auto", mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>2FA Settings</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Settings saved successfully!</Alert>}

      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend">2FA Type</FormLabel>
        <RadioGroup
          value={type}
          onChange={e => setType(e.target.value as "local" | "duo")}
        >
          <FormControlLabel value="local" control={<Radio />} label="Local 2FA (TOTP, Google Authenticator, etc.)" />
          <FormControlLabel value="duo" control={<Radio />} label="DUO Integration" />
        </RadioGroup>
      </FormControl>

      {type === "duo" && (
        <Box sx={{ mb: 2, pl: 2 }}>
          <TextField
            fullWidth
            label="DUO API Host"
            value={duo.apiHost}
            onChange={e => setDuo({ ...duo, apiHost: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Integration Key"
            value={duo.integrationKey}
            onChange={e => setDuo({ ...duo, integrationKey: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Secret Key"
            value={duo.secretKey}
            onChange={e => setDuo({ ...duo, secretKey: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Application Key"
            value={duo.applicationKey}
            onChange={e => setDuo({ ...duo, applicationKey: e.target.value })}
            sx={{ mb: 2 }}
          />
        </Box>
      )}

      <FormControlLabel
        control={
          <Switch
            checked={enforce}
            onChange={e => setEnforce(e.target.checked)}
          />
        }
        label="Enforce 2FA for all users"
      />
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
        {enforce
          ? "All users will be required to enable and use 2FA to log in."
          : "2FA can be enabled or disabled by each user individually."}
      </Typography>
      <Button variant="contained" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
    </Paper>
  );
}