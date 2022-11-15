import { Flex, Grid, Image, GridItem, Heading, Text, Button, IconButton } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import Card from "../../components/Card"

export default function Popular({ datas }) {
    const [currentPage, setCurrentPage] = useState(1)
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Popular</title>
            </Head>
            <Flex flexDir={'column'} alignItems={'center'} overflowY={"auto"} height={'100vh'} p={'3rem'}>
                <Grid templateColumns={['repeat(1, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)','repeat(3, 1fr)']} gap={'1rem'}>
                    {datas?.manga_list.map((value, index) => {
                        return (
                            <GridItem key={index}>
                                <Card value={value} url={`/manga/${value.endpoint}`}/>
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
                    <IconButton isDisabled={currentPage >= 30 ? true : false} onClick={() => {
                        setCurrentPage(currentPage + 1)
                        router.push(`/popular/${currentPage + 1}`)
                    }} />
                </Flex>
            </Flex>
        </>
    )
}

export async function getServerSideProps() {
    const response = await fetch("https://manga-api-nine.vercel.app/api/manga/popular/1")
    const data = await response.json()

    return {
        props: {
            datas: data
        }
    }
}