import Footer from "@/components/LayoutCom/Footer";
import Nav from "@/components/LayoutCom/Nav";
import store from "@/store/store";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
    
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Nav />
          <Component {...pageProps} />
          <Footer />
        </Provider>
      </QueryClientProvider>
    </>
  );
}
