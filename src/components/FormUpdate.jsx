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
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

/*-------------------------Validacion de datos--------------------------*/
const schema = yup.object().shape({
  description: yup.string().max(200).required("La descripción es obligatoria"),
  quantity: yup.string().required("Ingrese la cantidad de botellas"),
  //image: yup.mixed().required("La imagen es obligatoria"),
  for_user_id: yup
    .string()
    .required("Debe elegir un centro de acopio para su entrega"),
});
var longitude, latitude;
/*-----------------------------------------------------------------------*/
export default function FormUpdate({ delivery }) {
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
  const [send, setSend] = useState("Enviar ubicación para el retiro de la entrega");

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

    const id = delivery.id;
    const description = values.description;
    const quantity = values.quantity;
    const for_user_id = values.for_user_id;
    const longitude = delivery.longitude;
    const latitude = delivery.latitude;

    console.log(id);
    console.log(longitude);
    console.log(latitude);

    try {
      const response = await Delivery.updateDelivery(
        id,
        description,
        quantity,
        for_user_id,
        longitude,
        latitude
      );
      const responseUpdateStateDelivery = await Delivery.updateStateByFarm(
        delivery.id,
        "Pendiente"
      );
    } catch (error) {
      console.log(error);
    }

    location.reload();

    reset();
  };

  const getLocation = () => {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function setPosition(position){
      longitude = position.coords.longitude;
      console.log(longitude);
      latitude = position.coords.latitude;
      console.log(latitude);
      setSend("Ubicación enviada")
    });
    } else { 
      alert("La geolocalización no es soportada en este navegador.");
      }
  };

  /*-----------------Renderizado del componente----------------------*/
  return (
    <Container>
      <Div>
        <Title>Actualización de entrega</Title>
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
            name="description"
            control={control}
            defaultValue={delivery.description}
            render={({ field }) => (
              <StyledTextField
                {...field}
                label="Descripción de la entrega"
                variant="outlined"
                size="small"
              />
            )}
          />
          <p>{errors.description?.message}</p>
        </div>

        <div>
          <Controller
            name="quantity"
            control={control}
            defaultValue={delivery.quantity}
            render={({ field }) => (
              <StyledTextField
                {...field}
                label="Número de botellas"
                variant="outlined"
                size="small"
              />
            )}
          />
          <p>{errors.quantity?.message}</p>
        </div>

        {/*<div>
          <input type="file" id="image" name="image" {...register("image")} />
          <p>{errors.title?.message}</p>
        </div>*/}

        {/*<div>
          <Controller
            name="address"
            control={control}
            defaultValue={delivery.address}
            render={({ field }) => (
              <StyledTextField
                {...field}
                label="Ingrese su dirección exacta"
                variant="outlined"
                size="small"
              />
            )}
          />
          <p>{errors.quantity?.message}</p>
        </div>*/}

        <div>
          <Controller
            name="for_user_id"
            control={control}
            defaultValue={delivery.for_user_id}
            render={({ field: { ref, ...rest } }) => (
              <StyledTextField
                {...rest}
                select
                label="Elige un centro de acopio"
                inputRef={ref}
              >
                {collectionCenters.length > 0 &&
                  collectionCenters.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.organization_type}
                    </MenuItem>
                  ))}
              </StyledTextField>
            )}
          />
          <p>{errors.for_user_id?.message}</p>
        </div>
        <StyledLocationButton 
          onClick={getLocation} 
          endIcon={<AddLocationAltIcon />}
          >{send}</StyledLocationButton>
        <Grid>
          <StyledButton type="submit">Actualizar Entrega</StyledButton>
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
  width: 50%;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-around;
`;

const StyledButton = styled(Button)`
  background: #ffffff;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  color: #000000;
`;

const StyledLocationButton = styled(Button)`
  background: #ffffff;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  color: #000000;
  width: 100%;
  margin-bottom: 10px;
`;

const StyledTextField = styled(TextField)`
  background: #ffffff;
  border-radius: 10px;
  color: #000000;
  width: 100%;
`;
