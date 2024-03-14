import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const baseURL = import.meta.env.PUBLIC_API_URL;

// Define your Product type here
interface Product {
  // properties of a product
}

const getMostPopular = async (): Promise<Product[]> => {
  let genderState;
  // if (typeof window !== 'undefined' && window.localStorage) {
  //   genderState = JSON.parse(localStorage.getItem('selectedGender'));
  // }
  try {
    const response = await axios.get<{ data: { data: any } }>(
      genderState === 'women'
        ? `${baseURL}products/most-popular?gender=women`
        : `${baseURL}products/most-popular?gender=men`,
    );
    return response.data.data.data;
  } catch (error) {
    console.error('Error fetching recommended products:', error);
    throw error;
  }
};

const useGetMostPopular = (): UseQueryResult<Product[]> => {
  return useQuery({
    queryKey: ['recommended'],
    queryFn: () => getMostPopular(),
  });
};

export { getMostPopular, useGetMostPopular };
