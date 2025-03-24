"use client";
import React, { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditUserForm from "../Forms/EditUserForm";
import { ExtendedUser } from "@/types/types";
const EditModal = ({
  children,
  user,
  isOpen,
}: {
  children: ReactNode;
  user: ExtendedUser;
  isOpen: boolean;
}) => {
  return (
    <Dialog open={isOpen} modal={false}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditUserForm user={user as ExtendedUser} />
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
