import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import store from "./store";

import App from "./App.jsx";
import "./index.css";
import ProjectProvider from "./contexts/ProjectProvider.jsx";
import NasaDataProvider from "./contexts/NasaDataProvider.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: 1000,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ProjectProvider>
        <NasaDataProvider>
          <QueryClientProvider client={queryClient}>
            <App />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </NasaDataProvider>
      </ProjectProvider>
    </Provider>
  </React.StrictMode>
);
