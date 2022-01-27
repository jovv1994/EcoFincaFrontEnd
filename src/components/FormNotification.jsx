import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Link as MuiLink,
  TextField,
  MenuItem,
} from "@material-ui/core";
import styled from "styled-components";
import Image from "next/image";
import Delivery from "@/api/delivery";

/*-------------------------Validacion de datos--------------------------*/
const schema = yup.object().shape({
  date: yup.string().max(200).required("La descripción es obligatoria"),
  hour: yup.string().required("Ingrese la cantidad de botellas"),
});
/*-----------------------------------------------------------------------*/
export default function FormNotification({ delivery, onStateDeliveryChange }) {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    console.log("values", values);

    const id = delivery.id;
    const date = values.date;
    const hour = values.hour;

    console.log(id);

    try {
      const responseUpdateNotificationDelivery =
        await Delivery.updateDeliveryNotification(id, date, hour);
      const responseUpdateStateDelivery = await Delivery.updateAcopio(
        delivery.id,
        "Pendiente de retiro"
      );
      console.log(responseUpdateNotificationDelivery);
      console.log(responseUpdateStateDelivery);
    } catch (error) {
      console.log(error);
    }

    onStateDeliveryChange("Pendiente de retiro");

    reset();
  };

  /*-----------------Renderizado del componente----------------------*/
  return (
    <Container>
      <Div>
        <Title>Notificación de retiro</Title>
        <Image
          src="/images/bxs-notepad.svg" // Route of the image file
          height={50} // Desired size with correct aspect ratio
          width={50} // Desired size with correct aspect ratio
          alt="Finca"
        />
      </Div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            type="date"
            name="date"
            control={control}
            defaultValue="día/mes/año"
            render={({ field }) => (
              <StyledTextField
                {...field}
                label="Ingrese la fecha para el retiro de la entrega"
                variant="outlined"
                size="small"
              />
            )}
          />
          <p>{errors.description?.message}</p>
        </div>

        <div>
          <Controller
            type="time"
            name="hour"
            control={control}
            defaultValue="24:00"
            render={({ field }) => (
              <StyledTextField
                {...field}
                label="Ingrese la hora para el retiro de la entrega"
                variant="outlined"
                size="small"
              />
            )}
          />
          <p>{errors.quantity?.message}</p>
        </div>

        <Grid>
          <StyledButton type="submit">Enviar</StyledButton>
        </Grid>
      </form>
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

const Div = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
  color: #1b4332;
`;

const StyledButton = styled(Button)`
  background: #ffffff;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  margin: auto;
  color: #000000;
`;

const Input = styled.input`
  background: #ffffff;
  border-radius: 10px;
  color: #000000;
  width: 100%;
  margin: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-around;
`;

const StyledTextField = styled(TextField)`
  background: #ffffff;
  border-radius: 10px;
  color: #000000;
  width: 100%;
`;
