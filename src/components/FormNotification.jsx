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
  date: yup.string().max(200).required("La fecha es obligatoria"),
  hour: yup.string().required("La hora es obligatoria"),
});

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
        id,
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

  return (
    <Container>
      <Div>
        <Title>Notificación de retiro</Title>
        <Image
          src="/images/bxs-notepad.svg"
          height={50}
          width={50}
          alt="notepad"
        />
      </Div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Subtitle>
          Ingrese la fecha y la hora para el retiro de la entrega
        </Subtitle>
        <div>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <StyledTextField
                {...field}
                type="date"
                label=""
                variant="outlined"
                size="medium"
              />
            )}
          />
          <p>{errors.date?.message}</p>
        </div>

        <div>
          <Controller
            name="hour"
            control={control}
            render={({ field }) => (
              <StyledTextField
                type="time"
                {...field}
                label=""
                variant="outlined"
                size="medium"
              />
            )}
          />
          <p>{errors.hour?.message}</p>
        </div>

        <StyledButton type="submit">Enviar</StyledButton>
      </Form>
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

const Form = styled.form`
  display: grid;
  grid-template-rows: auto auto auto auto;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
  color: #1b4332;
`;

const Subtitle = styled.h4`
  text-align: center;
  color: #1b4332;
  margin: 0;
`;

const StyledButton = styled(Button)`
  background: #ffffff;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  margin: auto;
  color: #000000;
`;

const StyledTextField = styled(TextField)`
  background: #ffffff;
  border-radius: 10px;
  color: #000000;
  width: 100%;
`;
