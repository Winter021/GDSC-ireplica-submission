// pages/_app.js
import { ChakraProvider,extendTheme } from '@chakra-ui/react'

const colors = {
  brands :{
    900:"#1a365d",
    800:"#153e75",
    700:"#2a69ac",
  }
}
const theme = extendTheme({colors});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp