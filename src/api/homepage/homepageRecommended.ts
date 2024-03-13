import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const baseURL =
  process.env.NEXT_PUBLIC_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_SERVER
    : process.env.NEXT_PUBLIC_SERVER;

// Define your Product type here
interface Product {
  // properties of a product
}

const getRecommended = async (): Promise<Product[]> => {
  let genderState;
  if (typeof window !== 'undefined' && window.localStorage) {
    genderState = JSON.parse(localStorage.getItem('selectedGender'));
  }
  try {
    const response = await axios.get<{ data: { data } }>(
      genderState === 'women'
        ? `${baseURL}products/recommended-for-you?gender=women`
        : `${baseURL}products/recommended-for-you?gender=men`,
    );
    return response.data.data.data;
  } catch (error) {
    console.error('Error fetching recommended products:', error);
    throw error;
  }
};

const useGetRecommended = (): UseQueryResult<Product[]> => {
  return useQuery({
    queryKey: ['recommended'],
    queryFn: () => getRecommended(),
  });
};

export { getRecommended, useGetRecommended };
