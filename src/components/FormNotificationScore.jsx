import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import Image from "next/image";
import Delivery from "@/api/delivery";
import TextareaAutosize from "@mui/material/TextareaAutosize";

/*-------------------------Validacion de datos--------------------------*/
const schema = yup.object().shape({
  scorecomment: yup
    .string()
    .max(200)
    .required("Escriba el comentario por la calificación baja"),
});

export default function FormNotificationScore({
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
    const scorecomment = values.scorecomment;

    console.log(id);

    try {
      const responseUpdateNotificationScore =
        await Delivery.updateScoreCommentByFarm(id, scorecomment);
      const responseUpdateStateDelivery = await Delivery.updateStateByFarm(
        id,
        "Finalizada"
      );
      console.log(responseUpdateNotificationScore);
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
        <Title>Comentario de calificación</Title>
        <Image
          src="/images/bxs-star-half.svg"
          height={50}
          width={50}
          alt="star"
        />
      </Div>

      <Subtitle>
        Por favor, dejanos saber porque no merecemos las 5 estrellas.
      </Subtitle>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="scorecomment"
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
          <p>{errors.scorecomment?.message}</p>
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
