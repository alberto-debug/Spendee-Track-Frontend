import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Heading,
  useToast,
  IconButton,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Hooks
  const toast = useToast();
  const navigate = useNavigate();

  // Toggle password visibility
  const toggleShowPassword = () => setShowPassword(!showPassword);

  // Handle login
  const handleLogin = async () => {
    // Validate inputs
    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      // Make API call to login
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      // Show success toast
      toast({
        title: "Login realizado!",
        description: "Você está agora logado.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Store token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      // Show error toast
      toast({
        title: "Erro ao fazer login",
        description: error.response?.data?.message || "Algo deu errado.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
        Login
      </Heading>

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

      {/* Password Input */}
      <InputGroup mb={3}>
        <Input
          placeholder="Senha"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          border="1px solid grey"
          _focus={{ borderColor: "teal.500" }}
        />
        <InputRightElement width="4.5rem">
          <IconButton
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
            onClick={toggleShowPassword}
            variant="unstyled"
            color="gray.500"
          />
        </InputRightElement>
      </InputGroup>

      {/* Login Button */}
      <Button
        bg="teal.500"
        color="white"
        width="100%"
        onClick={handleLogin}
        isLoading={loading}
        _hover={{ bg: "teal.600" }}
      >
        {loading ? <Spinner size="sm" /> : "Login"}
      </Button>

      {/* Register Link */}
      <Text mt={4} textAlign="center">
        Não tem uma conta?{" "}
        <Link as={RouterLink} to="/register" color="teal.200">
          Clique aqui para se registrar
        </Link>
      </Text>
    </Box>
  );
};

export default LoginPage;
