import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const baseURL = import.meta.env.PUBLIC_API_URL;

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

const getPriceDrops = async (): Promise<Product[]> => {
  let genderState;
  // if (typeof window !== 'undefined' && window.localStorage) {
  //   genderState = JSON.parse(localStorage.getItem('selectedGender'));
  // }
  try {
    const response = await axios.get<{ data: { data: any } }>(
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
