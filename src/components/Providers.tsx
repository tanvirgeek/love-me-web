"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "./AuthGuard";

const Providers = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <AuthGuard>{children}</AuthGuard>
    </NextUIProvider>
  );
};

export default Providers;
