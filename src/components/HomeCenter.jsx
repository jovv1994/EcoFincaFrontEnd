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

export default function HomeCenter(props) {
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
            image="/images/prevencion.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Prevención
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Aprende formas corectas de limpiar y almacenar los envases
              quimicos recolectados
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <Hiper href="https://n9.cl/8fg13" target="_blank">
                Aprender más
              </Hiper>
            </Button>
          </CardActions>
        </Card>
        {/*----------------------CARD 2--------------------------*/}
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="/images/gestion.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Gestión
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Aspectos para iniciar el camino de una logística verde que
              deberías tomar en cuenta.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <Hiper href="https://n9.cl/vktlx" target="_blank">
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
            image="/images/tecnologia.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Tecnología
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Amor al medio ambiente también esta en desarrollar tecnología que
              mejore el reciclaje.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <Hiper href="https://n9.cl/j0rcvz" target="_blank">
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
