import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Link as MuiLink, TextField } from "@material-ui/core";
import styled from "styled-components";
import Layout from "@/components/Layout";
import Image from "next/image";
import Delivery from "@/api/delivery";
import withoutAuth from "@/hocs/withoutAuth";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Ingrese al menos 8 caracteres")
    .required("Ingrese una contraseña"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las claves no coinciden")
    .required("Confirme su contraseña"),
});

const ResetPassword = () => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [values, setValues] = React.useState({
    password: "",
    passwordConfirmation: "",
    showPassword: false,
    showPasswordConfirmation: false,
  });

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

  return (
    <Layout>
      <Container>
        <Div>
          <Title>Restablecer la contraseña</Title>
          <Image
            src="/images/bxs-notepad.svg"
            height={50}
            width={50}
            alt="Finca"
          />
        </Div>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledFormControl {...field}>
                  <InputLabel>Nueva contraseña</InputLabel>
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
                    label="Nueva contraseña"
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
                  <InputLabel>Vuelve a escribir la contraseña</InputLabel>
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
                    label="Vuelve a escribir la contraseña"
                  />
                </StyledFormControl>
              )}
            />
            <p>{errors.password_confirmation?.message}</p>
          </div>

          <StyledButton type="submit">Restablecer</StyledButton>
        </Form>
      </Container>
    </Layout>
  );
};

export default withoutAuth(ResetPassword);

const Container = styled.div`
  display: grid;
  grid-template-rows: 150px 25px 100px;
  justify-content: center;
  align-content: center;
  background: #74c69d;
  padding: 15px;
  width: 50%;
  margin: auto;
  height: 543px;
`;

const Div = styled.div`
  display: grid;
  grid-template-rows: 75px 75px;
  justify-content: center;
`;

const Form = styled.form`
  display: grid;
  grid-template-rows: 50px 50px;
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
  color: #000000;
  height: 40px;
  width: 200px;
  margin: auto;
`;

const StyledFormControl = styled(FormControl)`
  background: #ffffff;
  border-radius: 10px;
  color: #000000;
  width: 500px;
`;
