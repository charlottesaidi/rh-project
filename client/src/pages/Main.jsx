import React from "react";
import AppLayout from "../layouts/AppLayout";
import LoginLayout from "../layouts/LoginLayout";
import {isTokenExpired, useToken} from "../service/auth";
import {setAuthorization} from "../service/core";

const Main = () => {
  const { token } = useToken();

  if (!token) {
    return (
      <LoginLayout/>
    )
  }

  setAuthorization(token);

  isTokenExpired(token);

  return (
    <AppLayout/>
  )
}

export default Main;
