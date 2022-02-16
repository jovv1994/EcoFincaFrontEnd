import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormNotificationRejected from "@/components/FormNotificationRejected";
import styled from "styled-components";

export default function FormDialogNotificationRejected({
  open,
  handleClose,
  delivery,
  onStateDeliveryChange,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledDialogContent>
        <FormNotificationRejected
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
