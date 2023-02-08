import { type AppType } from "next/app";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";

import { api } from "../utils/api";
import { CssBaseline } from "@mui/material";
import { CssVarsProvider } from "@mui/joy";
import { ToastContainer } from "react-toastify";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <CssVarsProvider />
      <CssBaseline />
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
