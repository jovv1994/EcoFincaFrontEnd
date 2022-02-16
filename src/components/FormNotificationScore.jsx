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
  scorecomment: yup
    .string()
    .max(200)
    .required("Escriba el comentario por la calificación baja"),
});
/*-----------------------------------------------------------------------*/
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
      const responseUpdateStateDelivery = await Delivery.updateAcopio(
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
          alt="Finca"
        />
      </Div>

      <Subtitle>
        Por favor, dejanos saber porque no merecemos las 5 estrellas.
      </Subtitle>

      <form onSubmit={handleSubmit(onSubmit)}>
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
          <p>{errors.description?.message}</p>
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
