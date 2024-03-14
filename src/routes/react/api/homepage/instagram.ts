import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Product } from '../product/products';

// Define your InstagramData type here
interface InstagramData {
  products: Product[];
  img: string;
  title: string;
}

const baseURL = import.meta.env.PUBLIC_API_URL;

const getInstagram = async (): Promise<InstagramData[]> => {
  let genderState;
  // if (typeof window !== 'undefined' && window.localStorage) {
  //   genderState = JSON.parse(localStorage.getItem('selectedGender'));
  // }

  try {
    const response = await axios.get<{ data: any }>(
      genderState === 'women'
        ? `${baseURL}instagram?gender=women`
        : `${baseURL}instagram?gender=men`,
    );
    return response.data.data.data;
  } catch (error) {
    console.error('Error fetching Instagram data:', error);
    throw error;
  }
};

const useGetInstagram = (): UseQueryResult<InstagramData[]> => {
  return useQuery({
    queryKey: ['instagram'],
    queryFn: getInstagram,
  });
};

export { useGetInstagram, getInstagram };
