import { Flex, Grid, GridItem } from "@chakra-ui/react"
import Head from "next/head"
import Card from "../../components/Card"

export default function Rekomendasi({ datas }) {
    return (
        <>
            <Head>
                <title>Rekomendasi</title>
            </Head>
            <Flex flexDir={'column'} alignItems={'center'} overflowY={"auto"} height={'100vh'} p={'3rem'}>
                <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={'1rem'}>
                    {datas?.manga_list.map((value, index) => {
                        return (
                            <GridItem key={index}>
                                <Card value={value} url={`/manga/${value.endpoint.replace("https://komiku.id", "")}`} />
                            </GridItem>
                        )
                    })}
                </Grid>
            </Flex>
        </>
    )
}

export async function getServerSideProps() {
    const response = await fetch("https://manga-api-nine.vercel.app/api/manga/recommended")
    const data = await response.json()

    return {
        props: {
            datas: data
        }
    }
}