import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const baseURL = import.meta.env.PUBLIC_API_URL;

// Define your Product type here
interface Product {
  _id: string;
  productName: string;
  sale: boolean;
  coloursShown: string;
  cheapestPrice: number;
  beforePrice: number;
  inStock: boolean;
  coverImage: string;
  comingSoon: boolean;
  comingSoonDate: string;
  comingSoonTime: string;
  brand: string;
  colourShown: string;
}

const getRecommended = async (): Promise<Product[]> => {
  let genderState;
  // if (typeof window !== 'undefined' && window.localStorage) {
  //   genderState = JSON.parse(localStorage.getItem('selectedGender'));
  // }
  try {
    const response = await axios.get<{ data: { data: any } }>(
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
