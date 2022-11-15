import { Flex, IconButton, Image, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react"
import { useState } from "react"
import { BsZoomIn, BsZoomOut } from 'react-icons/bs'
import { MdOutlineZoomOutMap } from 'react-icons/md'

export default function Chapter({ datas }) {
    const [zoom, setZoom] = useState(60)

    return (
        <Flex width={'100%'} justifyContent={'center'} overflowY={"auto"}>
            <Flex flexDir={'column'} width={[`${zoom}%`,`${zoom}%`,`${zoom}%`,`${zoom}%`]}>
                {datas?.chapter_image.map((value, index) => {
                    return (
                        <Image key={index} src={value.chapter_image_link} alt={value.chapter_image_link} />
                    )
                })}
            </Flex>
            <Flex gap={'0.5rem'} flexDir={'column'} position={'fixed'} bottom={5} right={[5, 5, 10, 10]}>
                <IconButton icon={<BsZoomIn />} colorScheme={"green"} onClick={() => {
                    if (zoom < 100) {
                        setZoom(zoom + 10)
                    }
                }}/>
                <IconButton icon={<MdOutlineZoomOutMap />} colorScheme={'orange'} onClick={() => {
                    setZoom(100)
                }}/>
                <IconButton icon={<BsZoomOut />} colorScheme={'green'} onClick={() => {
                    if (zoom <= 100 && zoom > 10) {
                        setZoom(zoom - 10)
                    }
                }}/>
            </Flex>
        </Flex>
    )
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: "komi-san-wa-komyushou-desu/" || null, chapter: "komi-san-wa-komyushou-desu-chapter-380/" || null } }
        ],
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { params } = context
    const response = await fetch(`https://manga-api-nine.vercel.app/api/chapter/"${params.chapter}`)
    const data = await response.json()

    return {
        props: {
            datas: data
        }
    }
}