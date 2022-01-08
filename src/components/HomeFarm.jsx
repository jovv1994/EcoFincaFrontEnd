import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FilterableDeliveryTable from "@/components/FilterableDeliveryTable";
import styled from "styled-components";
import Delivery from "@/api/delivery";

export default function HomeFarm(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Delivery.allPost();
        const data = response.data;
        setData(data);
        console.log("response", data);
      } catch (e) {
        console.log("e", e);
      }
    };

    getData();
  }, []);

  return (
    <Container>
      <FilterableDeliveryTable deliveries={data} role={props.role} />
      <Info>
        {" "}
        {/*----------------------CARD 1---------------------------*/}
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="/images/educacion.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Educación
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Conoce tips para manejar de mejor manera los desechos de tus
              agroquímicos
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <Hiper href="https://n9.cl/lkpy2" target="_blank">
                Aprender más
              </Hiper>
            </Button>
          </CardActions>
        </Card>
        {/*----------------------CARD 2---------------------------*/}
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="/images/concientizacion.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Concientización
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Informate sobre los reglamentos y leyes que rigen en tu gobierno
              para el cuidado ambiental
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <Hiper href="https://n9.cl/5xug1" target="_blank">
                Aprender más
              </Hiper>
            </Button>
          </CardActions>
        </Card>
        {/*----------------------CARD 3---------------------------*/}
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="/images/proteccion.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Protección
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Aprende maneras sustentables de cuidar tus fincas sin dañar el
              suelo y el medio ambiente
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <Hiper href="https://n9.cl/oivbo" target="_blank">
                Aprender más
              </Hiper>
            </Button>
          </CardActions>
        </Card>
      </Info>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  background: #74c69d;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  padding-bottom: 15px;
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: center;
  grid-column-gap: 75px;
  background: #74c69d;
  padding: 15px;
  width: 100%;
`;

const Hiper = styled.a`
  text-decoration: none;
`;
