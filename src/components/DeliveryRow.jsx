import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

export default function DeliveryRow(props) {
  const delivery = props.delivery;

  return (
    <>
      {props.role === "finca" ? (
        <Row>
          <td>{delivery.created_at}</td>
          <td>{delivery.quantity}</td>
          <td>{delivery.delivery_manager}</td>
          <td>{delivery.state}</td>
          <td>
            {
              <>
                <StyledButton>Editar</StyledButton>
                <StyledButton>Eliminar</StyledButton>
              </>
            }
          </td>
        </Row>
      ) : (
        <Row>
          <td>{delivery.created_at}</td>
          <td>{delivery.description}</td>
          <td>{delivery.delivery_creator}</td>
          <td>{delivery.image}</td>
          <td>{<StyledButton>Aceptar entrega</StyledButton>}</td>
        </Row>
      )}
    </>
  );
}

const Row = styled.tr`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  padding-bottom: 15px;
  justify-content: space-evenly;
`;

const StyledButton = styled(Button)`
  background: #ffffff;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  color: #1b4332;
  font-size: 8px;
  margin: 2px;
`;
