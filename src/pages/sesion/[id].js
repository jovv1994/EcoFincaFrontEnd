import { Button, Link as MuiLink, TextField } from "@material-ui/core";
import Link from "next/link";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "@/components/Layout";
import Image from "next/image";
import Routes from "@/constants/routes";
import withoutAuth from "@/hocs/withoutAuth";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

/*----------------------Validación de datos---------------------------*/
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingrese un correo válido")
    .required("El correo es obligatorio"),
  password: yup.string().required("Ingrese su contraseña"),
});
/*-------------------------------Componente principal----------------------------------------*/
const LoginPage = () => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [result, setResult] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const [values, setValues] = useState({
    password: "",
    passwordConfirmation: "",
    showPassword: false,
    showPasswordConfirmation: false,
  });

  const onFinishLog = async (formData) => {
    console.log("Datos recibidos del formulario:", formData);
    try {
      const userData = {
        ...formData,
      };

      const response = await login(userData);
      console.log(
        "Datos devueltos después del inicio de sesión:",
        response.data
      );
      setResult("Inicio de sesión exitosa");
      const role = response.data.userResource.role;
      console.log(role);
      reset();
      {
        role === "ROLE_FARM"
          ? router.push(Routes.HOME_FARM)
          : router.push(Routes.HOME_COLLECTION_CENTER);
      }

      location.reload();
    } catch (e) {
      alert("El correo o la contraseña es incorrecto");
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Layout>
      <Container>
        <Image
          src="/images/bxs-user-circle.svg" // Route of the image file
          height={100} // Desired size with correct aspect ratio
          width={100} // Desired size with correct aspect ratio
          alt="Finca"
        />
        <form onSubmit={handleSubmit(onFinishLog)}>
          <div>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  type="email"
                  label="Correo"
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

          <Grid>
            <StyledButton type="submit">Iniciar sesión</StyledButton>

            <Link href="/forgotpassword" passHref>
              <Hiper style={{ textAlign: "center" }}>
                ¿Olvidaste tu contraseña?
              </Hiper>
            </Link>

            <p style={{ textAlign: "center" }}>¿No tienes una cuenta? </p>
            <div>
              <Link href="/registro/finca" passHref>
                <StyledMuiLink>Registrarme como dueño de finca </StyledMuiLink>
              </Link>
              <span>o</span>
              <Link href="/registro/acopio" passHref>
                <StyledMuiLink>Registrarme como centro de acopio</StyledMuiLink>
              </Link>
            </div>
          </Grid>
        </form>
      </Container>
    </Layout>
  );
};

export default withoutAuth(LoginPage);
/*------------------------Estilos con Styled Component------------------*/
const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  justify-content: center;
  background: #74c69d;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 84.5px;
  padding-bottom: 84.5px;
  width: 50%;
  margin: auto;
  height: 543px;
`;

const StyledMuiLink = styled(MuiLink)`
  color: #1b4332;
  width: 50%;
  text-decoration: underline;
  margin: 10px;
`;

const StyledButton = styled(Button)`
  background: #ffffff;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  color: #000000;
  width: 150px;
  margin: auto;
`;

const StyledTextField = styled(TextField)`
  background: #ffffff;
  border-radius: 10px;
  color: #000000;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: auto auto auto auto;
  justify-content: center;
`;

const Hiper = styled.a`
  color: #1b4332;
`;

const StyledFormControl = styled(FormControl)`
  background: #ffffff;
  border-radius: 10px;
  color: #000000;
  width: 100%;
`;
