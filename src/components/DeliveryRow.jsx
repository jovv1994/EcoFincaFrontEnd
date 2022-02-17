import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Options from "@/components/Options";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import MapView from "@/components/MapView";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
              <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
              >
                <AppBar sx={{ position: "relative" }}>
                  <Toolbar>
                    <IconButton
                      edge="end"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                <div>
                  <MapView />
                </div>
              </Dialog>
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
  font-size: 8px;
  margin: 2px;
`;
