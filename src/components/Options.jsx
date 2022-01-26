import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import FormDialogUpdate from "@/components/FormDialogUpdate";
import FormDialogNotification from "@/components/FormDialogNotification";
import Delivery from "@/api/delivery";

export default function Options({
  delivery,
  role,
  stateDelivery,
  onStateDeliveryChange,
}) {
  const [open, setOpen] = useState(false);
  let column;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStateDeliveryAcepted = async () => {
    try {
      const response = await Delivery.updateAcopio(
        delivery.id,
        "Pendiente de retiro"
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    onStateDeliveryChange("Pendiente de retiro");
  };

  const handleStateDeliveryRejected = async () => {
    try {
      const response = await Delivery.updateAcopio(delivery.id, "Rechazada");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    onStateDeliveryChange("Rechazada");
  };

  if (stateDelivery === "Pendiente" && role === "finca") {
    column = (
      <>
        <StyledButton onClick={handleClickOpen}>Editar</StyledButton>
        <FormDialogUpdate
          open={open}
          handleClose={handleClose}
          delivery={delivery}
        />
      </>
    );
  } else if (stateDelivery === "Pendiente de retiro" && role === "finca") {
    column = (
      <>
        <StyledButton>Ver notificación de retiro</StyledButton>
      </>
    );
  } else if (stateDelivery === "Rechazada" && role === "finca") {
    column = (
      <>
        <StyledButton onClick={handleClickOpen}>
          Elegir otro centro de acopio
        </StyledButton>
        <FormDialogUpdate
          open={open}
          handleClose={handleClose}
          delivery={delivery}
        />
      </>
    );
  } else if (stateDelivery === "Pendiente" && role === "acopio") {
    column = (
      <>
        <Div>
          <StyledButton onClick={handleStateDeliveryAcepted}>
            Aceptar entrega
          </StyledButton>
          <StyledButton onClick={handleStateDeliveryRejected}>
            Rechazar entrega
          </StyledButton>
        </Div>
      </>
    );
  } else if (stateDelivery === "Pendiente de retiro" && role === "acopio") {
    column = (
      <>
        <StyledButton onClick={handleClickOpen}>
          Enviar notificación de retiro
        </StyledButton>
        <FormDialogNotification
          open={open}
          handleClose={handleClose}
          delivery={delivery}
        />
      </>
    );
  } else if (stateDelivery === "Rechazada" && role === "acopio") {
    column = <Strong>Entrega rechazada</Strong>;
  }
  return <>{column}</>;
}

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
