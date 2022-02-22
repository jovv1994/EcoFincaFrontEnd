import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
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
import { useAuth } from "@/contexts/auth";
import Routes from "@/constants/routes";
import Image from "next/image";
import withoutAuth from "@/hocs/withoutAuth";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
/*-------------------------Validación de datos--------------------------*/
const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  lastname: yup.string().required("El apellido es obligatorio"),
  email: yup
    .string()
    .email("Ingrese un correo válido")
    .required("El correo es obligatorio"),
  password: yup
    .string()
    .min(8, "Ingrese al menos 8 caracteres")
    .required("Ingrese una contraseña"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las claves no coinciden")
    .required("Confirme su contraseña"),
  organization_type: yup.string().required("Ingrese el nombre de su finca"),
  description: yup
    .string()
    .max(200)
    .required("Una breve descripción de sus productos"),
});
/*-------------------------------Componente principal----------------------------------------*/
const RegisterPage = () => {
  const router = useRouter();
  const { type } = router.query; //Obtener el valor de la ruta dinámica
  const [values, setValues] = React.useState({
    password: "",
    passwordConfirmation: "",
    showPassword: false,
    showPasswordConfirmation: false,
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [result, setResult] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const { register } = useAuth();

  const onSubmit = async (formData) => {
    setUserInfo(null);
    setResult("Enviando los datos...");
    console.log("Datos recibidos del formulario:", formData);
    try {
      const userData = {
        ...formData,
        role: type === "finca" ? "ROLE_FARM" : "ROLE_COLLECTION_CENTER",
      };

      const response = await register(userData);
      console.log("Datos devueltos después del registro:", response.data);
      setUserInfo(response.data);

      setResult("Usuario registrado correctamente");
      reset();
      {
        type === "finca"
          ? router.push(Routes.HOME_FARM)
          : router.push(Routes.HOME_COLLECTION_CENTER);
      }
    } catch (e) {
      console.log("e", e.response);
      const { response } = e;
      setResult("Ocurrió un error :(");

      if (response) {
        if (response.data.errors) {
          const errors = response.data.errors;
          // const errorList = Object.values(errors);
          const newErrorList = [];

          for (let field in errors) {
            newErrorList.push(...errors[field]);
          }
          console.log("errorList", newErrorList);

          setErrorsList(newErrorList);
        }
      }
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowPasswordConfirmation = () => {
    setValues({
      ...values,
      showPasswordConfirmation: !values.showPasswordConfirmation,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPasswordConfirmation = (event) => {
    event.preventDefault();
  };
  /*-----------------Renderizado del componente----------------------*/
  return (
    <Layout>
      <Container>
        {type === "finca" ? (
          <Div>
            <Title>Registro dueño de finca</Title>
            <Image
              src="/images/bxs-spa.svg" // Route of the image file
              height={50} // Desired size with correct aspect ratio
              width={50} // Desired size with correct aspect ratio
              alt="Finca"
            />
          </Div>
        ) : (
          <Div>
            <Title>Registro centro de acopio</Title>
            <Image
              src="/images/bxs-building-house.svg" // Route of the image file
              height={50} // Desired size with correct aspect ratio
              width={50} // Desired size with correct aspect ratio
              alt="Centro de Acopio"
            />
          </Div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="Nombre"
                  variant="outlined"
                  size="small"
                />
              )}
            />
            <p>{errors.name?.message}</p>
          </div>
          <div>
            <Controller
              name="lastname"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="Apellido"
                  variant="outlined"
                  size="small"
                />
              )}
            />
            <p>{errors.lastname?.message}</p>
          </div>
          <div>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  type="email"
                  label="Correo electrónico"
                  variant="outlined"
                  size="small"
                />
              )}
            />
            <p>{errors.email?.message}</p>
          </div>

          <div>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledFormControl {...field}>
                  <InputLabel>Contraseña</InputLabel>
                  <OutlinedInput
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    size="small"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Contraseña"
                  />
                </StyledFormControl>
              )}
            />
            <p>{errors.password?.message}</p>
          </div>

          <div>
            <Controller
              name="password_confirmation"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledFormControl {...field}>
                  <InputLabel>Confirmar contraseña</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPasswordConfirmation ? "text" : "password"}
                    value={values.passwordConfirmation}
                    onChange={handleChange("passwordConfirmation")}
                    size="small"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordConfirmation}
                          onMouseDown={handleMouseDownPasswordConfirmation}
                          edge="end"
                        >
                          {values.showPasswordConfirmation ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Contraseña"
                  />
                </StyledFormControl>
              )}
            />
            <p>{errors.password_confirmation?.message}</p>
          </div>

          <div>
            <div>
              <Controller
                name="organization_type"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    label={
                      type === "finca"
                        ? "Nombre de la finca"
                        : "Nombre del centro de acopio"
                    }
                    variant="outlined"
                    size="small"
                  />
                )}
              />
              <p>{errors.organization_type?.message}</p>
            </div>
            <div>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    multiline
                    maxRows={6}
                    label={
                      type === "finca"
                        ? "Describe brevemente a tu finca"
                        : "Describe brevemente a tu organización"
                    }
                    variant="outlined"
                    size="small"
                  />
                )}
              />
              <p>{errors.description?.message}</p>
            </div>
          </div>
          <p>{result}</p>
          {userInfo && (
            <div>
              <div>Nombre: {userInfo.name}</div>
              <div>Token: {userInfo.token}</div>
            </div>
          )}

          {errorsList.length > 0 && (
            <ul>
              {errorsList.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
          <Grid>
            <StyledButton type="submit">Registrarme</StyledButton>
            <div>
              <p>
                ¿Ya tienes una cuenta?{" "}
                <Link href="/sesion/login" passHref>
                  <StyledMuiLink>Iniciar sesión</StyledMuiLink>
                </Link>
              </p>
            </div>
          </Grid>
        </form>
      </Container>
    </Layout>
  );
};
export default withoutAuth(RegisterPage);
/*------------------------Estilos con Styled Component------------------*/
const Container = styled.div`
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
  grid-template-rows: auto auto;
  justify-content: center;
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

const StyledFormControl = styled(FormControl)`
  background: #ffffff;
  border-radius: 10px;
  color: #000000;
  width: 100%;
`;

const StyledMuiLink = styled(MuiLink)`
  color: #000000;
`;
