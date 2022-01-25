import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormNotification from "@/components/FormNotification";
import styled from "styled-components";

export default function FormDialogNotification({
  open,
  handleClose,
  delivery,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledDialogContent>
        <FormNotification delivery={delivery} />
      </StyledDialogContent>
      <Button onClick={handleClose}>Cancel</Button>
    </Dialog>
  );
}

const StyledDialogContent = styled(DialogContent)`
  background: #74c69d;
`;
