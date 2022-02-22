import React, { useState } from "react";
import styled from "styled-components";
import Options from "@/components/Options";
import Button from "@material-ui/core/Button";
import DialogMap from "@/components/DialogMap";

export default function DeliveryRow({ delivery, role }) {
  const [stateDelivery, setStateDelivery] = useState(delivery.state);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <>
              <StyledButton onClick={handleClickOpen}>Ver mapa</StyledButton>
              <DialogMap
                open={open}
                handleClose={handleClose}
                delivery={delivery}
              />
            </>
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

const StyledButton = styled(Button)`
  background: #ffffff;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  color: #1b4332;
  font-size: 10px;
  margin: 2px;
`;
