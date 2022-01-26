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
import User from "@/api/user";

/*-------------------------Validacion de datos--------------------------*/
const schema = yup.object().shape({
  date: yup.string().max(200).required("La descripción es obligatoria"),
  hour: yup.string().required("Ingrese la cantidad de botellas"),
});
/*-----------------------------------------------------------------------*/
export default function FormNotification({ delivery }) {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
    register,
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
      const response = await Delivery.updateDeliveryNotification(
        id,
        date,
        hour
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }

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

      <form onSubmit={onSubmit}>
        <Input type="date" id="date" name="date" required />
        <Input
          type="time"
          id="hour"
          name="hour"
          min="09:00"
          max="16:00"
          required
        />
        <StyledButton type="submit">Enviar</StyledButton>
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
