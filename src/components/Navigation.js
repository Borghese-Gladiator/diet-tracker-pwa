import { Box, Tabs, TabList, Tab, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.800');
  const activeColor = useColorModeValue('blue.500', 'blue.200');

  const links = [
    { href: '/foods', label: 'Nutrition Info' },
    { href: '/', label: 'Track Meal' },
    { href: '/meals', label: 'Meal History' },
    { href: '/graph', label: 'Graph' },
  ];

  const handleTabChange = (index) => {
    router.push(links[index].href);
  };

  const currentIndex = links.findIndex(link => link.href === router.pathname);

  return (
    <Box bg={bgColor} px={4} py={2} boxShadow="sm">
      <Box maxW="container.md" mx="auto">
        <Tabs 
          index={currentIndex} 
          onChange={handleTabChange}
          variant="soft-rounded"
          colorScheme="blue"
          align="center"
        >
          <TabList>
            {links.map(({ label }) => (
              <Tab key={label}>{label}</Tab>
            ))}
          </TabList>
        </Tabs>
      </Box>
    </Box>
  );
} 