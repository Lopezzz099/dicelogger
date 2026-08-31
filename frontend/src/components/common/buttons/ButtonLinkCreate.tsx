"use client";

import React from "react";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ButtonLinkCreate = ({children, link, storage}:ButtonLinkCreateProps) => {
  const router = useRouter();
  const handleCardClick = () => {
    localStorage.removeItem(storage);
    router.push(link);
  };

  return (
    <Button type="button" onClick={handleCardClick}>{children}</Button>
  );
};

export default ButtonLinkCreate;
