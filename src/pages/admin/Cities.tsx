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
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import config from "../../config";
import auth from "../../lib/auth";
import { AppContext } from "../../providers/AppContext";
import City from "../../types/City";

function Cities() {
	const [data, setData] = useState<City[] | null>(null);
	const toast = useToast();

	const getData = async () => {
		try {
			const { data: res } = await axios.get(`${config.apiUrl}/cities`, {
				headers: {
					Authorization: auth.getPassword(),
				},
			});

			setData(res.data);
			if (context.setProps) {
				context.setProps({
					...context.props,
					cities: res.data,
				});
			}
		} catch (error) {
			toast({
				title: "Ошибка!",
				description: `${error}`,
				duration: 3000,
				isClosable: true,
				status: "error",
			});
		}
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
	} = useForm<City>();
	const context = useContext(AppContext);
	const onSubmit = handleSubmit(async data => {
		try {
			await axios.post(`${config.apiUrl}/cities/create`, data, {
				headers: {
					Authorization: auth.getPassword(),
				},
			});
			await getData();
			reset();
			onClose();
			toast({
				title: "Успех!",
				description: "Город успешно создан",
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
							<Th>Название</Th>
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
						<ModalHeader>Создать город</ModalHeader>
						<ModalCloseButton />
						<form onSubmit={onSubmit}>
							<ModalBody>
								<FormControl mb={2} isInvalid={errors.city_name ? true : false}>
									<FormLabel>Название</FormLabel>
									<Input {...register("city_name", { required: true })} />
									{errors.city_name && (
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
	item: City;
	getData: () => void;
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<City>({
		defaultValues: item,
	});
	const toast = useToast();
	const onSubmit = handleSubmit(async data => {
		try {
			await axios.post(
				`${config.apiUrl}/cities/edit`,
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
				description: "Город успешно изменен",
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
				<Td>{item.city_name}</Td>

				<Td>
					<Stack direction={"row"} spacing={1}>
						<IconButton onClick={onOpen} aria-label="">
							<EditIcon />
						</IconButton>
						<IconButton
							onClick={async () => {
								await axios.post(
									`${config.apiUrl}/depos/delete`,
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
							<FormControl mb={2} isInvalid={errors.city_name ? true : false}>
								<FormLabel>Название</FormLabel>
								<Input {...register("city_name", { required: true })} />
								{errors.city_name && (
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

export default Cities;
