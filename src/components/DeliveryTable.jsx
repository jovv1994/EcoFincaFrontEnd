import React from "react";
import DeliveryRow from "@/components/DeliveryRow";
import styled from "styled-components";

export default function DeliveryTable(props) {
  const filterText = props.filterText;
  const inPending = props.inPending;

  const rows = [];

  props.deliveries.forEach((delivery) => {
    if (delivery.delivery_manager.indexOf(filterText) === -1) {
      return;
    }
    if (inPending && !delivery.state === "pendiente") {
      return;
    }
    rows.push(<DeliveryRow delivery={delivery} key={delivery.id} />);
  });

  return (
    <Table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Número de envases</th>
          <th>Centro de acopio</th>
          <th>Estado de la entrega</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

const Table = styled.table`
  border: 5px solid #40916c;
  background: white;
`;
