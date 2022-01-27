import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormUpdate from "@/components/FormUpdate";
import styled from "styled-components";

export default function FormDialogUpdate({ open, handleClose, delivery }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledDialogContent>
        <FormUpdate delivery={delivery} />
      </StyledDialogContent>
    </Dialog>
  );
}

const StyledDialogContent = styled(DialogContent)`
  background: #74c69d;
`;
