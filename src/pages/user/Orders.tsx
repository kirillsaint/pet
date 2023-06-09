import {
	Button,
	Center,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
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
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import config from "../../config";
import auth from "../../lib/auth";
import { AppContext } from "../../providers/AppContext";
import Order from "../../types/Order";

function Orders() {
	const [data, setData] = useState<Order[] | null>(null);

	const getData = async () => {
		try {
			const { data: res } = await axios.get(
				`${config.apiUrl}/customer/orders`,
				{
					headers: {
						Authorization: auth.getPassword(),
					},
				}
			);

			setData(res.orders);
		} catch {}
	};

	useEffect(() => {
		getData();
	}, []);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const context = useContext(AppContext);

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
			await axios.post(`${config.apiUrl}/customer/create_order`, data, {
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
							<Th>Дата доставки</Th>
							<Th>Адрес погрузки</Th>
							<Th>Адрес выгрузки</Th>
							<Th>Цена</Th>
							<Th>Статус</Th>
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
								<FormControl mb={2} isInvalid={errors.cargo ? true : false}>
									<FormLabel>Груз</FormLabel>
									<Input {...register("cargo", { required: true })} />
									{errors.cargo && (
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
				<Td>{moment(item.delivery_date).format("LLL")}</Td>
				<Td>{item.loading_address}</Td>
				<Td>{item.unloading_address}</Td>
				<Td>{item.cost || "Неизвестно"}</Td>
				<Td>
					{item.status === "delivered"
						? "Доставлен"
						: "В ожидании " + (item.driver_id ? "доставки" : "водителя")}
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
								<Input
									type="number"
									{...register("driver_id", { required: true })}
								/>
								{errors.driver_id && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
							<FormControl mb={2} isInvalid={errors.vehicle_id ? true : false}>
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
