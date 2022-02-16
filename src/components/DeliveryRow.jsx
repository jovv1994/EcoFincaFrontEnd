import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Options from "@/components/Options";

export default function DeliveryRow({ delivery, role }) {
  const [stateDelivery, setStateDelivery] = useState(delivery.state);

  const handleStateDeliveryChange = (stateDelivery) => {
    setStateDelivery(stateDelivery);
  };

  return (
    <>
      {role === "finca" ? (
        <Row>
          <Column>
            <strong>{delivery.created_at}</strong>
          </Column>
          <Column>
            <strong>{delivery.quantity}</strong>
          </Column>
          <Column>
            <strong>{delivery.description}</strong>
          </Column>
          <Column>
            <strong>{delivery.delivery_manager}</strong>
          </Column>
          <Column>
            <strong>{delivery.state}</strong>
          </Column>
          <Column>
            <Options
              delivery={delivery}
              role={role}
              stateDelivery={stateDelivery}
              onStateDeliveryChange={handleStateDeliveryChange}
            />
          </Column>
        </Row>
      ) : (
        <Row>
          <Column>
            <strong>{delivery.created_at}</strong>
          </Column>
          <Column>
            <strong>{delivery.description}</strong>
          </Column>
          <Column>
            <strong>{delivery.quantity}</strong>
          </Column>
          <Column>
            <strong>{delivery.delivery_creator}</strong>
          </Column>
          <Column>
            <strong>{delivery.address}</strong>
          </Column>
          <Column>
            <Options
              delivery={delivery}
              role={role}
              stateDelivery={stateDelivery}
              onStateDeliveryChange={handleStateDeliveryChange}
            />
          </Column>
        </Row>
      )}
    </>
  );
}

const Row = styled.tr`
  display: grid;
  grid-template-columns: 200px 200px 200px 200px 200px 200px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  padding-bottom: 15px;
  justify-content: space-between;
`;

const Column = styled.td`
  text-align: center;
  color: #1b4332;
`;
