import "@/styles/globals.css";
import { ChakraProvider } from '@chakra-ui/react'
import { MealListProvider } from '@/context/MealListContext'
import Navigation from '@/components/Navigation'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <MealListProvider>
        <Navigation />
        <Component {...pageProps} />
      </MealListProvider>
    </ChakraProvider>
  );
}
