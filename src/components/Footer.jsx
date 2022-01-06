import React from "react";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";

export default function IconTabs() {
  return (
    <StyledPaper square>
      <a
        href="https://www.facebook.com/EcoFinca-101169402330197"
        target="_blank"
      >
        <StyledFacebook />
      </a>
      <a href="https://twitter.com/FincaEco" target="_blank">
        <StyledTwitter />
      </a>
      <a href="https://www.instagram.com/ecofinca2021/" target="_blank">
        <StyledInstagram />
      </a>
    </StyledPaper>
  );
}

const StyledPaper = styled(Paper)`
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: space-evenly;
  width: 100%;
  background: #52b788;
  padding: 10px;
`;

const StyledFacebook = styled(Facebook)`
  color: #3b5998;
`;

const StyledTwitter = styled(Twitter)`
  color: #00acee;
`;

const StyledInstagram = styled(Instagram)`
  color: #c13584;
`;
