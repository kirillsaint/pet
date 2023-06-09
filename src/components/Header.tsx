import { Heading, Image, Link, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { Link as RLink, useLocation } from "react-router-dom";
import { AppContext } from "../providers/AppContext";

function Header() {
	const location = useLocation();
	const context = useContext(AppContext);
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
				<Link
					_hover={{
						textDecoration: "none",
					}}
					as={RLink}
					to="/"
				>
					<Stack alignItems={"center"} direction={"column"} spacing={1}>
						<Image src="/assets/images/package.png" w={12} />
						<Heading size={"sm"}>FASTGRUZ</Heading>
					</Stack>
				</Link>
				<Stack display={["none", "flex"]} direction={"row"} spacing={4}>
					<Link
						fontSize={"2xl"}
						fontWeight={"bold"}
						borderBottom={
							location.pathname === "/" ? "4px solid orange" : "none"
						}
						_hover={{
							textDecoration: "none",
							color: "gray.900",
						}}
						as={RLink}
						to="/"
					>
						Главная
					</Link>
					<Link
						fontSize={"2xl"}
						fontWeight={"bold"}
						borderBottom={
							location.pathname === "/taxi" ? "4px solid orange" : "none"
						}
						_hover={{
							textDecoration: "none",
							color: "gray.900",
						}}
						as={RLink}
						to="/taxi"
					>
						Автопарк
					</Link>
				</Stack>
			</Stack>
			<Link
				fontSize={context.props.auth ? "xl" : "2xl"}
				fontWeight={"bold"}
				as={RLink}
				to="/lk"
			>
				{context.props.auth ? "ЛИЧНЫЙ КАБИНЕТ" : "ВХОД"}
			</Link>
		</Stack>
	);
}

export default Header;
