import React from "react";
import DeliveryRow from "@/components/DeliveryRow";
import styled from "styled-components";

export default function DeliveryTable(props) {
  const filterText = props.filterText;
  const inPending = props.inPending;

  const rows = [];

  if (props.role === "finca") {
    props.deliveries.forEach((delivery) => {
      if (delivery.delivery_manager.indexOf(filterText) === -1) {
        return;
      }
      if (inPending && !delivery.state === "pendiente") {
        return;
      }
      rows.push(
        <DeliveryRow delivery={delivery} key={delivery.id} role={props.role} />
      );
    });
  } else {
    props.deliveries.forEach((delivery) => {
      if (delivery.delivery_creator.indexOf(filterText) === -1) {
        return;
      }
      if (inPending && !delivery.state === "pendiente") {
        return;
      }
      rows.push(
        <DeliveryRow delivery={delivery} key={delivery.id} role={props.role} />
      );
    });
  }

  return (
    <Container>
      {props.role === "finca" ? (
        <Head>
          <Strong>Fecha</Strong>
          <Strong>Número de envases</Strong>
          <Strong>Centro de acopio</Strong>
          <Strong>Estado de la entrega</Strong>
          <Strong>Opciones</Strong>
        </Head>
      ) : (
        <Head>
          <Strong>Fecha</Strong>
          <Strong>Descripción</Strong>
          <Strong>Finca</Strong>
          <Strong>Ubicación</Strong>
          <Strong>Opciones de recolección</Strong>
        </Head>
      )}
      <Table>{rows}</Table>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  padding-bottom: 15px;
`;

const Table = styled.table`
  background: #74c69d;
  border: 2px solid white;
  border-radius: 5px;
  padding: 5px;
  margin-top: 5px;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  border: 2px solid white;
  border-radius: 5px;
  justify-content: space-evenly;
`;

const Strong = styled.strong`
  color: #1b4332;
`;
