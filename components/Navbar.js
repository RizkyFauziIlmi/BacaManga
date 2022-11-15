import { Button, Drawer, DrawerCloseButton, DrawerBody, DrawerContent, DrawerOverlay, Flex, Heading, IconButton, Input, InputGroup, InputRightElement, useDisclosure, VStack, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { BsSearch, BsSun, BsMoon } from 'react-icons/bs'

export default function Navbar() {
    const router = useRouter()
    const [input, setInput] = useState("")
    const btnRef = useRef()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode() 

    return (
        <>
            <Flex display={['none', 'none', 'flex', 'flex']} flexDir={'column'} boxShadow={'dark-lg'} minWidth={'20%'} height={"100vh"} overflowY={'auto'} p={'1rem'}>
                <Heading size={'lg'} cursor={'pointer'} textAlign={'center'} p={'1rem'} onClick={() => router.push("/")}>BacaManga</Heading>
                <InputGroup>
                    <Input type={'text'} placeholder="Search manga" onChange={(event) => setInput(event.target.value)} />
                    <InputRightElement>
                        <IconButton icon={<BsSearch/>} onClick={() => router.push(`/search/${input}`)} />
                    </InputRightElement>
                </InputGroup>
                <Flex flexDir={'column'} gap={'0.5rem'} pt={'2rem'}>
                    <Button variant={router.pathname === "/" ? 'solid' : 'ghost'} onClick={() => router.push('/')}>Home</Button>
                    <Button variant={router.pathname.includes("popular") ? 'solid' : 'ghost'} onClick={() => router.push('/popular')}>Popular</Button>
                    <IconButton icon={colorMode === "dark" ? <BsSun /> : <BsMoon />} onClick={toggleColorMode} variant={'outline'} />
                </Flex>
            </Flex>
            <Flex alignItems={'center'} p={'1rem'} gap={'0.5rem'} boxShadow={'dark-lg'} display={['flex', 'flex', 'none', 'none']}>
                <Heading cursor={'pointer'} size={'md'} onClick={() => router.push("/")}>BacaManga</Heading>
                <InputGroup>
                    <Input type={'text'} placeholder="Search manga" onChange={(event) => setInput(event.target.value)} />
                    <InputRightElement>
                        <IconButton icon={<BsSearch />} onClick={() => router.push(`/search/${input}`)} />
                    </InputRightElement>
                </InputGroup>
                <IconButton ref={btnRef} onClick={onOpen} />
                <Drawer
                    isOpen={isOpen}
                    placement='right'
                    onClose={onClose}
                    size={'xs'}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerBody>
                            <Flex flexDir={'column'} gap={'0.5rem'} pt={'2rem'}>
                                <Button variant={router.pathname === "/" ? 'solid' : 'ghost'} onClick={() => router.push('/')}>Home</Button>
                                <Button variant={router.pathname.includes("popular") ? 'solid' : 'ghost'} onClick={() => router.push('/popular')}>Popular</Button>
                                <IconButton icon={colorMode === "dark" ? <BsSun /> : <BsMoon />} onClick={toggleColorMode} variant={'outline'} />
                            </Flex>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Flex>
        </>
    )
}