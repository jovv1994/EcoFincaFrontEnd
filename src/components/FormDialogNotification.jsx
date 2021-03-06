import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormNotification from "@/components/FormNotification";
import styled from "styled-components";

export default function FormDialogNotification({
  open,
  handleClose,
  delivery,
  onStateDeliveryChange,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledDialogContent>
        <FormNotification
          delivery={delivery}
          onStateDeliveryChange={onStateDeliveryChange}
        />
      </StyledDialogContent>
    </Dialog>
  );
}

const StyledDialogContent = styled(DialogContent)`
  background: #74c69d;
`;
