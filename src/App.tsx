import { Box, Stack, useBoolean } from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import "moment/locale/ru";
import { useContext, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import config from "./config";
import auth from "./lib/auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/admin";
import Driver from "./pages/driver";
import Landing from "./pages/test";
import Taxi from "./pages/test/Taxi";
import User from "./pages/user";
import { AppContext } from "./providers/AppContext";

function App() {
	moment.locale("ru");
	const [authorized, setAuthorized] = useBoolean(
		auth.getPassword() ? true : false
	);

	const context = useContext(AppContext);

	useEffect(() => {
		const getData = async () => {
			const { data: cities } = await axios.get(`${config.apiUrl}/cities`);
			if (!auth.getPassword()) {
				if (context.setProps) {
					context.setProps({
						auth: null,
						cities: cities.data,
					});
				}
				return;
			}
			try {
				const { data: res } = await axios.get(`${config.apiUrl}/auth`, {
					headers: {
						Authorization: auth.getPassword(),
					},
				});

				if (context.setProps) {
					context.setProps({
						cities: cities.data,
						auth: res.auth,
					});
				}
				setAuthorized.on();
			} catch (error) {
				auth.setPassword(null);
				setAuthorized.off();
			}
		};

		getData();
	}, []);

	return (
		<BrowserRouter>
			<Stack direction={"column"} justifyContent={"space-between"} minH="100vh">
				<Header />
				<Box paddingInlineStart={[4, 8]} paddingInlineEnd={[4, 8]} pt={32}>
					<Routes>
						<Route
							path="/lk"
							element={
								authorized ? (
									context.props.auth?.is_admin ? (
										<Admin />
									) : context.props.auth?.is_driver ? (
										<Driver />
									) : (
										<User />
									)
								) : (
									<Login />
								)
							}
						/>
						<Route
							path="/lk/register"
							element={authorized ? <Navigate to="/lk" /> : <Register />}
						/>
						<Route path="/" element={<Landing />} />
						<Route path="/taxi" element={<Taxi />} />
					</Routes>
				</Box>
				<Footer />
			</Stack>
		</BrowserRouter>
	);
}

export default App;
