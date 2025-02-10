// src/pages/Login.tsx
import { Box, Heading } from "@chakra-ui/react";
import { AuthForm } from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await login(data.email, data.password);
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    j < Box maxW = "400px" mx = "auto" mt = { 10} >
      <Heading mb={6}>Login</Heading>
      <AuthForm isLogin onSubmit={handleLogin} />
    </Box >
  );
};
