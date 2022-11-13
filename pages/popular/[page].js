import { useRouter } from "next/router"
import { Flex, Grid, GridItem, Image, Heading, Text, Button, IconButton, Skeleton } from '@chakra-ui/react'
import { useEffect, useState } from "react"
import Head from "next/head"

export default function PopularPage({ datas }) {
    const router = useRouter()
    const { page } = router.query
    const [currentPage, setCurrentPage] = useState(parseInt(page))
    const [loading, setLoading] = useState(false)

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

    }, [page, router.asPath, router.events])

    return (
        <>
            <Head>
                <title>Popular | {page}</title>
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
                    <IconButton isDisabled={currentPage >= 29 || loading ? true : false} onClick={() => {
                        setCurrentPage(currentPage + 1)
                        router.push(`/popular/${currentPage + 1}`)
                    }} />
                </Flex>
            </Flex>
        </>
    )
}

export async function getStaticPaths() {
    return {
        paths: [
            {
                params: { page: "1" }
            },
            {
                params: { page: "2" }
            },
            {
                params: { page: "3" }
            },
            {
                params: { page: "4" }
            },
            {
                params: { page: "5" }
            },
            {
                params: { page: "6" }
            },
            {
                params: { page: "7" }
            },
            {
                params: { page: "8" }
            },
            {
                params: { page: "9" }
            },
            {
                params: { page: "10" }
            },
            {
                params: { page: "11" }
            },
            {
                params: { page: "12" }
            },
            {
                params: { page: "13" }
            },
            {
                params: { page: "14" }
            },
            {
                params: { page: "15" }
            },
            {
                params: { page: "16" }
            },
            {
                params: { page: "17" }
            },
            {
                params: { page: "18" }
            },
            {
                params: { page: "19" }
            },

            {
                params: { page: "20" }
            },
            {
                params: { page: "21" }
            },
            {
                params: { page: "22" }
            },
            {
                params: { page: "23" }
            },

            {
                params: { page: "24" }
            },
            {
                params: { page: "25" }
            },
            {
                params: { page: "26" }
            },

            {
                params: { page: "27" }
            },
            {
                params: { page: "28" }
            },
            {
                params: { page: "29" }
            },
            {
                params: { page: "30" }
            },

        ],
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { params } = context
    const response = await fetch(`https://manga-api-one.vercel.app/api/manga/popular/${params.page}`)
    const datas = await response.json()

    return {
        props: {
            datas
        },
        revalidate: 60
    }
}