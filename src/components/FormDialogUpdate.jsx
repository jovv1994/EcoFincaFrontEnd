import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormUpdate from "@/components/FormUpdate";
import styled from "styled-components";

export default function FormDialog({ open, handleClose, delivery }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledDialogContent>
        <FormUpdate delivery={delivery} />
      </StyledDialogContent>
      <Button onClick={handleClose}>Cancel</Button>
    </Dialog>
  );
}

const StyledDialogContent = styled(DialogContent)`
  background: #74c69d;
`;
