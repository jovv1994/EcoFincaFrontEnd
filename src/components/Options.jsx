import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import FormDialogUpdate from "@/components/FormDialogUpdate";
import FormDialogNotification from "@/components/FormDialogNotification";
import DialogNotification from "@/components/DialogNotification";
import Delivery from "@/api/delivery";
import Rating from "@mui/material/Rating";
import DialogNotificationRejected from "@/components/DialogNotificationRejected";
import FormDialogNotificationRejected from "@/components/FormDialogNotificationRejected";
import FormDialogNotificationScore from "@/components/FormDialogNotificationScore";
import DialogNotificationScore from "@/components/DialogNotificationScore";

export default function Options({
  delivery,
  role,
  stateDelivery,
  onStateDeliveryChange,
}) {
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openRejected, setOpenRejected] = useState(false);
  const [value, setValue] = useState(3);
  let column;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenNotification = () => {
    setOpenNotification(true);
  };

  const handleCloseNotification = () => {
    setOpenNotification(false);
  };

  const handleClickOpenRejected = () => {
    setOpenRejected(true);
  };

  const handleCloseRejected = () => {
    setOpenRejected(false);
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

  const onSubmit = async (score) => {
    const id = delivery.id;
    console.log(id, score);

    try {
      const responseUpdateScoreDelivery = await Delivery.updateDeliveryScore(
        id,
        score
      );
      const responseUpdateStateDelivery = await Delivery.updateStateByFarm(
        id,
        "Finalizada"
      );
      console.log(responseUpdateScoreDelivery);
      console.log(responseUpdateStateDelivery);
    } catch (error) {
      console.log(error);
    }
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
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            if (newValue < 5) {
              setOpen(true);
              console.log("Valor de la calificación: ", newValue);
            } else {
              onStateDeliveryChange("Finalizada");
              onSubmit(newValue);
            }
          }}
        />
        <FormDialogNotificationScore
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
        <StyledButton onClick={handleClickOpenRejected}>
          Ver motivo de rechazo
        </StyledButton>
        <DialogNotificationRejected
          open={openRejected}
          handleClose={handleCloseRejected}
          delivery={delivery}
          onStateDeliveryChange={onStateDeliveryChange}
        />
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
        <StyledButton onClick={handleClickOpenNotification}>
          Enviar notificación de retiro
        </StyledButton>
        <FormDialogNotification
          open={openNotification}
          handleClose={handleCloseNotification}
          delivery={delivery}
          onStateDeliveryChange={onStateDeliveryChange}
        />
        <StyledButton onClick={handleClickOpen}>Rechazar entrega</StyledButton>
        <FormDialogNotificationRejected
          open={open}
          handleClose={handleClose}
          delivery={delivery}
          onStateDeliveryChange={onStateDeliveryChange}
        />
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
    if (delivery.score < 5) {
      column = (
        <>
          <StyledButton onClick={handleClickOpen}>
            Ver comentario de la calificación
          </StyledButton>
          <DialogNotificationScore
            open={open}
            handleClose={handleClose}
            delivery={delivery}
            onStateDeliveryChange={onStateDeliveryChange}
          />
          <Rating name="read-only" value={delivery.score} readOnly />
        </>
      );
    } else {
      column = <Rating name="read-only" value={delivery.score} readOnly />;
    }
  } else if (stateDelivery === "Rechazada" && role === "acopio") {
    column = <Strong>Entrega rechazada y comentario enviado</Strong>;
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
