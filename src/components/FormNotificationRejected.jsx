import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import Image from "next/image";
import Delivery from "@/api/delivery";

/*-------------------------Validacion de datos--------------------------*/
const schema = yup.object().shape({
  rejected: yup
    .string()
    .max(200)
    .required("Ingrese el comentario por el rechazo de la entrega"),
});
/*-----------------------------------------------------------------------*/
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
        delivery.id,
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
          alt="Finca"
        />
      </Div>

      <Subtitle>
        Por favor, deja una descripción del motivo por el cual la entrega es
        rechazada para informar al dueño de finca.
      </Subtitle>

      <form onSubmit={handleSubmit(onSubmit)}>
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
