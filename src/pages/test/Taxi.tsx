import { Box, Heading, Image, Stack } from "@chakra-ui/react";
import Header from "../../components/Header";

function Taxi() {
	return (
		<>
			<Header />
			<Box paddingInlineStart={4} paddingInlineEnd={4} pt={32}>
				<Stack
					w="full"
					h="full"
					bgColor="gray.100"
					p={4}
					borderRadius={"2xl"}
					direction={"column"}
					spacing={4}
				>
					<Stack direction={"row"} spacing={8}>
						<Box bgColor={"white"} borderRadius={"3xl"} p={4}>
							<Image
								src="/assets/images/file-354-1602356384962.png"
								w="350px"
							/>
						</Box>
						<Stack direction={"column"} spacing={4}>
							<Stack alignItems={"center"} direction={"row"} spacing={4}>
								<Heading>Средний автомобиль</Heading>
								<Stack direction={"row"} spacing={2}>
									<Image src="/assets/images/sofa.png" w="64px" h="64px" />
								</Stack>
							</Stack>
							<Heading size={"sm"}>
								Небольшая и очень мобильная машина.
								<br />
								Хватает для переезда среднего масштаба.
							</Heading>
						</Stack>
					</Stack>

					<Stack direction={"row"} spacing={8}>
						<Box bgColor={"white"} borderRadius={"3xl"} p={4}>
							<Image
								src="/assets/images/file-690-1602356276037.png"
								w="400px"
							/>
						</Box>
						<Stack direction={"column"} spacing={4}>
							<Stack alignItems={"center"} direction={"row"} spacing={4}>
								<Heading>Вместительный автомобиль</Heading>
								<Stack direction={"row"} spacing={2}>
									<Image src="/assets/images/package.png" w="64px" h="64px" />
									<Image src="/assets/images/sofa.png" w="64px" h="64px" />
									<Image
										src="/assets/images/dishwasher.png"
										w="64px"
										h="64px"
									/>
									<Image src="/assets/images/wood.png" w="64px" h="64px" />
								</Stack>
							</Stack>
							<Heading size={"sm"}>
								Небольшая и очень мобильная машина.
								<br />
								Хватает для переезда среднего масштаба.
							</Heading>
						</Stack>
					</Stack>
				</Stack>
			</Box>
		</>
	);
}

export default Taxi;
