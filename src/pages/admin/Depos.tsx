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
import Depo from "../../types/Depo";

function Depos() {
	const [data, setData] = useState<Depo[] | null>(null);

	const getData = async () => {
		try {
			const { data: res } = await axios.get(`${config.apiUrl}/depos`, {
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
	} = useForm<Depo>();
	const onSubmit = handleSubmit(async data => {
		try {
			await axios.post(`${config.apiUrl}/depos/create`, data, {
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
							<Th>Название</Th>
							<Th>Адрес</Th>

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
								<FormControl mb={2} isInvalid={errors.depo_name ? true : false}>
									<FormLabel>Название</FormLabel>
									<Input {...register("depo_name", { required: true })} />
									{errors.depo_name && (
										<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
									)}
								</FormControl>
								<FormControl
									mb={2}
									isInvalid={errors.depo_address ? true : false}
								>
									<FormLabel>Адрес</FormLabel>
									<Input {...register("depo_address", { required: true })} />
									{errors.depo_address && (
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
	item: Depo;
	getData: () => void;
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<Depo>({
		defaultValues: {
			depo_name: item.depo_name,
			depo_address: item.depo_address,
		},
	});
	const onSubmit = handleSubmit(async data => {
		try {
			await axios.post(
				`${config.apiUrl}/depos/edit`,
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
				<Td>{item.depo_name}</Td>
				<Td>{item.depo_address}</Td>

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
							<FormControl mb={2} isInvalid={errors.depo_name ? true : false}>
								<FormLabel>Название</FormLabel>
								<Input {...register("depo_name", { required: true })} />
								{errors.depo_name && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
							<FormControl
								mb={2}
								isInvalid={errors.depo_address ? true : false}
							>
								<FormLabel>Адрес</FormLabel>
								<Input {...register("depo_address", { required: true })} />
								{errors.depo_address && (
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

export default Depos;
