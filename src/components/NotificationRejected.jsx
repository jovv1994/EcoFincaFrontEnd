import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Typography from "@mui/material/Typography";

export default function NotificationRejected({ delivery }) {
  console.log(delivery);
  return (
    <Container>
      <Title>Notificación de entrega rechazada</Title>
      <Image
        src="/images/bxs-notepad.svg"
        height={50}
        width={50}
        alt="notepad"
      />
      <StyledTypography>
        Su entrega fue rechazada porque: {delivery.rejected}
      </StyledTypography>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  justify-content: center;
  background: #74c69d;
  padding: 15px;
  margin: auto;
`;

const Title = styled.h1`
  text-align: center;
  color: #1b4332;
`;

const StyledTypography = styled(Typography)`
  display: inline-block;
  color: #1b4332;
  font-size: 15px;
  margin-right: 10px;
  text-align: center;
`;
