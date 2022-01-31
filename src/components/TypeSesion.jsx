import React from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Logout from "@/components/Logout";
import { useAuth } from "@/contexts/auth";

export default function TypeSesion() {
  const { user } = useAuth();

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
        <Title variant="h6">
          Bienvenido {user.name} {user.lastname}
        </Title>
        <Logout />
      </Container>
    );
  }

  return (
    <Container>
      <Link href="/home/acopio">
        <StyledButton>Ir al home del centro de acopio </StyledButton>
      </Link>
      <Title variant="h6">Bienvenido</Title>
      <Title variant="h6">
        {user.name} {user.lastname}
      </Title>
      <Logout />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
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

const Title = styled.h2`
  text-align: center;
  color: #1b4332;
  margin: 0;
  padding: 5px;
`;
