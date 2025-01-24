"use client";
import React from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Mails } from "lucide-react";

const CopyEmail = ({ email }: { email: string }) => {
  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        toast.success("Email copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy email: ", err);
      });
  };
  return (
    <Button onClick={handleCopyEmail} className="flex gap-x-2">
      <Mails />
      <span>Email</span>
    </Button>
  );
};

export default CopyEmail;
