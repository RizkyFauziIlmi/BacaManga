import Navbar from '../components/Navbar'
import '../styles/globals.css'
import { ChakraProvider, Flex, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router.events]);

  return (
    <>
      {loading ? (
        <ChakraProvider>
          <Head>
            <title>Loading...</title>
          </Head>
          <Flex width={'100vw'} flexDir={['column', 'column', 'row', 'row']} height={'100vh'}>
            <Navbar />
            <Flex width={'100%'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
              <Spinner size={'xl'}/>
            </Flex>
          </Flex>
        </ChakraProvider>
      )
        : (
          <ChakraProvider>
            <Flex width={'100vw'} flexDir={['column', 'column', 'row', 'row']} height={'100vh'}>
              <Navbar />
              <Component {...pageProps} />
            </Flex>
          </ChakraProvider>
        )
      }
    </>
  )
}

export default MyApp
