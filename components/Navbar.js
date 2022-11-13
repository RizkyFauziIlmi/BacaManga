import { Button, Flex, IconButton, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navbar() {
    const router = useRouter()
    const [active, setActive] = useState("home")
    return(
        <Flex flexDir={'column'} boxShadow={'dark-lg'} minWidth={'20%'} height={"100vh"} overflowY={'auto'} p={'1rem'}>
            <InputGroup>
                <Input placeholder="Search manga"/>
                <InputRightElement>
                    <IconButton />
                </InputRightElement>
            </InputGroup>
            <Flex flexDir={'column'} gap={'0.5rem'} pt={'2rem'}>
                <Button variant={router.pathname.includes("home") ? 'solid' : 'ghost'} onClick={() => router.push('/home')}>Home</Button>
                <Button variant={router.pathname.includes("popular") ? 'solid' : 'ghost'} onClick={() => router.push('/popular')}>Popular</Button>
            </Flex>
        </Flex>
    )
}