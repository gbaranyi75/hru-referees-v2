"use client";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children, session }) => {
  return (
    <SessionProvider refetchInterval={300} refetchOnWindowFocus={true} session={session}>
      {children}
    </SessionProvider>
  );
};
export default AuthProvider;
