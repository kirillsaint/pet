import { Box, Heading, Image, Stack } from "@chakra-ui/react";

function Taxi() {
	return (
		<>
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
						<Image src="/assets/images/file-354-1602356384962.png" w="350px" />
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
						<Image src="/assets/images/file-690-1602356276037.png" w="400px" />
					</Box>
					<Stack direction={"column"} spacing={4}>
						<Stack alignItems={"center"} direction={"row"} spacing={4}>
							<Heading>Вместительный автомобиль</Heading>
							<Stack direction={"row"} spacing={2}>
								<Image src="/assets/images/package.png" w="64px" h="64px" />
								<Image src="/assets/images/sofa.png" w="64px" h="64px" />
								<Image src="/assets/images/dishwasher.png" w="64px" h="64px" />
								<Image src="/assets/images/wood.png" w="64px" h="64px" />
							</Stack>
						</Stack>
						<Heading size={"sm"}>
							Подходит практически для любых видов городских грузоперевозок, так
							как с лёгкостью вмещает в себя самые разнообразные предметы.
						</Heading>
					</Stack>
				</Stack>
				<Stack direction={"row"} spacing={8}>
					<Box bgColor={"white"} borderRadius={"3xl"} p={4}>
						<Image src="/assets/images/file-630-1602583708498.png" w="400px" />
					</Box>
					<Stack direction={"column"} spacing={4}>
						<Stack alignItems={"center"} direction={"row"} spacing={4}>
							<Heading>Термофургон</Heading>
							<Stack direction={"row"} spacing={2}>
								<Image src="/assets/images/thermometer.png" w="64px" h="64px" />
								<Image src="/assets/images/sprout.png" w="64px" h="64px" />
							</Stack>
						</Stack>
						<Heading size={"sm"}>
							Изотермический фургон - грузовой автомобиль, который
							предназначается для перевозки продовольственных и
							непродовольственных грузов.
						</Heading>
					</Stack>
				</Stack>
			</Stack>
		</>
	);
}

export default Taxi;
