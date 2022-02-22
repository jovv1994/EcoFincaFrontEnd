import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import Layout from "@/components/Layout";
import withoutAuth from "@/hocs/withoutAuth";
import User from "@/api/user";
import Image from "next/image";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingrese un correo válido")
    .required("El correo es obligatorio"),
});

const ForgotPassword = () => {
  const [send, setSend] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (value) => {
    console.log("Correo electrónico enviado:", value);

    const formData = new FormData();
    formData.append("email", value.email);

    await User.sendPasswordResetEmail(formData);

    setSend(true);
  };

  return (
    <Layout>
      {send ? (
        <ContainerTwo>
          <Title>
            Revisa tu bandeja de entrada para restablecer tu contraseña.
          </Title>
        </ContainerTwo>
      ) : (
        <Container>
          <Div>
            <Title>Recuperación de contraseña</Title>
            <Image
              src="/images/bxs-notepad.svg"
              height={50}
              width={50}
              alt="Finca"
            />
          </Div>

          <Subtitle>Ingresa el correo con el que te registraste</Subtitle>

          <Form onSubmit={handleSubmit(onSubmit)}>
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

            <StyledButton type="submit">Recuperar contraseña</StyledButton>
          </Form>
        </Container>
      )}
    </Layout>
  );
};

export default withoutAuth(ForgotPassword);

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

const ContainerTwo = styled.div`
  display: grid;
  grid-template-rows: auto;
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
  color: #000000;
  height: 40px;
  width: 200px;
  margin: auto;
`;

const StyledTextField = styled(TextField)`
  background: #ffffff;
  border-radius: 10px;
  color: #000000;
  width: 500px;
`;
