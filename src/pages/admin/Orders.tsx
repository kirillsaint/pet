import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Button,
	Center,
	FormControl,
	FormErrorMessage,
	FormLabel,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Stack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tooltip,
	Tr,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import config from "../../config";
import auth from "../../lib/auth";
import Customer from "../../types/Customer";
import Driver from "../../types/Driver";
import Order from "../../types/Order";
import Vehicle from "../../types/Vehicle";

function Orders() {
	const [data, setData] = useState<Order[] | null>(null);
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);
	const [drivers, setDrivers] = useState<Driver[]>([]);
	const [customers, setCustomers] = useState<Customer[]>([]);
	const toast = useToast();

	const getData = async () => {
		try {
			const { data: res } = await axios.get(`${config.apiUrl}/orders`, {
				headers: {
					Authorization: auth.getPassword(),
				},
			});

			const { data: drivers } = await axios.get(`${config.apiUrl}/drivers`, {
				headers: {
					Authorization: auth.getPassword(),
				},
			});

			const { data: vehicles } = await axios.get(`${config.apiUrl}/vehicles`, {
				headers: {
					Authorization: auth.getPassword(),
				},
			});

			const { data: customers } = await axios.get(
				`${config.apiUrl}/customers`,
				{
					headers: {
						Authorization: auth.getPassword(),
					},
				}
			);

			setData(res.data);
			setCustomers(customers.data);
			setVehicles(vehicles.data);
			setDrivers(drivers.data);
		} catch {}
	};

	useEffect(() => {
		getData();
	}, []);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<Order>();
	const onSubmit = handleSubmit(async data => {
		try {
			await axios.post(`${config.apiUrl}/orders/create`, data, {
				headers: {
					Authorization: auth.getPassword(),
				},
			});
			await getData();
			reset();
			onClose();
			toast({
				title: "Успех!",
				description: "Заказ успешно создан",
				duration: 3000,
				isClosable: true,
				status: "success",
			});
		} catch (error) {
			toast({
				title: "Ошибка!",
				description: `${error}`,
				duration: 3000,
				isClosable: true,
				status: "error",
			});
		}
	});

	return data !== null ? (
		<>
			<Button w="full" onClick={onOpen}>
				Создать
			</Button>
			<TableContainer>
				<Table>
					<Thead>
						<Tr>
							<Th>ID</Th>
							<Th>ФИО Получателя</Th>
							<Th>Номер телефона получателя</Th>
							<Th>Заказчик</Th>
							<Th>Водитель</Th>
							<Th>Транспорт</Th>
							<Th>Дата создания</Th>
							<Th>Дата доставки</Th>
							<Th>Цена</Th>
							<Th>Статус</Th>
							<Th>Действия</Th>
						</Tr>
					</Thead>
					<Tbody>
						{data.map(item => (
							<TableItem
								drivers={drivers}
								customers={customers}
								vehicles={vehicles}
								item={item}
								getData={getData}
							/>
						))}
					</Tbody>
				</Table>
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Создать заказ</ModalHeader>
						<ModalCloseButton />
						<form onSubmit={onSubmit}>
							<ModalBody>
								<FormControl
									mb={2}
									isInvalid={errors.recipient_full_name ? true : false}
								>
									<FormLabel>ФИО Получателя</FormLabel>
									<Input
										{...register("recipient_full_name", { required: true })}
									/>
									{errors.recipient_full_name && (
										<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
									)}
								</FormControl>
								<FormControl
									mb={2}
									isInvalid={errors.recipient_phone_number ? true : false}
								>
									<FormLabel>Номер получателя</FormLabel>
									<Input
										type="number"
										{...register("recipient_phone_number", { required: true })}
									/>
									{errors.recipient_phone_number && (
										<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
									)}
								</FormControl>

								<FormControl
									mb={2}
									isInvalid={errors.customer_id ? true : false}
								>
									<FormLabel>ID Заказчика</FormLabel>
									<Input
										type="number"
										{...register("customer_id", { required: true })}
									/>
									{errors.customer_id && (
										<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
									)}
								</FormControl>
								<FormControl mb={2} isInvalid={errors.driver_id ? true : false}>
									<FormLabel>ID Водителя</FormLabel>
									<Input type="number" {...register("driver_id")} />
									{errors.driver_id && (
										<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
									)}
								</FormControl>
								<FormControl
									mb={2}
									isInvalid={errors.vehicle_id ? true : false}
								>
									<FormLabel>ID Транспорта</FormLabel>
									<Input type="number" {...register("vehicle_id")} />
									{errors.vehicle_id && (
										<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
									)}
								</FormControl>
								<FormControl
									mb={2}
									isInvalid={errors.loading_address ? true : false}
								>
									<FormLabel>Адрес погрузки</FormLabel>
									<Input {...register("loading_address", { required: true })} />
									{errors.loading_address && (
										<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
									)}
								</FormControl>
								<FormControl
									mb={2}
									isInvalid={errors.unloading_address ? true : false}
								>
									<FormLabel>Адрес выгрузки</FormLabel>
									<Input
										{...register("unloading_address", { required: true })}
									/>
									{errors.unloading_address && (
										<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
									)}
								</FormControl>
								<FormControl
									mb={2}
									isInvalid={errors.delivery_date ? true : false}
								>
									<FormLabel>Дата доставки</FormLabel>
									<Input
										type="datetime-local"
										{...register("delivery_date", { required: true })}
									/>
									{errors.delivery_date && (
										<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
									)}
								</FormControl>
								<FormControl mb={2} isInvalid={errors.cargo ? true : false}>
									<FormLabel>Груз</FormLabel>
									<Input {...register("cargo", { required: true })} />
									{errors.cargo && (
										<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
									)}
								</FormControl>
								<FormControl mb={2} isInvalid={errors.cost ? true : false}>
									<FormLabel>Цена</FormLabel>
									<Input {...register("cost")} />
									{errors.cost && (
										<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
									)}
								</FormControl>
							</ModalBody>

							<ModalFooter>
								<Button isLoading={isSubmitting} w="full" type="submit">
									Создать
								</Button>
							</ModalFooter>
						</form>
					</ModalContent>
				</Modal>
			</TableContainer>
		</>
	) : (
		<Center>
			<Spinner size="xl" />
		</Center>
	);
}

