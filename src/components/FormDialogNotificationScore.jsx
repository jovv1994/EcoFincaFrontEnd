import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormNotificationScore from "@/components/FormNotificationScore";
import styled from "styled-components";

export default function FormDialogNotificationScore({
  open,
  handleClose,
  delivery,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledDialogContent>
        <FormNotificationScore delivery={delivery} />
      </StyledDialogContent>
    </Dialog>
  );
}

const StyledDialogContent = styled(DialogContent)`
  background: #74c69d;
`;
