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
import Provincia from "@/api/provincias";
import Canton from "@/api/cantones";
import User from "@/api/user";

/*-------------------------Validacion de datos--------------------------*/
const schema = yup.object().shape({
  description: yup.string().max(200).required("La descripción es obligatoria"),
  quantity: yup.string().required("Ingrese la cantidad de botellas"),
  image: yup.mixed().required("La imagen es obligatoria"),
  provincia: yup.string().required("Elija la provincia"),
  canton: yup.string().required("Elija el cantón"),
  parroquia: yup.string().required("Elija la parroquia"),
  for_user_id: yup
    .string()
    .required("Debe elegir un centro de acopio para su entrega"),
});
/*-----------------------------------------------------------------------*/

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

  const [provincias, setProvincias] = useState([]);
  const [provinciaId, setProvinciaId] = useState("");
  const [cantones, setCantones] = useState([]);
  const [cantonId, setCantonId] = useState("");
  const [parroquias, setParroquias] = useState([]);
  const [collectionCenters, setCollectionCenters] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Provincia.all();
        const anotherResponse = await User.getCollectionCenters();
        console.log("response", response.data);
        setProvincias(response.data);
        setCollectionCenters(anotherResponse.data);
      } catch (e) {
        console.log("e", e);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Provincia.cantones(provinciaId);
        console.log("CANTONES DE PROVINCIA " + provinciaId, response.data);
        setCantones(response.data);
      } catch (e) {
        console.log("E", e);
      }
    };

    getData();
  }, [provinciaId]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Canton.parroquias(cantonId);
        console.log("PARROQUIAS DE CANTON" + cantonId, response.data);
        setParroquias(response.data);
      } catch (e) {
        console.log("e", e);
      }
    };

    getData();
  }, [cantonId]);

  const onSubmit = async (values) => {
    console.log("values", values);

    const formData = new FormData();
    formData.append("description", values.description);
    formData.append("quantity", values.quantity);
    formData.append("image", values.image[0]);
    formData.append("provincia", values.provincia);
    formData.append("canton", values.canton);
    formData.append("parroquia", values.parroquia);
    formData.append("for_user_id", values.for_user_id);

    const response = await Delivery.create(formData);

    console.log("response", response);
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
              name="provincia"
              control={control}
              defaultValue=""
              render={({ field: { ref, ...rest } }) => (
                <StyledTextField
                  {...rest}
                  select
                  label="Selecciona tu Provincia"
                  inputRef={ref}
                >
                  {provincias.length > 0 &&
                    provincias.map((option) => (
                      <MenuItem
                        key={option.id}
                        value={option.name}
                        onClick={() => setProvinciaId(option.id)}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                </StyledTextField>
              )}
            />
            <p>{errors.provincia?.message}</p>
          </div>
          <div>
            <Controller
              name="canton"
              control={control}
              defaultValue=""
              render={({ field: { ref, ...rest } }) => (
                <StyledTextField
                  {...rest}
                  select
                  label="Selecciona tu Cantón"
                  inputRef={ref}
                >
                  {cantones.length > 0 &&
                    cantones.map((option) => (
                      <MenuItem
                        key={option.id}
                        value={option.name}
                        onClick={() => setCantonId(option.id)}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                </StyledTextField>
              )}
            />
            <p>{errors.canton?.message}</p>
          </div>
          <div>
            <Controller
              name="parroquia"
              control={control}
              defaultValue=""
              render={({ field: { ref, ...rest } }) => (
                <StyledTextField
                  {...rest}
                  select
                  label="Selecciona tu Parroquia"
                  inputRef={ref}
                >
                  {parroquias.length > 0 &&
                    parroquias.map((option) => (
                      <MenuItem
                        key={option.id}
                        value={option.name}
                        //onClick={() => setCantonId(option.id)}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                </StyledTextField>
              )}
            />
            <p>{errors.parroquia?.message}</p>
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
