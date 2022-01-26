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
          <Column>{delivery.created_at}</Column>
          <Column>{delivery.quantity}</Column>
          <Column>
            <Image
              src={"/" + delivery.image}
              height={100} // Desired size with correct aspect ratio
              width={100} // Desired size with correct aspect ratio
              alt="Logo"
            />
          </Column>
          <Column>{delivery.delivery_manager}</Column>
          <Column>{delivery.state}</Column>
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
          <Column>{delivery.created_at}</Column>
          <Column>{delivery.description}</Column>
          <Column>
            <Image
              src="/images/logo.svg"
              height={25} // Desired size with correct aspect ratio
              width={25} // Desired size with correct aspect ratio
              alt="Logo"
            />
          </Column>
          <Column>{delivery.delivery_creator}</Column>
          <Column>{delivery.address}</Column>
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
`;
