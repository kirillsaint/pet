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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import config from "../../config";
import auth from "../../lib/auth";
import Customer from "../../types/Customer";

function Customers() {
	const [data, setData] = useState<Customer[] | null>(null);

	const getData = async () => {
		try {
			const { data: res } = await axios.get(`${config.apiUrl}/customers`, {
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
	} = useForm<Customer>();
	const onSubmit = handleSubmit(async data => {
		try {
			await axios.post(`${config.apiUrl}/customers/create`, data, {
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
							<Th>ФИО</Th>
							<Th>Номер телефона</Th>
							<Th>Email</Th>
							<Th>ID города</Th>
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
						<ModalHeader>Создать депо</ModalHeader>
						<ModalCloseButton />
						<form onSubmit={onSubmit}>
							<ModalBody>
								<FormControl mb={2} isInvalid={errors.full_name ? true : false}>
									<FormLabel>ФИО</FormLabel>
									<Input {...register("full_name", { required: true })} />
									{errors.full_name && (
										<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
									)}
								</FormControl>
								<FormControl
									mb={2}
									isInvalid={errors.phone_number ? true : false}
								>
									<FormLabel>Номер телефона</FormLabel>
									<Input {...register("phone_number", { required: true })} />
									{errors.phone_number && (
										<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
									)}
								</FormControl>
								<FormControl
									mb={2}
									isInvalid={errors.email_address ? true : false}
								>
									<FormLabel>Email</FormLabel>
									<Input {...register("email_address", { required: true })} />
									{errors.email_address && (
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
								<FormControl
									mb={2}
									isInvalid={errors.cargo_type_id ? true : false}
								>
									<FormLabel>ID типа груза</FormLabel>
									<Input
										type="number"
										{...register("cargo_type_id", { required: true })}
									/>
									{errors.cargo_type_id && (
										<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
									)}
								</FormControl>
								<FormControl isInvalid={errors.city_id ? true : false}>
									<FormLabel>ID города</FormLabel>
									<Input
										type="number"
										{...register("city_id", { required: true })}
									/>
									{errors.city_id && (
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
	item: Customer;
	getData: () => void;
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<Customer>({
		defaultValues: item,
	});
	const onSubmit = handleSubmit(async data => {
		try {
			await axios.post(
				`${config.apiUrl}/customers/edit`,
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
				<Td>{item.full_name}</Td>
				<Td>{item.phone_number}</Td>
				<Td>{item.email_address}</Td>
				<Td>{item.city_id}</Td>
				<Td>
					<Stack direction={"row"} spacing={1}>
						<IconButton onClick={onOpen} aria-label="">
							<EditIcon />
						</IconButton>
						<IconButton
							onClick={async () => {
								await axios.post(
									`${config.apiUrl}/customers/delete`,
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
							<FormControl mb={2} isInvalid={errors.full_name ? true : false}>
								<FormLabel>ФИО</FormLabel>
								<Input {...register("full_name", { required: true })} />
								{errors.full_name && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
							<FormControl
								mb={2}
								isInvalid={errors.phone_number ? true : false}
							>
								<FormLabel>Номер телефона</FormLabel>
								<Input {...register("phone_number", { required: true })} />
								{errors.phone_number && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
							<FormControl
								mb={2}
								isInvalid={errors.email_address ? true : false}
							>
								<FormLabel>Email</FormLabel>
								<Input {...register("email_address", { required: true })} />
								{errors.email_address && (
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
							<FormControl
								mb={2}
								isInvalid={errors.cargo_type_id ? true : false}
							>
								<FormLabel>ID типа груза</FormLabel>
								<Input
									type="number"
									{...register("cargo_type_id", { required: true })}
								/>
								{errors.cargo_type_id && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
							<FormControl isInvalid={errors.city_id ? true : false}>
								<FormLabel>ID города</FormLabel>
								<Input
									type="number"
									{...register("city_id", { required: true })}
								/>
								{errors.city_id && (
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

export default Customers;
