import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import Image from "next/image";
import Delivery from "@/api/delivery";
import TextareaAutosize from "@mui/material/TextareaAutosize";

/*-------------------------Validacion de datos--------------------------*/
const schema = yup.object().shape({
  rejected: yup
    .string()
    .max(200)
    .required("Ingrese el comentario por el rechazo de la entrega"),
});

export default function FormNotificationRejected({
  delivery,
  onStateDeliveryChange,
}) {
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
    const rejected = values.rejected;

    console.log(id);

    try {
      const responseUpdateNotificationRejected =
        await Delivery.updateRejectedByAcopio(id, rejected);
      const responseUpdateStateDelivery = await Delivery.updateAcopio(
        id,
        "Rechazada"
      );
      console.log(responseUpdateNotificationRejected);
      console.log(responseUpdateStateDelivery);
    } catch (error) {
      console.log(error);
    }

    onStateDeliveryChange("Rechazada");

    reset();
  };

  return (
    <Container>
      <Div>
        <Title>Descripción de recolección rechazada</Title>
        <Image
          src="/images/bxs-notepad.svg"
          height={50}
          width={50}
          alt="notepad"
        />
      </Div>

      <Subtitle>
        Por favor, deja una descripción del motivo por el cual la entrega es
        rechazada para informar al dueño de finca.
      </Subtitle>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="rejected"
            control={control}
            render={({ field }) => (
              <TextareaAutosize
                {...field}
                aria-label="minimum height"
                minRows={3}
                placeholder="Escriba su comentario..."
                style={{ width: 500 }}
              />
            )}
          />
          <p>{errors.rejected?.message}</p>
        </div>

        <StyledButton type="submit">Enviar</StyledButton>
      </Form>
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

const Div = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  justify-content: center;
`;

const Form = styled.form`
  display: grid;
  grid-template-rows: auto auto;
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
