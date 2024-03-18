"use client";

import React from "react";
import Button from "./Button";
import Link from "next/link";

const ButtonLinkCreate = ({children, link, storage}:ButtonLinkCreateProps) => {

  const handleCardClick = () => {
    localStorage.removeItem(storage);
  };

  return (
    <Link href={link}>
      <Button onClick={handleCardClick}>{children}</Button>
    </Link>
  );
};

export default ButtonLinkCreate;
