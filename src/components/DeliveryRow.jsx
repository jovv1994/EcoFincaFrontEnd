import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import FormDialogUpdate from "@/components/FormDialogUpdate";
import Image from "next/image";

export default function DeliveryRow(props) {
  const delivery = props.delivery;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {props.role === "finca" ? (
        <Row>
          <Column>{delivery.created_at}</Column>
          <Column>{delivery.quantity}</Column>
          <Column style={{ width: "200px" }}>
            <Image
              src="/images/logo.svg" // Route of the image file
              height={25} // Desired size with correct aspect ratio
              width={25} // Desired size with correct aspect ratio
              alt="Logo"
            />
          </Column>
          <Column>{delivery.delivery_manager}</Column>
          <Column>{delivery.state}</Column>
          <Column>
            {
              <>
                <StyledButton onClick={handleClickOpen}>Editar</StyledButton>
                <FormDialogUpdate
                  open={open}
                  handleClose={handleClose}
                  delivery={delivery}
                />
              </>
            }
          </Column>
        </Row>
      ) : (
        <Row>
          <Column>{delivery.created_at}</Column>
          <Column style={{ width: "200px" }}>{delivery.description}</Column>
          <Column style={{ width: "200px" }}>
            <Image
              src="/images/logo.svg" // Route of the image file
              height={25} // Desired size with correct aspect ratio
              width={25} // Desired size with correct aspect ratio
              alt="Logo"
            />
          </Column>
          <Column>{delivery.delivery_creator}</Column>
          <Column style={{ width: "200px" }}>direccion</Column>
          <Column>
            <Div>
              <StyledButton>Aceptar entrega</StyledButton>
              <StyledButton>Rechazar entrega</StyledButton>
            </Div>
          </Column>
        </Row>
      )}
    </>
  );
}

const Row = styled.tr`
  display: grid;
  grid-template-columns: 200px 200px 200px 200px 200px 200px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  padding-bottom: 15px;
  justify-content: space-between;
`;

const Column = styled.td`
  text-align: center;
`;

const Div = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

const StyledButton = styled(Button)`
  background: #ffffff;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  color: #1b4332;
  font-size: 8px;
  margin: 2px;
`;
