import { Button, Link as MuiLink, TextField } from "@material-ui/core";
import Link from "next/link";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import withoutAuth from "../../hocs/withoutAuth";
import RoutesLogin from "@/constants/routes";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "@/components/Layout";
import Image from "next/image";

/*----------------------Validacion de datos---------------------------*/
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingrese un correo válido")
    .required("El correo es obligatorio"),
  password: yup.string().required("Ingrese su contraseña"),
});
/*--------------------------------------------------------------------*/

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
  const [errorsList, setErrorsList] = useState([]);
  const { login } = useAuth();
  const router = useRouter();
  const [roleUser, setRoleUser] = useState("");

  const onFinishLog = async (formData) => {
    try {
      const userData = {
        ...formData,
      };

      const response = await login(userData);
      console.log("response", response);
      setResult("User logged in");

      const roleQuery = response.data.userResource.role;
      console.log(roleQuery);

      reset();

      setRoleUser(roleQuery);
      // if (roleUser === "ROLE_FARM") {
      //   router.push("/home/finca");
      // }

      // if (roleUser === "ROLE_COLLECTION_CENTER") {
      //   router.push(RoutesLogin.HOME_ROLE_COLLECTION_CENTER);
      // }

      router.push(RoutesLogin.HOME);
    } catch (e) {
      console.log("e", e.response);
      const { response } = e;
      setResult("An error has occurred");

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
                <StyledTextField
                  {...field}
                  type="password"
                  label="Contraseña"
                  variant="outlined"
                  size="small"
                />
              )}
            />
            <p>{errors.password?.message}</p>
          </div>

          <Grid>
            <StyledButton type="submit">Iniciar sesión</StyledButton>
            <p>{result}</p>

            <Link href="/" passHref>
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
