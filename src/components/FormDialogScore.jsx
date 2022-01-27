import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormScore from "@/components/FormScore";
import styled from "styled-components";

export default function FormDialogScore({
  open,
  handleClose,
  delivery,
  onStateDeliveryChange,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledDialogContent>
        <FormScore
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
