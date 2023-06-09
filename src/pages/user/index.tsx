import {
	Box,
	Button,
	Container,
	Heading,
	Image,
	Stack,
} from "@chakra-ui/react";
import { useContext } from "react";
import auth from "../../lib/auth";
import { AppContext } from "../../providers/AppContext";
import Orders from "./Orders";

function User() {
	const context = useContext(AppContext);

	return (
		<Container p={5} maxW="container.md">
			<Stack
				direction={["column", "row"]}
				spacing={4}
				bgColor={"gray.100"}
				borderRadius={"2xl"}
				mb={4}
				p={5}
				alignItems={"center"}
			>
				<Image src="/assets/images/user.png" w={["full", "150px"]} />
				<Stack direction={"column"} spacing={4}>
					<Stack direction={"column"} spacing={0}>
						<Heading>{context.props.auth?.full_name}</Heading>
						<Heading size="md">
							Телефон: {context.props.auth?.phone_number}
						</Heading>
					</Stack>
				</Stack>
			</Stack>

			<Heading mb={2}>Заявки</Heading>

			<Box mb={2}>
				<Orders />
			</Box>

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

export default User;
