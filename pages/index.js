import { Flex } from "@chakra-ui/react"
import Head from "next/head"

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Flex flexDir={'column'} justifyContent={'center'} overflowY={"auto"} height={'100vh'}>
        home
      </Flex>
    </>
  )
}
