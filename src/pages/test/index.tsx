import {
	Box,
	Button,
	Heading,
	Image,
	Input,
	Select,
	SimpleGrid,
	Stack,
} from "@chakra-ui/react";

function Landing() {
	return (
		<>
			<Stack direction={"row"} spacing={2}>
				<Stack alignItems={"center"} w="65%" direction={"column"} spacing={8}>
					<Heading textAlign={"center"}>
						FASTGRUZ – Твой выбор при переезде
					</Heading>
					<Image w="60%" src={"/assets/images/file-276-1656922718836.png"} />
				</Stack>
				<Stack
					minW="40%"
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
						w="70%"
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
							></Input>
							<Input
								placeholder="Адрес выгрузки"
								_focus={{
									borderColor: "orange",
									boxShadow: "0 0 0 1px orange",
								}}
								borderRadius={"xl"}
								minH={12}
							></Input>
						</Stack>
						<Select
							placeholder="Выберите транспорт"
							_focus={{
								borderColor: "orange",
								boxShadow: "0 0 0 1px orange",
							}}
							borderRadius={"xl"}
							minH={12}
						></Select>
						<Stack direction={"row"} spacing={1}>
							<Input
								placeholder="Дата доставки"
								_focus={{
									borderColor: "orange",
									boxShadow: "0 0 0 1px orange",
								}}
								borderRadius={"xl"}
								minH={12}
								onFocus={e => (e.target.type = "date")}
								onBlur={e => (e.target.type = "text")}
							></Input>
							<Input
								_focus={{
									borderColor: "orange",
									boxShadow: "0 0 0 1px orange",
								}}
								type="number"
								borderRadius={"xl"}
								minH={12}
								placeholder="Грузчики"
							></Input>
						</Stack>
						<Stack direction={"row"} spacing={1}>
							<Input
								placeholder="Опции к заказу"
								_focus={{
									borderColor: "orange",
									boxShadow: "0 0 0 1px orange",
								}}
								borderRadius={"xl"}
								minH={12}
							></Input>
							<Input
								_focus={{
									borderColor: "orange",
									boxShadow: "0 0 0 1px orange",
								}}
								borderRadius={"xl"}
								minH={12}
								placeholder="Время аренды"
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
						></Input>
						<Box bgColor={"orange"} p={4} borderRadius={"2xl"}>
							<Input
								_focus={{
									borderColor: "orange",
									boxShadow: "0 0 0 1px orange",
								}}
								borderRadius={"xl"}
								minH={12}
								placeholder="Номер телефона"
								bgColor={"white"}
							></Input>
							<Button mt={2} borderRadius={"2xl"} bgColor={"white"} w="full">
								Оформить заявку
							</Button>
						</Box>
					</Stack>
				</Stack>
			</Stack>
			<Stack
				alignItems={"center"}
				direction={"row"}
				spacing={8}
				mt={64}
				mb={64}
			>
				<Image src="/assets/images/file-971-1618242576520.png" w={"40%"} />
				<Box w="full" h="full" bgColor="gray.100" p={4} borderRadius={"2xl"}>
					<Heading>Наши услуги</Heading>

					<SimpleGrid mt={8} columns={2} spacing={4}>
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
								<Image src="/assets/images/dishwasher.png" w="32px" h="32px" />
								<Heading size="md">Перевозка техники</Heading>
							</Stack>
							<Stack alignItems={"center"} direction={"row"} spacing={2}>
								<Image src="/assets/images/wood.png" w="32px" h="32px" />
								<Heading size="md">Перевозка строй-материалов</Heading>
							</Stack>
						</Stack>
					</SimpleGrid>
				</Box>
			</Stack>
		</>
	);
}

export default Landing;
