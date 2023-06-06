import { extendTheme } from "@chakra-ui/react";
import "./css/theme.css";

export default extendTheme({
	fonts: {
		heading: `'Montserrat', sans-serif`,
		body: `'Montserrat', sans-serif`,
	},
	styles: {
		global: {
			body: {
				backgroundColor: "rgb(248, 248, 248)",
				color: "#333333",
			},
		},
	},
	config: {
		initialColorMode: "light",
		useSystemColorMode: false,
		cssVarPrefix: "kirillsaint",
	},
});
