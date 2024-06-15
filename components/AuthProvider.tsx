"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactElement } from "react";

interface IAuthProviderProps {
  children: ReactElement;
}

const AuthProvider = ({ children }: IAuthProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
