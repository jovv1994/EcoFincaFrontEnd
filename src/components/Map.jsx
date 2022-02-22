import React from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import MapView from "@/components/MapView";

export default function Map({ delivery }) {
  return (
    <Container>
      <Title>Geolocalización para el retiro de la entrega</Title>
      <div>
        <MapView
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyALqs_HEevopOp6EK14pP3J22ZvOM_Fy38"
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          loadingElement={<div style={{ height: `100%` }} />}
          delivery={delivery}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  justify-content: center;
  background: #74c69d;
  padding: 15px;
  margin: auto;
`;

const Title = styled.h2`
  text-align: center;
  color: #1b4332;
`;

const StyledTypography = styled(Typography)`
  display: inline-block;
  color: #1b4332;
  font-size: 15px;
  margin-right: 10px;
  text-align: center;
`;
