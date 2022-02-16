import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import NotificationScore from "@/components/NotificationScore";
import styled from "styled-components";

export default function DialogNotificationScore({
  open,
  handleClose,
  delivery,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledDialogContent>
        <NotificationScore delivery={delivery} />
      </StyledDialogContent>
    </Dialog>
  );
}

const StyledDialogContent = styled(DialogContent)`
  background: #74c69d;
`;
