import {
	Button,
	Center,
	Container,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Link,
	Text,
	useBoolean,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link as RLink } from "react-router-dom";
import config from "../config";
import auth from "../lib/auth";

function Login() {
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loading, setLoading] = useBoolean();
	const toast = useToast();

	return (
		<Center minH={"80vh"} w="full">
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
					<FormLabel mb={0}>Логин</FormLabel>
					<Input
						value={login}
						onChange={e => setLogin(e.currentTarget.value)}
						placeholder="Введите логин"
					/>
				</FormControl>
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
							const { data: res } = await axios.post(
								`${config.apiUrl}/auth/login`,
								{
									login,
									password,
								}
							);
							auth.setPassword(res.auth.token);
							window.location.reload();
						} catch (error) {
							toast({
								title: "Ошибка!",
								description: "Неправильный логин или пароль",
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
				<Text textAlign={"left"} mt={2}>
					Нет аккаунта?{" "}
					<Link as={RLink} to="/lk/register">
						Зарегистрироваться
					</Link>
				</Text>
			</Container>
		</Center>
	);
}

export default Login;
