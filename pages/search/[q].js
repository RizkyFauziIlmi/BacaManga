import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Card from "../../components/Card";

export default function Search({ datas }) {
    const router = useRouter()
    const { q } = router.query

    return (
        <>
            <Head>
                <title>{`Search | ${q}`}</title>    
            </Head>        
            <Flex flexDir={'column'} alignItems={'center'} overflowY={"auto"} width={'100%'} height={'100vh'} p={'3rem'}>
                <Heading textAlign={'center'} width={'100%'} fontSize={'lg'} p={'0.5rem '}>{`Search for '${q}' (${datas?.manga_list.length})`}</Heading>
                <Grid gap={'1rem'} templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']}>
                    {datas?.manga_list.map((value, index) => {
                        return (
                            <GridItem key={index}>
                                <Card value={value} url={`/manga/${value.endpoint}`} />
                            </GridItem>
                        )
                    })}
                </Grid>
            </Flex>
        </>
    )
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { q: "komi san" || null } }
        ],
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { params } = context
    const response = await fetch(`https://manga-api-nine.vercel.app/api/search/${params.q}`)
    const data = await response.json()

    return {
        props: {
            datas: data
        },
        revalidate: 60
    }

}