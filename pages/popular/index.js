import { Flex, Grid, Image, GridItem, Heading, Text, Button, IconButton, Skeleton } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Popular({ datas }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const handleStart = (url) => {
            if (url !== router.asPath) {
                setLoading(true)
            }
        }

        const handleComplete = (url) => {
            if (url === router.asPath) {
                setLoading(false)
            }
        }

        router.events.on("routeChangeStart", handleStart)
        router.events.on("routeChangeComplete", handleComplete)

        return () => {
            router.events.off("routeChangeStart", handleStart)
            router.events.off("routeChangeComplete", handleComplete)
        }

    }, [router.asPath, router.events])

    return (
        <>
            <Head>
                <title>Popular</title>
            </Head>
            <Flex flexDir={'column'} alignItems={'center'} overflowY={"auto"} height={'100vh'} p={'5rem'}>
                <Grid templateColumns={'repeat(3, 1fr)'} gap={'1rem'}>
                    {datas?.manga_list.map((value, index) => {
                        return (
                            <GridItem key={index}>
                                <Skeleton isLoaded={!loading}>
                                    <Flex justifyContent={"space-between"} minHeight={"50vh"} overflowY={'auto'} maxHeight={"50vh"} boxShadow={'dark-lg'} p={'1rem'} flexDir={'column'}>
                                        <Flex flexDir={'column'}>
                                            <Image borderRadius={"0.5rem"} src={value.thumb} alt={value.title} />
                                            <Heading noOfLines={2} size={'sm'} pt={'0.5rem'}>{value.title}</Heading>
                                            <Flex flexDir={'column'} pt={'0.3rem'} pb={'1rem'}>
                                                <Text>Type: {value.type}</Text>
                                                <Text>last updated: {value.upload_on}</Text>
                                            </Flex>
                                        </Flex>
                                        <Button width={"100%"}>See More</Button>
                                    </Flex>
                                </Skeleton>
                            </GridItem>
                        )
                    })}
                </Grid>
                <Flex gap={'0.5rem'} p={'2rem'}>
                    <IconButton isDisabled={currentPage <= 1 || loading ? true : false} onClick={() => {
                        setCurrentPage(currentPage - 1)
                        router.push(`/popular/${currentPage - 1}`)
                    }}/>
                    <Heading>{currentPage}</Heading>
                    <IconButton isDisabled={currentPage >= 30 || loading ? true : false} onClick={() => {
                        setCurrentPage(currentPage + 1)
                        router.push(`/popular/${currentPage + 1}`)
                    }} />
                </Flex>
            </Flex>
        </>
    )
}

export async function getStaticProps() {
    const response = await fetch("https://manga-api-one.vercel.app/api/manga/popular/1")
    const datas = await response.json()

    return {
        props: {
            datas
        }
    }
}