// src/services/authService.ts
import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  sessionStorage.setItem("auth-token", response.data.token);
  sessionStorage.setItem("username", response.data.name);
  return response.data;
};

export const signup = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
  });
  sessionStorage.setItem("auth-token", response.data.token);
  sessionStorage.setItem("username", response.data.name);
  return response.data;
};
