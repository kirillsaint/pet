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
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import config from "../../config";
import auth from "../../lib/auth";
import Depo from "../../types/Depo";
import Driver from "../../types/Driver";
import Vehicle from "../../types/Vehicle";

function Vehicles() {
	const [data, setData] = useState<Vehicle[] | null>(null);
	const [depos, setDepos] = useState<Depo[]>([]);
	const [drivers, setDrivers] = useState<Driver[]>([]);

	const getData = async () => {
		try {
			const { data: res } = await axios.get(`${config.apiUrl}/vehicles`, {
				headers: {
					Authorization: auth.getPassword(),
				},
			});

			const { data: drivers } = await axios.get(`${config.apiUrl}/drivers`, {
				headers: {
					Authorization: auth.getPassword(),
				},
			});

			const { data: depos } = await axios.get(`${config.apiUrl}/depos`, {
				headers: {
					Authorization: auth.getPassword(),
				},
			});

			setData(res.data);
			setDrivers(drivers.data);
			setDepos(depos.data);
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
	} = useForm<Vehicle>({
		defaultValues: {
			capacity_id: 0,
		},
	});
	const onSubmit = handleSubmit(async data => {
		try {
			await axios.post(`${config.apiUrl}/vehicles/create`, data, {
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
							<Th>Фирма и марка</Th>
							<Th>Номер</Th>
							<Th>Депо</Th>
							<Th>Водитель</Th>
							<Th>Действия</Th>
						</Tr>
					</Thead>
					<Tbody>
						{data.map(item => (
							<TableItem
								drivers={drivers}
								depos={depos}
								item={item}
								getData={getData}
							/>
						))}
					</Tbody>
				</Table>
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Создать транспорт</ModalHeader>
						<ModalCloseButton />
						<form onSubmit={onSubmit}>
							<ModalBody>
								<FormControl mb={2} isInvalid={errors.firm_mark ? true : false}>
									<FormLabel>Фирма и марка</FormLabel>
									<Input {...register("firm_mark", { required: true })} />
									{errors.firm_mark && (
										<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
									)}
								</FormControl>
								<FormControl
									mb={2}
									isInvalid={errors.state_number ? true : false}
								>
									<FormLabel>Номера</FormLabel>
									<Input {...register("state_number", { required: true })} />
									{errors.state_number && (
										<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
									)}
								</FormControl>

								<FormControl isInvalid={errors.depo_id ? true : false}>
									<FormLabel>ID Депо</FormLabel>
									<Input
										type="number"
										{...register("depo_id", { required: true })}
									/>
									{errors.depo_id && (
										<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
									)}
								</FormControl>
								<FormControl isInvalid={errors.driver_id ? true : false}>
									<FormLabel>ID Водителя</FormLabel>
									<Input
										type="number"
										{...register("driver_id", { required: true })}
									/>
									{errors.driver_id && (
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
	depos,
	drivers,
}: {
	item: Vehicle;
	getData: () => void;
	drivers: Driver[];
	depos: Depo[];
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<Vehicle>({
		defaultValues: item,
	});
	const onSubmit = handleSubmit(async data => {
		try {
			await axios.post(
				`${config.apiUrl}/vehicles/edit`,
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
				<Td>{item.firm_mark}</Td>
				<Td>{item.state_number}</Td>
				<Td>
					<Tooltip label={`ID: ${item.depo_id}`}>
						{depos.find(d => d.id === item.depo_id)?.depo_name || "Неизвестно"}
					</Tooltip>
				</Td>
				<Td>
					<Tooltip label={`ID: ${item.driver_id}`}>
						{drivers.find(d => d.id === item.driver_id)?.full_name ||
							"Неизвестно"}
					</Tooltip>
				</Td>
				<Td>
					<Stack direction={"row"} spacing={1}>
						<IconButton onClick={onOpen} aria-label="">
							<EditIcon />
						</IconButton>
						<IconButton
							onClick={async () => {
								await axios.post(
									`${config.apiUrl}/vehicles/delete`,
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
							<FormControl mb={2} isInvalid={errors.firm_mark ? true : false}>
								<FormLabel>Фирма и марка</FormLabel>
								<Input {...register("firm_mark", { required: true })} />
								{errors.firm_mark && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
							<FormControl
								mb={2}
								isInvalid={errors.state_number ? true : false}
							>
								<FormLabel>Номера</FormLabel>
								<Input {...register("state_number", { required: true })} />
								{errors.state_number && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>

							<FormControl isInvalid={errors.depo_id ? true : false}>
								<FormLabel>ID Депо</FormLabel>
								<Input
									type="number"
									{...register("depo_id", { required: true })}
								/>
								{errors.depo_id && (
									<FormErrorMessage>Это поле обязтельное</FormErrorMessage>
								)}
							</FormControl>
							<FormControl isInvalid={errors.driver_id ? true : false}>
								<FormLabel>ID Водителя</FormLabel>
								<Input
									type="number"
									{...register("driver_id", { required: true })}
								/>
								{errors.driver_id && (
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

export default Vehicles;
