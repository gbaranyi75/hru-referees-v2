"use client";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }) => {
  return <SessionProvider refetchInterval={600} >{children}</SessionProvider>;
};
export default AuthProvider;
