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
	Select,
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
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import config from "../../config";
import auth from "../../lib/auth";
import { AppContext, IUser } from "../../providers/AppContext";

function Drivers() {
	const [data, setData] = useState<IUser[] | null>(null);

	const getData = async () => {
		try {
			const { data: res } = await axios.get(`${config.apiUrl}/drivers`, {
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
	const toast = useToast();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<IUser>();
	const onSubmit = handleSubmit(async data => {
		try {
			await axios.post(`${config.apiUrl}/drivers/create`, data, {
				headers: {
					Authorization: auth.getPassword(),
				},
			});
			await getData();
			reset();
			onClose();
			toast({
				title: "Успех!",
				description: "Водитель успешно создан",
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

	const context = useContext(AppContext);

	return data !== null ? (
		<TableContainer>
			<Button w="full" onClick={onOpen}>
				Создать
			</Button>
			<Table>
				<Thead>
					<Tr>
						<Th>ID</Th>
						<Th>ФИО</Th>
						<Th>Номер телефона</Th>
						<Th>Паспорт</Th>
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
					<ModalHeader>Создать водителя</ModalHeader>
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
								isInvalid={errors.email_address ? true : false}
							>
								<FormLabel>Email</FormLabel>
								<Input {...register("email_address", { required: true })} />
								{errors.email_address && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>

							<FormControl
								mb={2}
								isInvalid={errors.phone_number ? true : false}
							>
								<FormLabel>Номер телефона</FormLabel>
								<Input
									type="number"
									{...register("phone_number", { required: true })}
								/>
								{errors.phone_number && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
							<FormControl mb={2} isInvalid={errors.passport ? true : false}>
								<FormLabel>Паспорт</FormLabel>
								<Input {...register("passport", { required: true })} />
								{errors.passport && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
							<FormControl mb={2} isInvalid={errors.city_id ? true : false}>
								<FormLabel mb={0}>Город</FormLabel>
								<Select
									placeholder="Выберите город"
									{...register("city_id", { required: true })}
								>
									{context.props.cities.map(city => (
										<option value={city.id}>{city.city_name}</option>
									))}
								</Select>
								{errors.city_id && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
							<FormControl mb={2} isInvalid={errors.password ? true : false}>
								<FormLabel>Пароль</FormLabel>
								<Input {...register("password", { required: true })} />
								{errors.password && (
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
	item: IUser;
	getData: () => void;
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<IUser>({
		defaultValues: item,
	});
	const onSubmit = handleSubmit(async data => {
		try {
			await axios.post(
				`${config.apiUrl}/drivers/edit`,
				{
					...data,
					id: item.id,
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
				description: "Водитель успешно изменен",
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

	const context = useContext(AppContext);

	return (
		<>
			<Tr>
				<Td>{item.id}</Td>
				<Td>{item.full_name}</Td>
				<Td>{item.phone_number}</Td>
				<Td>{item.passport}</Td>
				<Td>
					<Stack direction={"row"} spacing={1}>
						<IconButton onClick={onOpen} aria-label="">
							<EditIcon />
						</IconButton>
						<IconButton
							onClick={async () => {
								await axios.post(
									`${config.apiUrl}/drivers/delete`,
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
								isInvalid={errors.email_address ? true : false}
							>
								<FormLabel>Email</FormLabel>
								<Input {...register("email_address", { required: true })} />
								{errors.email_address && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
							<FormControl
								mb={2}
								isInvalid={errors.phone_number ? true : false}
							>
								<FormLabel>Номер телефона</FormLabel>
								<Input
									type="number"
									{...register("phone_number", { required: true })}
								/>
								{errors.phone_number && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
							<FormControl mb={2} isInvalid={errors.passport ? true : false}>
								<FormLabel>Паспорт</FormLabel>
								<Input {...register("passport", { required: true })} />
								{errors.passport && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
							<FormControl mb={2} isInvalid={errors.city_id ? true : false}>
								<FormLabel mb={0}>Город</FormLabel>
								<Select
									placeholder="Выберите город"
									{...register("city_id", { required: true })}
								>
									{context.props.cities.map(city => (
										<option value={city.id}>{city.city_name}</option>
									))}
								</Select>
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

export default Drivers;
