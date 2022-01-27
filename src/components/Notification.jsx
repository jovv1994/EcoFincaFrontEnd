import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Typography from "@mui/material/Typography";

export default function Notification({ delivery }) {
  /*-----------------Renderizado del componente----------------------*/
  return (
    <Container>
      <Title>Notificación de retiro</Title>
      <Image
        src="/images/bxs-notepad.svg" // Route of the image file
        height={50} // Desired size with correct aspect ratio
        width={50} // Desired size with correct aspect ratio
        alt="Finca"
      />
      <StyledTypography>
        Su entrega sera retirada el {delivery.date} a las {delivery.hour}
      </StyledTypography>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto;
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
  font-size: 31px;
  margin-right: 10px;
`;
