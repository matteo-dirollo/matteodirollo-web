import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/layout/Navbar/Navbar";
import theme from "@/styles/theme";
import { wrapper, store, persistor } from "@/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import Provider from "react-redux"



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
import "../components/ui/lexicalEditor/styles.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { store, props } = wrapper.useWrappedStore(pageProps);
  console.log('wrapper:',store)

  return (
    <Provider>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider theme={theme}>
        {router.pathname !== "/admin" && <Navbar />}
        <ModalManager />
        <Component {...props.pageProps} />
        <FooterNewsletter />
      </ChakraProvider>
    </PersistGate>
    </Provider>
  );
}

export default MyApp;
