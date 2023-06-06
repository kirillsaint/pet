import {
	Button,
	Center,
	Container,
	FormControl,
	FormLabel,
	Heading,
	Input,
	useBoolean,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import config from "../config";
import auth from "../lib/auth";

function Login() {
	const [password, setPassword] = useState<string>("");
	const [loading, setLoading] = useBoolean();
	const toast = useToast();

	return (
		<Center minH={"100vh"} w="full">
			<Container
				alignContent={"center"}
				textAlign={"center"}
				alignItems={"center"}
				bgColor={"white"}
				borderRadius={"lg"}
				p={5}
				maxW="sm"
			>
				<Heading mb={2}>Авторизация</Heading>
				<FormControl mb={2}>
					<FormLabel mb={0}>Пароль</FormLabel>
					<Input
						value={password}
						onChange={e => setPassword(e.currentTarget.value)}
						placeholder="Введите пароль"
						type="password"
					/>
				</FormControl>
				<Button
					w={"full"}
					isLoading={loading}
					onClick={async () => {
						setLoading.on();
						try {
							await axios.get(`${config.apiUrl}/depos`, {
								headers: {
									Authorization: password,
								},
							});
							auth.setPassword(password);
							window.location.reload();
						} catch (error) {
							toast({
								title: "Ошибка!",
								description: "Неправильный пароль",
								status: "error",
								isClosable: true,
								duration: 3000,
							});
						} finally {
							setLoading.off();
						}
					}}
				>
					Войти
				</Button>
			</Container>
		</Center>
	);
}

export default Login;
