import { CheckIcon } from "@chakra-ui/icons";
import {
	Center,
	IconButton,
	Spinner,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import config from "../../config";
import auth from "../../lib/auth";
import Order from "../../types/Order";

function Orders() {
	const [data, setData] = useState<Order[] | null>(null);

	const getData = async () => {
		try {
			const { data: res } = await axios.get(`${config.apiUrl}/driver/orders`, {
				headers: {
					Authorization: auth.getPassword(),
				},
			});

			setData(res.orders);
		} catch {}
	};

	useEffect(() => {
		getData();
	}, []);

	return data !== null ? (
		<>
			<TableContainer>
				<Table>
					<Thead>
						<Tr>
							<Th>ID</Th>
							<Th>ФИО Получателя</Th>
							<Th>Номер телефона получателя</Th>
							<Th>Дата доставки</Th>
							<Th>Адрес погрузки</Th>
							<Th>Адрес выгрузки</Th>
							<Th>Цена</Th>
							<Th>Статус</Th>
							<Th>Действия</Th>
						</Tr>
					</Thead>
					<Tbody>
						{data.map(item => (
							<TableItem item={item} getData={getData} />
						))}
					</Tbody>
				</Table>
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
	return (
		<>
			<Tr>
				<Td>{item.id}</Td>
				<Td>{item.recipient_full_name}</Td>
				<Td>{item.recipient_phone_number}</Td>
				<Td>{moment(item.delivery_date).format("LLL")}</Td>
				<Td>{item.loading_address}</Td>
				<Td>{item.unloading_address}</Td>
				<Td>{item.cost || "Неизвестно"}</Td>
				<Td>
					{item.status === "delivered"
						? "Доставлен"
						: "В ожидании " + (item.driver_id ? "доставки" : "водителя")}
				</Td>
				<Td>
					{item.status === "pending" && (
						<IconButton
							aria-label=""
							icon={<CheckIcon />}
							onClick={async () => {
								try {
									if (item.driver_id) {
										await axios.post(
											`${config.apiUrl}/driver/delivery_order`,
											{
												id: item.id,
											},
											{
												headers: {
													Authorization: auth.getPassword(),
												},
											}
										);
									} else {
										await axios.post(
											`${config.apiUrl}/driver/accept_order`,
											{
												id: item.id,
											},
											{
												headers: {
													Authorization: auth.getPassword(),
												},
											}
										);
									}
								} catch (error) {}
								getData();
							}}
						></IconButton>
					)}
				</Td>
			</Tr>
		</>
	);
}

export default Orders;
