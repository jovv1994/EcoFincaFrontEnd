import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Map from "@/components/Map";
import styled from "styled-components";

export default function DialogMap({ open, handleClose, delivery }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledDialogContent>
        <Map delivery={delivery} />
      </StyledDialogContent>
    </Dialog>
  );
}

const StyledDialogContent = styled(DialogContent)`
  background: #74c69d;
`;
