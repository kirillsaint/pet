import { Heading, Stack } from "@chakra-ui/react";

function Footer() {
	return (
		<Stack
			direction={["column", "row"]}
			justifyContent={"space-between"}
			bgColor={"black"}
			paddingInlineStart={4}
			paddingInlineEnd={4}
			pt={2}
			pb={2}
			alignItems={["start", "center"]}
		>
			<Stack direction={"column"} spacing={0}>
				<Heading color="white" size="lg">
					© FASTGRUZ 2023
				</Heading>
				<Heading color="white" size="sm">
					ИП Андреев М. В
				</Heading>
			</Stack>
			<Stack direction={"column"} spacing={0}>
				<Heading color="white" size="lg">
					Контакты
				</Heading>
				<Heading color="white" size="sm">
					+7(908)-xxx-xx-xx
				</Heading>
				<Heading color="white" size="sm">
					fastgruz@mail.ru
				</Heading>
			</Stack>
		</Stack>
	);
}

export default Footer;
