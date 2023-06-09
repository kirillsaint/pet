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
import Orders from "./Orders";

function Driver() {
	return (
		<Container p={5} maxW="container.md">
			<Heading mb={2}>Информация</Heading>
			<Tabs isLazy variant="soft-rounded" colorScheme="red">
				<Stack direction={"row"} justifyContent={"space-between"} mb={2}>
					<TabList>
						<Tab>Заказы</Tab>
					</TabList>
				</Stack>

				<TabPanels mb={2}>
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

export default Driver;
