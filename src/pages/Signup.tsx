import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Heading,
  IconButton,
  useToast,
  Text,
  Spinner, // Added Spinner
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate, Link as RouterLink } from "react-router-dom"; // Added Link

const RegisterPage = () => {
  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  // Hooks
  const toast = useToast();
  const navigate = useNavigate();

  // Toggle password visibility
  const toggleShowPassword = () => setShowPassword(!showPassword);

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle registration
  const handleRegister = async () => {
    // Validate name
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a digit, and a special character.",
      );
      return;
    } else {
      setPasswordError("");
    }

    setLoading(true);

    try {
      // Make API call to register
      const response = await axios.post("http://localhost:8080/auth/register", {
        name,
        email,
        password,
      });

      // Show success toast
      toast({
        title: "Registration Successful!",
        description: "You can now log in with your credentials.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Redirect to login page
      navigate("/login");
    } catch (error: any) {
      // Handle errors
      if (error.response?.status === 409) {
        toast({
          title: "User Already Exists",
          description: "An account with this email already exists.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Registration Failed",
          description: error.response?.data || "An unknown error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt="8"
      p="6"
      boxShadow="lg"
      borderRadius="20px"
      bgGradient="linear(to-br, blue.800, blue.600)"
      color="white"
    >
      <Heading mb={6} textAlign="center">
        Register
      </Heading>

      {/* Name Input */}
      <Input
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        mb={3}
        border="1px solid grey"
        _focus={{ borderColor: "teal.500" }}
      />

      {/* Email Input */}
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        mb={3}
        border="1px solid grey"
        _focus={{ borderColor: "teal.500" }}
      />
      {emailError && (
        <Text color="red.500" fontSize="sm" mb={3}>
          {emailError}
        </Text>
      )}

      {/* Password Input */}
      <InputGroup mb={3}>
        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          border="1px solid grey"
          _focus={{ borderColor: "teal.500" }}
        />
        <InputRightElement width="4.5rem">
          <IconButton
            aria-label={showPassword ? "Hide Password" : "Show Password"}
            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
            onClick={toggleShowPassword}
            variant="unstyled"
            color="gray.500"
          />
        </InputRightElement>
      </InputGroup>
      {passwordError && (
        <Text color="red.500" fontSize="sm" mb={3}>
          {passwordError}
        </Text>
      )}

      {/* Register Button */}
      <Button
        bg="teal.500"
        color="white"
        width="100%"
        onClick={handleRegister}
        isLoading={loading}
        _hover={{ bg: "teal.600" }}
      >
        {loading ? <Spinner size="sm" /> : "Register"}
      </Button>

      {/* Login Link */}
      <Text mt={4} textAlign="center">
        Already have an account?{" "}
        <Link as={RouterLink} to="/login" color="teal.200">
          Login here
        </Link>
      </Text>
    </Box>
  );
};

export default RegisterPage;
