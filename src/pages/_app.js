import "@/styles/globals.css";
import { ChakraProvider } from '@chakra-ui/react'
import { MealProvider } from '@/context/MealContext'
import Navigation from '@/components/Navigation'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <MealProvider>
        <Navigation />
        <Component {...pageProps} />
      </MealProvider>
    </ChakraProvider>
  );
}
