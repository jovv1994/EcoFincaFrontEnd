import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import FormDialogUpdate from "@/components/FormDialogUpdate";
import FormDialogNotification from "@/components/FormDialogNotification";
import Image from "next/image";
import Delivery from "@/api/delivery";

export default function DeliveryRow({ delivery, role }) {
  const [open, setOpen] = useState(false);
  const [stateDelivery, setStateDelivery] = useState("Pendiente");
  let column;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStateRejected = async () => {
    try {
      const response = await Delivery.updateAcopio(delivery.id, "Rechazada");
      setStateCollection(true);
      console.log(response);
      setStateDelivery("Rechazada");
    } catch (error) {
      console.log(error);
    }
  };

  const handleStateAccepted = async () => {
    try {
      const response = await Delivery.updateAcopio(
        delivery.id,
        "Pendiente de retiro"
      );
      console.log(response);
      setStateDelivery("Pendiente de retiro");
    } catch (error) {
      console.log(error);
    }
  };

  if (delivery.state === "pendiente" && role === "finca") {
    column = (
      <Column>
        <StyledButton onClick={handleClickOpen}>Editar</StyledButton>
        <FormDialogUpdate
          open={open}
          handleClose={handleClose}
          delivery={delivery}
        />
      </Column>
    );
  } else if (delivery.state === "Pendiente de retiro" && role === "finca") {
    column = (
      <Column>
        <StyledButton>Ver notificación de retiro</StyledButton>
      </Column>
    );
  } else if (delivery.state === "pendiente" && role === "acopio") {
    column = (
      <Column>
        <Div>
          <StyledButton onClick={handleStateAccepted}>
            Aceptar entrega
          </StyledButton>
          <StyledButton onClick={handleStateRejected}>
            Rechazar entrega
          </StyledButton>
        </Div>
      </Column>
    );
  } else if (delivery.state === "Pendiente de retiro" && role === "acopio") {
    column = (
      <Column>
        <StyledButton onClick={handleClickOpen}>
          Enviar notificación de retiro
        </StyledButton>
        <FormDialogNotification
          open={open}
          handleClose={handleClose}
          delivery={delivery}
        />
      </Column>
    );
  } else if (delivery.state === "Rechazada" && role === "acopio") {
    column = <Strong>Entrega rechazada</Strong>;
  }

  return (
    <>
      {role === "finca" ? (
        <Row>
          <Column>{delivery.created_at}</Column>
          <Column>{delivery.quantity}</Column>
          <Column>
            <Image
              src={"/" + delivery.image} // Route of the image file
              height={100} // Desired size with correct aspect ratio
              width={100} // Desired size with correct aspect ratio
              alt="Logo"
            />
          </Column>
          <Column>{delivery.delivery_manager}</Column>
          <Column>{delivery.state}</Column>
          {column}
        </Row>
      ) : (
        <Row>
          <Column>{delivery.created_at}</Column>
          <Column>{delivery.description}</Column>
          <Column>
            <Image
              src="/images/logo.svg" // Route of the image file
              height={25} // Desired size with correct aspect ratio
              width={25} // Desired size with correct aspect ratio
              alt="Logo"
            />
          </Column>
          <Column>{delivery.delivery_creator}</Column>
          <Column style={{ width: "200px" }}>direccion</Column>
          {column}
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

const Strong = styled.strong`
  color: #1b4332;
  text-align: center;
`;
