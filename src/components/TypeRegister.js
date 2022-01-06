import React from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function RegisterCollectionCenter() {
  const router = useRouter();
  const { type, id } = router.query;

  if (type === "finca") {
    return (
      <div>
        <Link href="/registro/acopio">
          <StyledButton>Registrarme como centro de acopio</StyledButton>
        </Link>
        <Link href="/sesion/login">
          <StyledButton>Iniciar Sesión</StyledButton>
        </Link>
      </div>
    );
  } else if (type === "acopio") {
    return (
      <div>
        <Link href="/registro/finca">
          <StyledButton>Registrarme como dueño de finca</StyledButton>
        </Link>
        <Link href="/sesion/login">
          <StyledButton>Iniciar Sesión</StyledButton>
        </Link>
      </div>
    );
  } else if (id === "login") {
    return (
      <div>
        <Link href="/registro/finca">
          <StyledButton>Registrarme como dueño de finca</StyledButton>
        </Link>
        <Link href="/registro/acopio">
          <StyledButton>Registrarme como centro de acopio</StyledButton>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <Link href="/registro/finca">
          <StyledButton>Registrarme como dueño de finca</StyledButton>
        </Link>
        <Link href="/registro/acopio">
          <StyledButton>Registrarme como centro de acopio</StyledButton>
        </Link>
        <Link href="/sesion/login">
          <StyledButton>Iniciar Sesión</StyledButton>
        </Link>
      </div>
    );
  }
}

const StyledButton = styled(Button)`
  background: #ffffff;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  color: #1b4332;
  font-size: 8px;
  margin: 10px;
`;
