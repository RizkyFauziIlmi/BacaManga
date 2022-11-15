import { Flex, Image, Heading, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Card({ value, url }) {
    const [noOfLines, setNoOfLines] = useState(2)
    const router = useRouter()

    return (
        <Flex justifyContent={"space-between"} boxShadow={'dark-lg'} p={'1rem'} flexDir={'column'}>
            <Flex flexDir={'column'} height={["30vh","30vh","40vh","40vh"]}>
                <Image borderRadius={"0.5rem"} boxShadow={'dark-lg'} height={'50%'} src={value.thumb} alt={value.title} />
                <Heading cursor={'pointer'} noOfLines={noOfLines} onClick={() => {
                    if (noOfLines === 2) {
                        setNoOfLines(10)
                    } else {
                        setNoOfLines(2)
                    }
                }} size={'sm'} pt={'0.5rem'}>{value.title}</Heading>
                <Flex flexDir={'column'} pt={'0.3rem'} pb={'1rem'}>
                    <Text>Type: {value?.type}</Text>
                    <Text>{value?.upload_on || value?.updated_on}</Text>
                </Flex>
            </Flex>
            <Button width={"100%"} colorScheme={'green'} onClick={() => router.push(url)}>See More</Button>
        </Flex>
    )
}