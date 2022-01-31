import React from "react";
import DeliveryRow from "@/components/DeliveryRow";
import styled from "styled-components";

export default function DeliveryTable({
  deliveries,
  filterText,
  inPending,
  role,
}) {
  const rows = [];

  if (role === "finca") {
    deliveries.forEach((delivery) => {
      if (delivery.delivery_manager.indexOf(filterText) === -1) {
        return;
      }
      if (inPending && !delivery.state === "Pendiente") {
        return;
      }
      rows.push(
        <DeliveryRow key={delivery.id} delivery={delivery} role={role} />
      );
    });
  } else {
    deliveries.forEach((delivery) => {
      if (delivery.delivery_creator.indexOf(filterText) === -1) {
        return;
      }
      if (inPending && !delivery.state === "Finalizada") {
        return;
      }
      rows.push(
        <DeliveryRow key={delivery.id} delivery={delivery} role={role} />
      );
    });
  }

  return (
    <Container>
      {role === "finca" ? (
        <Head>
          <Strong>FECHA</Strong>
          <Strong>NÚMERO DE ENVASES</Strong>
          <Strong>DESCRIPCIÓN</Strong>
          <Strong>CENTRO DE ACOPIO</Strong>
          <Strong>ESTADO DE LA ENTREGA</Strong>
          <Strong>OPCIONES</Strong>
        </Head>
      ) : (
        <Head>
          <Strong>FECHA</Strong>
          <Strong>DESCRIPCIÓN</Strong>
          <Strong>NÚMERO DE ENVASES</Strong>
          <Strong>FINCA</Strong>
          <Strong>UBICACIÓN</Strong>
          <Strong>OPCIONES DE RECOLECCIÓN</Strong>
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
  border-radius: 15px;
  padding: 5px;
  margin-top: 5px;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: 180px 180px 180px 180px 180px 180px;
  border: 2px solid white;
  border-radius: 15px;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const Strong = styled.strong`
  color: #1b4332;
  text-align: center;
`;
