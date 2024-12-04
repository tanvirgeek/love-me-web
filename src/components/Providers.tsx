"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

const Providers = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>;
};

export default Providers;
