import { Flex, Image, Heading, Text, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function Card({ value }) {
    const [noOfLines, setNoOfLines] = useState(2)

    return (
        <Flex justifyContent={"space-between"} minHeight={"50vh"} overflowY={'auto'} maxHeight={"50vh"} boxShadow={'dark-lg'} p={'1rem'} flexDir={'column'}>
            <Flex flexDir={'column'}>
                <Image borderRadius={"0.5rem"} src={value.thumb} alt={value.title} />
                <Heading cursor={'pointer'} noOfLines={noOfLines} onClick={() => {
                    if (noOfLines === 2) {
                        setNoOfLines(10)
                    } else {
                        setNoOfLines(2)
                    }
                }} size={'sm'} pt={'0.5rem'}>{value.title}</Heading>
                <Flex flexDir={'column'} pt={'0.3rem'} pb={'1rem'}>
                    <Text>Type: {value?.type}</Text>
                    <Text>last updated: {value?.upload_on}</Text>
                </Flex>
            </Flex>
            <Button width={"100%"}>See More</Button>
        </Flex>
    )
}