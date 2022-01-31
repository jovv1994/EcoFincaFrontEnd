import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import FormDialogUpdate from "@/components/FormDialogUpdate";
import FormDialogNotification from "@/components/FormDialogNotification";
import FormDialogScore from "@/components/FormDialogScore";
import DialogNotification from "@/components/DialogNotification";
import Delivery from "@/api/delivery";
import StarIcon from "@mui/icons-material/Star";

export default function Options({
  delivery,
  role,
  stateDelivery,
  onStateDeliveryChange,
}) {
  const [open, setOpen] = useState(false);
  let column;
  let score;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStateDeliveryRetired = async () => {
    try {
      const response = await Delivery.updateAcopio(delivery.id, "Retirada");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    onStateDeliveryChange("Retirada");
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

  switch (delivery.score) {
    case "1":
      score = <StarIcon />;
      break;
    case "2":
      score = (
        <>
          <StarIcon />
          <StarIcon />
        </>
      );
      break;
    case "3":
      score = (
        <>
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </>
      );
      break;
    case "4":
      score = (
        <>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </>
      );
      break;
    case "5":
      score = (
        <>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </>
      );
      break;
    default:
      score = <Strong>Sin calificación</Strong>;
      break;
  }

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
        <StyledButton onClick={handleClickOpen}>
          Ver notificación de retiro
        </StyledButton>
        <DialogNotification
          open={open}
          handleClose={handleClose}
          delivery={delivery}
        />
      </>
    );
  } else if (stateDelivery === "Retirada" && role === "finca") {
    column = (
      <>
        <StyledButton onClick={handleClickOpen}>Calificar</StyledButton>
        <FormDialogScore
          open={open}
          handleClose={handleClose}
          delivery={delivery}
          onStateDeliveryChange={onStateDeliveryChange}
        />
      </>
    );
  } else if (stateDelivery === "Finalizada" && role === "finca") {
    column = <Strong>Calificación enviada</Strong>;
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
          onStateDeliveryChange={onStateDeliveryChange}
        />
      </>
    );
  } else if (stateDelivery === "Pendiente" && role === "acopio") {
    column = (
      <Div>
        <StyledButton onClick={handleClickOpen}>
          Enviar notificación de retiro
        </StyledButton>
        <FormDialogNotification
          open={open}
          handleClose={handleClose}
          delivery={delivery}
          onStateDeliveryChange={onStateDeliveryChange}
        />
        <StyledButton onClick={handleStateDeliveryRejected}>
          Rechazar entrega
        </StyledButton>
      </Div>
    );
  } else if (stateDelivery === "Pendiente de retiro" && role === "acopio") {
    column = (
      <StyledButton onClick={handleStateDeliveryRetired}>
        Marcar como entrega retirada
      </StyledButton>
    );
  } else if (stateDelivery === "Retirada" && role === "acopio") {
    column = <Strong>Calificación pendiente</Strong>;
  } else if (stateDelivery === "Finalizada" && role === "acopio") {
    column = score;
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
