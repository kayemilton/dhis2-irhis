import { ChakraProvider } from "@chakra-ui/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import App from "./components/App";
import "./index.css";
const queryClient = new QueryClient();

export default function AppWrapper() {
    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </ChakraProvider>
    );
}
