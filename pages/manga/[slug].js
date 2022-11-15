import { Badge, Button, Flex, Heading, Image, ListItem, Text, UnorderedList } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"

export default function Manga({ datas }) {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>{datas?.title}</title>    
            </Head>        
            <Flex width={"100%"} justifyContent={'center'} height={'100vh'} overflow={'auto'}>
                <Flex width={"80%"} overflowX={'hidden'} flexDir={'column'} p={'1rem'} height={'max-content'} alignItems={'center'}>
                    <Heading size={'lg'} textAlign={'center'} pb={'1rem'}>{datas?.title}</Heading>
                    {datas?.status === "End"
                        ? <Flex flexDir={'column'} position={'relative'} overflow={'hidden'}>
                            <Text bgColor={'red.700'} boxShadow={'lg'} position={"absolute"} top={[2,2,5,5]} right={[-8,-8,-10,-10]} textAlign={'center'} width={['70%','70%','65%','65%']} fontWeight={'bold'} p={'0.5rem'} transform={`rotate(40deg)`} >FINISHED</Text>
                            <Image src={datas?.thumb} alt={datas?.title} width={['50vw', '50vw', '20vw', '20vw']} borderRadius={'0.5rem'} boxShadow={"dark-lg"} />
                        </Flex>
                        : <Flex flexDir={'column'} position={'relative'} overflow={'hidden'}>
                            <Text bgColor={'yellow.500'} boxShadow={'lg'} position={"absolute"} top={5} right={-10} textAlign={'center'} width={'65%'} fontWeight={'bold'} p={'0.5rem'} transform={`rotate(40deg)`} >ONGOING</Text>
                            <Image src={datas?.thumb} alt={datas?.title} width={['50vw', '50vw', '20vw', '20vw']} borderRadius={'0.5rem'} boxShadow={"dark-lg"} />
                        </Flex>
                    }
                    <Flex p={'1rem'} gap={'0.5rem'}>
                        {datas?.genre_list.map((value, index) => {
                            return (
                                <Badge key={index}>{value.genre_name}</Badge>
                            )
                        })}
                    </Flex>
                    <Heading size={'lg'}>Detail</Heading>
                    <UnorderedList>
                        <ListItem>
                            <Text>Judul : {datas?.title}</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Tipe  : {datas?.type}</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Author: {datas?.author}</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Status: {datas?.status}</Text>
                        </ListItem>
                    </UnorderedList>
                    <Heading>Sinopsis</Heading>
                    <Text>{datas?.synopsis}</Text>
                    <Flex background={`url(${datas?.thumb})`} ba flexDir={'column'} gap={'1rem'} borderRadius={'1rem'} width={['80vw','80vw','30vw','30vw']} height={'80vh'} boxShadow={'dark-lg'} p={'1rem'} mt={'2rem'} overflowY={'auto'}>
                        {datas?.chapter.map((value, index) => {
                            return (
                                <Flex borderRadius={'0.5rem'} justifyContent={'space-between'} background={`rgba(0,0,0,0.9)`} p={'1rem'} key={index} alignItems={'center'}>
                                    <Text>{value.chapter_title}</Text>
                                    <Button colorScheme={'green'} onClick={() => router.push(`/chapter/${value.chapter_endpoint}`)}>Baca</Button>
                                </Flex>
                            )
                        })}
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: "tensei-shitara-slime-datta-ken-clayman-revenge" || null } }
        ],
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { params } = context
    const response = await fetch(`https://manga-api-nine.vercel.app/api/manga/detail/"${params.slug}/`)
    const data = await response.json()

    return {
        props: {
            datas: data
        },
        revalidate: 60
    }
}