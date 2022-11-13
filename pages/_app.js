import Navbar from '../components/Navbar'
import '../styles/globals.css'
import { ChakraProvider, Flex } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Flex width={'100vw'}>
        <Navbar />
        <Component {...pageProps} />
      </Flex>
    </ChakraProvider>
  )
}

export default MyApp
