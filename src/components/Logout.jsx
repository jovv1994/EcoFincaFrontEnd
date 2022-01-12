import React from "react";
import { Button } from "@material-ui/core";
import { useAuth } from "@/contexts/auth";
import styled from "styled-components";

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return <StyledButton onClick={handleLogout}>Cerrar sesión</StyledButton>;
};

export default Logout;

const StyledButton = styled(Button)`
  background: #ffffff;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  color: #1b4332;
  font-size: 8px;
  margin: 10px;
`;
