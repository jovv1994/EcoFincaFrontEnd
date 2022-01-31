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
  score: yup
    .string()
    .max(200)
    .required("Por favor ingrese una calificación de la recolección"),
});
/*-----------------------------------------------------------------------*/
export default function FormScore({ delivery, onStateDeliveryChange }) {
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
    const score = values.score;

    console.log(id);

    try {
      const responseUpdateScoreDelivery = await Delivery.updateDeliveryScore(
        id,
        score
      );
      const responseUpdateStateDelivery = await Delivery.updateStateByFarm(
        delivery.id,
        "Finalizada"
      );
      console.log(responseUpdateScoreDelivery);
      console.log(responseUpdateStateDelivery);
    } catch (error) {
      console.log(error);
    }

    onStateDeliveryChange("Finalizada");

    reset();
  };

  return (
    <Container>
      <Div>
        <Title>Calificación del centro de acopio</Title>
        <Image
          src="/images/bxs-notepad.svg"
          height={50}
          width={50}
          alt="Finca"
        />
      </Div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="score"
            control={control}
            render={({ field }) => (
              <StyledTextField
                {...field}
                label="Ingrese una calificación del 1 al 5"
                variant="outlined"
                size="small"
              />
            )}
          />
          <p>{errors.score?.message}</p>
        </div>

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

const StyledTextField = styled(TextField)`
  background: #ffffff;
  border-radius: 10px;
  color: #000000;
  width: 100%;
`;
