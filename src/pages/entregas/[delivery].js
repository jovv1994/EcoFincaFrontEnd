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
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "@/components/Layout";
import Image from "next/image";
import Delivery from "@/api/delivery";
import withAuth from "@/hocs/withAuth";
import User from "@/api/user";

/*-------------------------Validacion de datos--------------------------*/
const schema = yup.object().shape({
  description: yup.string().max(200).required("La descripción es obligatoria"),
  quantity: yup.string().required("Ingrese la cantidad de botellas"),
  image: yup.mixed().required("La imagen es obligatoria"),
  address: yup.string().required("Ingrese la dirección para el retiro"),
  for_user_id: yup
    .string()
    .required("Debe elegir un centro de acopio para su entrega"),
});
/*-----------------------------------------------------------------------*/
const DeliveryPage = () => {
  /*Obtener el valor de la ruta dinamica*/
  const router = useRouter();
  const { type } = router.query;

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
    console.log("Datos enviados desde el formulario de entregas:", values);

    const formData = new FormData();
    formData.append("description", values.description);
    formData.append("quantity", values.quantity);
    formData.append("image", values.image[0]);
    formData.append("address", values.address);
    formData.append("for_user_id", values.for_user_id);

    const response = await Delivery.create(formData);

    console.log("Respuesta del servidor de la entrega creada:", response);
    reset();
  };

  /*-----------------Renderizado del componente----------------------*/
  return (
    <Layout>
      <Container>
        <Div>
          <Title>Formulario de entrega</Title>
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
              defaultValue=""
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
              defaultValue=""
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

          <div>
            <input type="file" id="image" name="image" {...register("image")} />
            <p>{errors.title?.message}</p>
          </div>

          <div>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="Ingrese su dirección exacta"
                  variant="outlined"
                  size="small"
                />
              )}
            />
            <p>{errors.address?.message}</p>
          </div>

          <div>
            <Controller
              name="for_user_id"
              control={control}
              defaultValue=""
              render={({ field: { ref, ...rest } }) => (
                <StyledTextField
                  {...rest}
                  select
                  label="Elige un centro de acopio"
                  inputRef={ref}
                >
                  {collectionCenters.length > 0 &&
                    collectionCenters.map((option) => (
                      <MenuItem
                        key={option.id}
                        value={option.id}
                        //onClick={() => setCantonId(option.id)}
                      >
                        {option.organization_type}
                      </MenuItem>
                    ))}
                </StyledTextField>
              )}
            />
            <p>{errors.for_user_id?.message}</p>
          </div>
          <Grid>
            <StyledButton type="submit">Publicar Entrega</StyledButton>
            <Link href="/home/finca">
              <StyledButton>Cancelar</StyledButton>
            </Link>
          </Grid>
        </form>
      </Container>
    </Layout>
  );
};

export default withAuth(DeliveryPage);

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  justify-content: center;
  background: #74c69d;
  padding: 15px;
  width: 50%;
  margin: auto;
  height: 520px;
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

const StyledTextField = styled(TextField)`
  background: #ffffff;
  border-radius: 10px;
  color: #000000;
  width: 100%;
`;

const StyledMuiLink = styled(MuiLink)`
  color: #000000;
`;
