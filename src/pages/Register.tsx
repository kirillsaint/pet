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

function Register() {
	const [full_name, setFullName] = useState<string>("");
	const [phone_number, setPhoneNumber] = useState<string>("");
	const [email_address, setEmail] = useState<string>("");
	const [city_id, setCityId] = useState<number>(0);
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
				<Heading mb={2}>Регистрация</Heading>
				<FormControl mb={2}>
					<FormLabel mb={0}>ФИО</FormLabel>
					<Input
						value={full_name}
						onChange={e => setFullName(e.currentTarget.value)}
						placeholder="Введите ФИО"
					/>
				</FormControl>
				<FormControl mb={2}>
					<FormLabel mb={0}>Номер телефона</FormLabel>
					<Input
						value={phone_number}
						onChange={e => setPhoneNumber(e.currentTarget.value)}
						placeholder="Введите номер телефона"
						type="number"
					/>
				</FormControl>
				<FormControl mb={2}>
					<FormLabel mb={0}>Email</FormLabel>
					<Input
						value={email_address}
						onChange={e => setEmail(e.currentTarget.value)}
						placeholder="Введите Email"
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
								`${config.apiUrl}/auth/register`,
								{
									full_name,
									phone_number,
									email_address,
									city_id,
									password,
								}
							);
							auth.setPassword(res.auth.token);
							window.location.reload();
						} catch (err: any) {
							if (
								err?.response &&
								err.response?.data &&
								err.response.data?.errors
							) {
								for (const error of err.response.data.errors) {
									toast({
										title: "Ошибка!",
										description: error.message,
										status: "error",
										duration: 3000,
										isClosable: true,
									});
								}
							} else {
								toast({
									title: "Ошибка!",
									description: `${err}`,
									status: "error",
									duration: 3000,
									isClosable: true,
								});
							}
						} finally {
							setLoading.off();
						}
					}}
				>
					Зарегистрироваться
				</Button>
				<Text textAlign={"left"} mt={2}>
					Уже есть аккаунт?{" "}
					<Link as={RLink} to="/lk">
						Войти
					</Link>
				</Text>
			</Container>
		</Center>
	);
}

export default Register;
