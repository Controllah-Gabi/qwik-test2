import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const baseURL =
  process.env.NEXT_PUBLIC_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_SERVER
    : process.env.NEXT_PUBLIC_SERVER;

interface Product {
  // Define the properties of a product here
}

const getPriceDrops = async (): Promise<Product[]> => {
  let genderState;
  if (typeof window !== 'undefined' && window.localStorage) {
    genderState = JSON.parse(localStorage.getItem('selectedGender'));
  }
  try {
    const response = await axios.get<{ data: { data } }>(
      genderState === 'women'
        ? `${baseURL}products/price-drop?gender=women`
        : `${baseURL}products/price-drop?gender=men`,
    );

    return response.data.data.data;
  } catch (error) {
    console.error('Error fetching price drops:', error);
    throw error;
  }
};

const useGetPriceDrops = (): UseQueryResult<Product[]> => {
  return useQuery({
    queryKey: ['Price drops'],
    queryFn: () => getPriceDrops(),
  });
};

export { getPriceDrops, useGetPriceDrops };
