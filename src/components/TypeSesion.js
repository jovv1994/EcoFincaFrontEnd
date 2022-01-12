import React, { useState } from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Logout from "@/components/Logout";
import { useAuth } from "@/contexts/auth";

export default function TypeSesion() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user } = useAuth();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sesionRole = user.role;

  if (sesionRole === "ROLE_FARM") {
    return (
      <Container>
        <Link href="/home/finca">
          <StyledButton>Ir al home del dueño de finca</StyledButton>
        </Link>
        <Link href="/entregas/entrega">
          <StyledButton>Realizar una entrega</StyledButton>
        </Link>
        <StyledTypography variant="h6">Bienvenido</StyledTypography>
        <StyledTypography variant="h6">
          {user.name} {user.lastname}
        </StyledTypography>
        <IconButton>
          <StyledAccountCircle />
        </IconButton>

        <Logout />
      </Container>
    );
  }

  return (
    <Container>
      <Link href="/home/acopio">
        <StyledButton>Ir al home del centro de acopio </StyledButton>
      </Link>
      <StyledTypography variant="h6">Bienvenido</StyledTypography>
      <StyledTypography variant="h6">
        {user.name} {user.lastname}
      </StyledTypography>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Logout />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  justify-content: space-evenly;
  align-content: center;
  width: 100%;
`;

const StyledButton = styled(Button)`
  background: #ffffff;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  color: #1b4332;
  font-size: 8px;
  margin: 10px;
`;

const StyledTypography = styled(Typography)`
  margin: 10px;
  color: #1b4332;
  font-size: 25px;
`;

const StyledAccountCircle = styled(AccountCircle)`
  font-size: 35px;
`;
