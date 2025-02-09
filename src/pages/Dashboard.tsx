// src/pages/Dashboard.tsx
import { Box, Heading, Text } from "@chakra-ui/react";

export const Dashboard = () => {
  const username = sessionStorage.getItem("username");

  return (
    <Box textAlign="center" mt={10}>
      <Heading>Welcome, {username}!</Heading>
      <Text mt={4}>You are now logged in.</Text>
    </Box>
  );
};
