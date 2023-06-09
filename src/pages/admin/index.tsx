import {
	Box,
	Button,
	Container,
	Heading,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import auth from "../../lib/auth";
import Customers from "./Customers";
import Depos from "./Depos";
import Drivers from "./Drivers";
import Orders from "./Orders";
import Vehicles from "./Vehicles";

function Admin() {
	return (
		<Container p={5} maxW="container.md">
			<Heading mb={2}>Информация</Heading>
			<Tabs isLazy variant="soft-rounded" colorScheme="orange">
				<Stack direction={"row"} justifyContent={"space-between"} mb={2}>
					<TabList>
						<Tab>Депо</Tab>
						<Tab>Транспорт</Tab>
						<Tab>Водители</Tab>
						<Tab>Заказчики</Tab>
						<Tab>Заявка</Tab>
					</TabList>
				</Stack>

				<TabPanels mb={2}>
					<TabPanel>
						<Depos />
					</TabPanel>
					<TabPanel>
						<Vehicles />
					</TabPanel>
					<TabPanel>
						<Drivers />
					</TabPanel>
					<TabPanel>
						<Customers />
					</TabPanel>
					<TabPanel>
						<Orders />
					</TabPanel>
				</TabPanels>
			</Tabs>
			<Stack direction={"row"} justifyContent={"space-between"} w="full">
				<Box />
				<Button
					onClick={() => {
						auth.setPassword(null);
						window.location.reload();
					}}
				>
					Выйти
				</Button>
			</Stack>
		</Container>
	);
}

export default Admin;
