import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export async function login(email: string, password: string, otp_code: string) {
  const res = await axios.post(`${API_URL}/api/v1/auth/login`, {
    email, password, otp_code
  });
  return res.data;
}