"use client";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }) => {
  return (
    <SessionProvider refetchInterval={300} refetchOnWindowFocus={true}>
      {children}
    </SessionProvider>
  );
};
export default AuthProvider;