export function TableItem({
	item,
	getData,
	customers,
	vehicles,
	drivers,
}: {
	item: Order;
	getData: () => void;
	customers: Customer[];
	vehicles: Vehicle[];
	drivers: Driver[];
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<Order>({
		defaultValues: item,
	});
	const onSubmit = handleSubmit(async data => {
		try {
			await axios.post(
				`${config.apiUrl}/orders/edit`,
				{
					id: item.id,
					...data,
				},
				{
					headers: {
						Authorization: auth.getPassword(),
					},
				}
			);
			await getData();
			reset();
			onClose();
			toast({
				title: "Успех!",
				description: "Заказ успешно изменен",
				duration: 3000,
				isClosable: true,
				status: "success",
			});
		} catch (error) {
			toast({
				title: "Ошибка!",
				description: `${error}`,
				duration: 3000,
				isClosable: true,
				status: "error",
			});
		}
	});

	return (
		<>
			<Tr>
				<Td>{item.id}</Td>
				<Td>{item.recipient_full_name}</Td>
				<Td>{item.recipient_phone_number}</Td>
				<Td>
					<Tooltip label={`ID: ${item.customer_id}`}>
						{customers.find(d => d.id === item.customer_id)?.full_name ||
							"Неизвестно"}
					</Tooltip>
				</Td>
				<Td>
					<Tooltip label={`ID: ${item.driver_id}`}>
						{drivers.find(d => d.id === item.driver_id)?.full_name ||
							"Неизвестно"}
					</Tooltip>
				</Td>
				<Td>
					<Tooltip label={`ID: ${item.vehicle_id}`}>
						{vehicles.find(d => d.id === item.vehicle_id)?.firm_mark ||
							"Неизвестно"}
					</Tooltip>
				</Td>
				<Td>{moment(item.created_at).format("LLL")}</Td>
				<Td>
					{item.delivery_date ? moment(item.delivery_date).format("LLL") : "–"}
				</Td>
				<Td>{item.cost}</Td>
				<Td>
					{item.status === "delivered"
						? "Доставлен"
						: "В ожидании " + (item.driver_id ? "доставки" : "водителя")}
				</Td>
				<Td>
					<Stack direction={"row"} spacing={1}>
						<IconButton onClick={onOpen} aria-label="">
							<EditIcon />
						</IconButton>
						<IconButton
							onClick={async () => {
								await axios.post(
									`${config.apiUrl}/orders/delete`,
									{ id: item.id },
									{ headers: { Authorization: auth.getPassword() } }
								);

								getData();
							}}
							aria-label=""
						>
							<DeleteIcon />
						</IconButton>
					</Stack>
				</Td>
			</Tr>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Редактирование</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={onSubmit}>
						<ModalBody>
							<FormControl
								mb={2}
								isInvalid={errors.recipient_full_name ? true : false}
							>
								<FormLabel>ФИО Получателя</FormLabel>
								<Input
									{...register("recipient_full_name", { required: true })}
								/>
								{errors.recipient_full_name && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
							<FormControl
								mb={2}
								isInvalid={errors.recipient_phone_number ? true : false}
							>
								<FormLabel>Номер получателя</FormLabel>
								<Input
									type="number"
									{...register("recipient_phone_number", { required: true })}
								/>
								{errors.recipient_phone_number && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
							<FormControl mb={2} isInvalid={errors.customer_id ? true : false}>
								<FormLabel>ID Заказчика</FormLabel>
								<Input
									type="number"
									{...register("customer_id", { required: true })}
								/>
								{errors.customer_id && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
							<FormControl mb={2} isInvalid={errors.driver_id ? true : false}>
								<FormLabel>ID Водителя</FormLabel>
								<Input type="number" {...register("driver_id")} />
								{errors.driver_id && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
							<FormControl mb={2} isInvalid={errors.vehicle_id ? true : false}>
								<FormLabel>ID Транспорта</FormLabel>
								<Input type="number" {...register("vehicle_id")} />
								{errors.vehicle_id && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
							<FormControl mb={2} isInvalid={errors.cost ? true : false}>
								<FormLabel>Цена</FormLabel>
								<Input {...register("cost", { required: true })} />
								{errors.cost && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button isLoading={isSubmitting} w="full" type="submit">
								Редактировать
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
}

export default Orders;
