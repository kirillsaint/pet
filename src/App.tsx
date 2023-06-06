import { useBoolean } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import config from "./config";
import auth from "./lib/auth";
import Login from "./pages/Login";
import Main from "./pages/main";

function App() {
	const [authorized, setAuthorized] = useBoolean(
		auth.getPassword() ? true : false
	);

	useEffect(() => {
		const getData = async () => {
			if (!auth.getPassword()) {
				return;
			}
			try {
				await axios.get(`${config.apiUrl}/depos`, {
					headers: {
						Authorization: auth.getPassword(),
					},
				});
			} catch (error) {
				auth.setPassword(null);
				setAuthorized.off();
			}
		};

		getData();
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={authorized ? <Main /> : <Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
