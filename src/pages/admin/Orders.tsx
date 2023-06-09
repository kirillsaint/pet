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
	Tr,
	useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import config from "../../config";
import auth from "../../lib/auth";
import Order from "../../types/Order";

function Orders() {
	const [data, setData] = useState<Order[] | null>(null);

	const getData = async () => {
		try {
			const { data: res } = await axios.get(`${config.apiUrl}/orders`, {
				headers: {
					Authorization: auth.getPassword(),
				},
			});

			setData(res.data);
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
		} catch (error) {}
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
							<Th>ID Заказчика</Th>
							<Th>ID Водителя</Th>
							<Th>ID Транспорта</Th>
							<Th>Дата создания</Th>
							<Th>Дата доставки</Th>
							<Th>Цена</Th>
							<Th>Действия</Th>
						</Tr>
					</Thead>
					<Tbody>
						{data.map(item => (
							<TableItem item={item} getData={getData} />
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
									<Input
										type="number"
										{...register("driver_id", { required: true })}
									/>
									{errors.driver_id && (
										<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
									)}
								</FormControl>
								<FormControl
									mb={2}
									isInvalid={errors.vehicle_id ? true : false}
								>
									<FormLabel>ID Транспорта</FormLabel>
									<Input
										type="number"
										{...register("vehicle_id", { required: true })}
									/>
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
}: {
	item: Order;
	getData: () => void;
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();

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
		} catch (error) {}
	});

	return (
		<>
			<Tr>
				<Td>{item.id}</Td>
				<Td>{item.recipient_full_name}</Td>
				<Td>{item.recipient_phone_number}</Td>
				<Td>{item.customer_id}</Td>
				<Td>{item.driver_id}</Td>
				<Td>{item.vehicle_id}</Td>
				<Td>{moment(item.created_at).format("LLL")}</Td>
				<Td>
					{item.delivery_date ? moment(item.delivery_date).format("LLL") : "–"}
				</Td>
				<Td>{item.cost}</Td>
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
