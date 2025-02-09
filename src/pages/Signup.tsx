// src/pages/Signup.tsx
import { Box, Heading } from "@chakra-ui/react";
import { AuthForm } from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authService";

export const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await signup(data.name, data.email, data.password);
      navigate("/dashboard"); // Redirect to dashboard after signup
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={10}>
      <Heading mb={6}>Sign Up</Heading>
    </Box>
  );
};
