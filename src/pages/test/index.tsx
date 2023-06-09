import {
	Box,
	Button,
	Center,
	Divider,
	Heading,
	Image,
	Input,
	SimpleGrid,
	Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import auth from "../../lib/auth";
import { AppContext } from "../../providers/AppContext";
import Order from "../../types/Order";

function Landing() {
	const context = useContext(AppContext);
	const navigate = useNavigate();

	useEffect(() => {
		setValue("recipient_full_name", context.props.auth?.full_name || "");
		setValue("recipient_phone_number", context.props.auth?.phone_number || "");
	}, [context.props]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
		setValue,
	} = useForm<Order>({
		defaultValues: {
			cargo_type_id: 0,
			recipient_full_name: context.props.auth?.full_name,
			recipient_phone_number: context.props.auth?.phone_number,
		},
	});

	const onSubmit = handleSubmit(async data => {
		try {
			if (!context.props.auth) {
				navigate("/lk");
			}
			await axios.post(`${config.apiUrl}/customer/create_order`, data, {
				headers: {
					Authorization: auth.getPassword(),
				},
			});

			reset();

			navigate("/lk");
		} catch (error) {}
	});

	return (
		<>
			<Stack direction={["column", "row"]} spacing={[8, 2]}>
				<Stack
					alignItems={"center"}
					w={["100%", "65%"]}
					direction={"column"}
					spacing={8}
				>
					<Heading textAlign={"center"}>
						FASTGRUZ – Твой выбор при переезде
					</Heading>
					<Image
						w={["100%", "60%"]}
						src={"/assets/images/file-276-1656922718836.png"}
					/>
				</Stack>
				<form onSubmit={onSubmit}>
					<Stack
						minW={["100%", "40%"]}
						alignItems={"center"}
						direction={"column"}
						spacing={8}
					>
						<Heading>Заявка</Heading>
						<Stack
							bg="white"
							borderRadius={"3xl"}
							p={4}
							border="12px solid"
							borderColor={"gray.200"}
							w={["100%", "70%"]}
							direction={"column"}
							spacing={2}
						>
							<Stack direction={"row"} spacing={1}>
								<Input
									placeholder="Адрес погрузки"
									_focus={{
										borderColor: "orange",
										boxShadow: "0 0 0 1px orange",
									}}
									borderRadius={"xl"}
									minH={12}
									{...register("loading_address", { required: true })}
								></Input>

								<Input
									placeholder="Адрес выгрузки"
									_focus={{
										borderColor: "orange",
										boxShadow: "0 0 0 1px orange",
									}}
									borderRadius={"xl"}
									minH={12}
									{...register("unloading_address", { required: true })}
								></Input>
							</Stack>

							<Stack direction={"row"} spacing={1}>
								<Input
									placeholder="Дата доставки"
									_focus={{
										borderColor: "orange",
										boxShadow: "0 0 0 1px orange",
									}}
									borderRadius={"xl"}
									minH={12}
									onFocus={e => (e.target.type = "datetime-local")}
									{...register("delivery_date", { required: true })}
								></Input>
								<Input
									_focus={{
										borderColor: "orange",
										boxShadow: "0 0 0 1px orange",
									}}
									borderRadius={"xl"}
									minH={12}
									placeholder="Груз"
									{...register("cargo", { required: true })}
								></Input>
							</Stack>

							<Input
								_focus={{
									borderColor: "orange",
									boxShadow: "0 0 0 1px orange",
								}}
								borderRadius={"xl"}
								minH={12}
								placeholder="ФИО"
								{...register("recipient_full_name", { required: true })}
							></Input>
							<Box bgColor={"orange"} p={4} borderRadius={"2xl"}>
								<Input
									_focus={{
										borderColor: "orange",
										boxShadow: "0 0 0 1px orange",
									}}
									borderRadius={"xl"}
									minH={12}
									type="number"
									placeholder="Номер телефона"
									bgColor={"white"}
									{...register("recipient_phone_number", { required: true })}
								></Input>
								<Button
									isDisabled={isSubmitting}
									mt={2}
									borderRadius={"2xl"}
									bgColor={"white"}
									w="full"
									type="submit"
								>
									Оформить заявку
								</Button>
							</Box>
						</Stack>
					</Stack>
				</form>
			</Stack>
			<Center>
				<Divider
					borderWidth={"8px"}
					w="100px"
					borderColor="orange"
					mt={48}
					mb={16}
				/>
			</Center>
			<Stack alignItems={"center"} direction={"row"} spacing={8}>
				<Stack
					direction={["column-reverse", "row"]}
					justifyContent={"space-between"}
					spacing={4}
					w="full"
					h="full"
					bgColor="gray.100"
					p={4}
					borderRadius={"2xl"}
				>
					<Box>
						<Heading>Наши услуги</Heading>

						<SimpleGrid mt={8} columns={[1, 2]} spacing={4}>
							<Stack direction={"column"} spacing={2}>
								<Heading size="lg">Переезды:</Heading>
								<Stack alignItems={"center"} direction={"row"} spacing={2}>
									<Image src="/assets/images/package.png" w="32px" h="32px" />
									<Heading size="md">Дачный переезд</Heading>
								</Stack>
								<Stack alignItems={"center"} direction={"row"} spacing={2}>
									<Image src="/assets/images/package.png" w="32px" h="32px" />
									<Heading size="md">Квартирный переезд</Heading>
								</Stack>
								<Stack alignItems={"center"} direction={"row"} spacing={2}>
									<Image src="/assets/images/package.png" w="32px" h="32px" />
									<Heading size="md">Офисный переезд</Heading>
								</Stack>
							</Stack>
							<Stack direction={"column"} spacing={2}>
								<Heading size="lg">Перевозка:</Heading>
								<Stack alignItems={"center"} direction={"row"} spacing={2}>
									<Image src="/assets/images/sofa.png" w="32px" h="32px" />
									<Heading size="md">Перевозка мебели</Heading>
								</Stack>
								<Stack alignItems={"center"} direction={"row"} spacing={2}>
									<Image
										src="/assets/images/dishwasher.png"
										w="32px"
										h="32px"
									/>
									<Heading size="md">Перевозка техники</Heading>
								</Stack>
								<Stack alignItems={"center"} direction={"row"} spacing={2}>
									<Image src="/assets/images/wood.png" w="32px" h="32px" />
									<Heading size="md">Перевозка строй-материалов</Heading>
								</Stack>
							</Stack>
						</SimpleGrid>
					</Box>
					<Image
						src="/assets/images/file-971-1618242576520.png"
						w={["100%", "400px"]}
					/>
				</Stack>
			</Stack>
			<Center>
				<Divider
					borderWidth={"8px"}
					w="100px"
					borderColor="orange"
					mt={16}
					mb={16}
				/>
			</Center>
			<Stack direction={"column"} spacing={16}>
				<Center>
					<Heading>Что мы предлагаем?</Heading>
				</Center>
				<SimpleGrid columns={[1, 2, 3]} spacing={[8, 48]}>
					<Stack
						bgColor={"gray.100"}
						direction={"column"}
						spacing={6}
						alignItems={"center"}
						p={3}
						borderRadius={"2xl"}
						textAlign={"center"}
					>
						<Heading>Скорость</Heading>
						<Image w="200px" src="/assets/images/stopwatch.png" />
						<Heading size="lg">Груз придет в кратчайшие сроки</Heading>
					</Stack>
					<Stack
						bgColor={"gray.100"}
						direction={"column"}
						spacing={6}
						alignItems={"center"}
						p={3}
						borderRadius={"2xl"}
						textAlign={"center"}
					>
						<Heading>Надежность</Heading>
						<Image
							w="200px"
							src="/assets/images/shield-variant-with-white-and-black-borders.png"
						/>
						<Heading size="lg">Обеспечим сохранность груза</Heading>
					</Stack>
					<Stack
						bgColor={"gray.100"}
						direction={"column"}
						spacing={6}
						alignItems={"center"}
						p={3}
						borderRadius={"2xl"}
						textAlign={"center"}
					>
						<Heading>Гарантия</Heading>
						<Image w="200px" src="/assets/images/guarantee-certificate.png" />
						<Heading size="lg">Доставка без происшествий</Heading>
					</Stack>
				</SimpleGrid>
			</Stack>
		</>
	);
}

export default Landing;
