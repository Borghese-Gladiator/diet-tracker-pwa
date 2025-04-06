import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMealList } from '@/context/MealListContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Graph() {
  const { mealList } = useMealList();
  
  const [dailyGroupedData, setDailyGroupedData] = useState([]);
  useEffect(() => {
    // Group meals by date and calculate totals
    const groupedMeals = mealList.reduce((acc, meal) => {
      const date = new Date(meal.timestamp).toLocaleDateString();
      if (!(date in acc)) {
        acc[date] = {
          calories: 0,
          fat: 0,
          cholesterol: 0,
          sodium: 0,
          sugar: 0,
        };
      }
      acc[date].calories += meal.calories;
      acc[date].fat += meal.fat;
      acc[date].cholesterol += meal.cholesterol;
      acc[date].sodium += meal.sodium;
      acc[date].sugar += meal.sugar;
      return acc;
    }, {});

    // Convert to array and sort by date
    const sortedData = Object.entries(groupedMeals)
      .map(([date, totals]) => ({
        date,
        ...totals,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

      setDailyGroupedData(sortedData);
  }, [])

  const data = {
    labels: dailyGroupedData.map(d => d.date),
    datasets: [
      {
        label: 'Calories',
        data: dailyGroupedData.map(d => d.calories),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Fat (g)',
        data: dailyGroupedData.map(d => d.fat),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
      {
        label: 'Cholesterol (mg)',
        data: dailyGroupedData.map(d => d.cholesterol),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        yAxisID: 'y1',
      },
      {
        label: 'Sodium (mg)',
        data: dailyGroupedData.map(d => d.sodium),
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        yAxisID: 'y1',
      },
      {
        label: 'Sugar (g)',
        data: dailyGroupedData.map(d => d.sugar),
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Nutrition Values',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Calories'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Other Nutrients'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <Container maxW="container.xl" py={8} h="100vh">
      <VStack spacing={8} align="stretch" h="100%">
        <Heading>Nutrition Trends</Heading>

        <Box flex={1} minH="0">
          {dailyGroupedData.length === 0 ? (
            <Text>No data available yet.</Text>
          ) : (
            <Box p={4} borderRadius="lg" boxShadow="md" h="100%">
              <Line options={options} data={data} />
            </Box>
          )}
        </Box>
      </VStack>
    </Container>
  );
} 