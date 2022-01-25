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
  description: yup.string().max(200).required("La descripción es obligatoria"),
  quantity: yup.string().required("Ingrese la cantidad de botellas"),
  image: yup.mixed().required("La imagen es obligatoria"),
  for_user_id: yup
    .string()
    .required("Debe elegir un centro de acopio para su entrega"),
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

  const [collectionCenters, setCollectionCenters] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const anotherResponse = await User.getCollectionCenters();
        setCollectionCenters(anotherResponse.data);
      } catch (e) {
        console.log("e", e);
      }
    };

    getData();
  }, []);

  const onSubmit = async (values) => {
    console.log("values", values);

    const formData = new FormData();
    formData.append("description", values.description);
    formData.append("quantity", values.quantity);
    formData.append("image", values.image[0]);
    formData.append("for_user_id", values.for_user_id);

    try {
      const response = await Delivery.updateDelivery(delivery.id, formData);
    } catch (error) {
      console.log(error);
    }

    //console.log("response", response);
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
        <Input
          type="time"
          id="hora"
          name="hora"
          min="09:00"
          max="16:00"
          required
        />
        <Input type="date" id="fecha" name="fecha" required />

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
