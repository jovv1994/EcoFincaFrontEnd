import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Notification from "@/components/Notification";
import styled from "styled-components";

export default function DialogNotification({ open, handleClose, delivery }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledDialogContent>
        <Notification delivery={delivery} />
      </StyledDialogContent>
    </Dialog>
  );
}

const StyledDialogContent = styled(DialogContent)`
  background: #74c69d;
`;
