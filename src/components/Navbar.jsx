import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Image from "next/image";
import AuthMenu from "@/components/AuthMenu";
import Link from "next/link";

export default function ButtonAppBar() {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Link href="/">
          <Hiper>
            <StyledTypography>EcoFinca</StyledTypography>
            <Image
              src="/images/logo.svg" // Route of the image file
              height={25} // Desired size with correct aspect ratio
              width={25} // Desired size with correct aspect ratio
              alt="Logo"
            />
          </Hiper>
        </Link>
        <AuthMenu />
      </StyledToolbar>
    </StyledAppBar>
  );
}

const StyledToolbar = styled(Toolbar)`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
`;

const StyledAppBar = styled(AppBar)`
  background: #52b788;
`;

const StyledTypography = styled(Typography)`
  display: inline-block;
  color: #1b4332;
  font-size: 31px;
  margin-right: 10px;
`;

const Hiper = styled.a`
  text-decoration: none;
  cursor: pointer;
`;
