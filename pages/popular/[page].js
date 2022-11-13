import { useRouter } from "next/router"
import { Flex, Grid, GridItem, Image, Heading, Text, Button, IconButton } from '@chakra-ui/react'
import { useState } from "react"
import Head from "next/head"
import Card from "../../components/Card"

export default function PopularPage({ datas }) {
    const router = useRouter()
    const { page } = router.query
    const [currentPage, setCurrentPage] = useState(parseInt(page))

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
                                <Card value={value} />
                            </GridItem>
                        )
                    })}
                </Grid>
                <Flex gap={'0.5rem'} p={'2rem'}>
                    <IconButton isDisabled={currentPage <= 1 ? true : false} onClick={() => {
                        setCurrentPage(currentPage - 1)
                        router.push(`/popular/${currentPage - 1}`)
                    }} />
                    <Heading>{currentPage}</Heading>
                    <IconButton isDisabled={currentPage >= 29 ? true : false} onClick={() => {
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