import { useAuth } from "@/contexts/auth";
import { Skeleton } from "@mui/material";
import React from "react";
import ProfileMenu from "@/components/ProfileMenu";
import TypeRegister from "@/components/TypeRegister";

export default function AuthMenu() {
  const { user } = useAuth();

  if (user === null) {
    return <Skeleton variant="rect" width={100} height={30} />;
  }

  if (!user) {
    return <TypeRegister />;
  }

  return <ProfileMenu />;
}
