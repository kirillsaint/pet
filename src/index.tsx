import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppProvider from "./providers/AppContext";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<AppProvider>
				<App />
			</AppProvider>
		</ChakraProvider>
	</React.StrictMode>
);

reportWebVitals();
