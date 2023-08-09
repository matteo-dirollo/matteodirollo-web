import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/layout/Navbar/Navbar";
import theme from "@/styles/theme";
import { wrapper } from "@/store/store";
import { Provider, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useStore } from "react-redux";

import "@fontsource/epilogue"; // Defaults to weight 400
import "@fontsource/epilogue/400.css"; // Specify weight
import "@fontsource/epilogue/400-italic.css";
import ModalManager from "@/components/ui/modals/ModalManager";
import FooterNewsletter from "../components/layout/Footer/FooterNewsletter";

// LEXICAL STYLES
import "../components/ui/lexicalEditor/ui/Button.css";
import "../components/ui/lexicalEditor/ui/ContentEditable.css";
import "../components/ui/lexicalEditor/ui/Dialog.css";
import "../components/ui/lexicalEditor/ui/Input.css";
import "../components/ui/lexicalEditor/ui/Modal.css";
import "../components/ui/lexicalEditor/nodes/ImageNode.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const store = useStore();

  return (
    <PersistGate loading={null} persistor={store.__persistor}>
      <ChakraProvider theme={theme}>
        {router.pathname !== "/admin" && <Navbar />}
        <ModalManager />
        <Component {...pageProps} />
        <FooterNewsletter />
      </ChakraProvider>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
