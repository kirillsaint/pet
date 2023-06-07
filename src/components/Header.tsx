import { Heading, Image, Link, Stack } from "@chakra-ui/react";
import { Link as RLink, useLocation } from "react-router-dom";

function Header() {
	const location = useLocation();
	return (
		<Stack
			h={24}
			borderBottom={"4px solid black"}
			justifyContent={"space-between"}
			direction={"row"}
			position={"fixed"}
			w="full"
			p={2}
			alignItems={"center"}
			paddingInlineStart={2}
			paddingInlineEnd={8}
			bg="white"
			zIndex={999}
		>
			<Stack h="full" alignItems={"center"} direction={"row"} spacing={8}>
				<Stack alignItems={"center"} direction={"column"} spacing={1}>
					<Image src="/assets/images/package.png" w={12} />
					<Heading size={"sm"}>FASTGRUZ</Heading>
				</Stack>
				<Stack direction={"row"} spacing={4}>
					<Link
						fontSize={"2xl"}
						fontWeight={"bold"}
						borderBottom={
							location.pathname === "/test" ? "4px solid orange" : "none"
						}
						_hover={{
							textDecoration: "none",
							color: "gray.900",
						}}
						as={RLink}
						to="/test"
					>
						Главная
					</Link>
					<Link
						fontSize={"2xl"}
						fontWeight={"bold"}
						borderBottom={
							location.pathname === "/test/taxi" ? "4px solid orange" : "none"
						}
						_hover={{
							textDecoration: "none",
							color: "gray.900",
						}}
						as={RLink}
						to="/test/taxi"
					>
						Таксопарк
					</Link>
				</Stack>
			</Stack>
			<Link fontSize={"2xl"} fontWeight={"bold"} as={RLink} to="/">
				ВХОД
			</Link>
		</Stack>
	);
}

export default Header;
