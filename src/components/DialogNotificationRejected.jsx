import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import NotificationRejected from "@/components/NotificationRejected";
import styled from "styled-components";

export default function DialogNotificationRejected({
  open,
  handleClose,
  delivery,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledDialogContent>
        <NotificationRejected delivery={delivery} />
      </StyledDialogContent>
    </Dialog>
  );
}

const StyledDialogContent = styled(DialogContent)`
  background: #74c69d;
`;
