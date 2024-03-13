import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const baseURL =
  process.env.NEXT_PUBLIC_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_SERVER
    : process.env.NEXT_PUBLIC_SERVER;

interface Brand {
  brandHref: string;
  brandImg: string;
  brandName: string;
  brand: string;
}

const getBrands = async (): Promise<Brand[]> => {
  let genderState;
  if (typeof window !== 'undefined' && window.localStorage) {
    genderState = JSON.parse(localStorage.getItem('selectedGender'));
  }
  const response = await axios.get<{ data: { data: Brand[] } }>(
    genderState === 'women'
      ? `${baseURL}brands?gender=women`
      : `${baseURL}brands?gender=men`,
  );
  return response.data.data.data;
};

const useGetBrands = (): UseQueryResult<Brand[]> => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });
};

export { useGetBrands, getBrands };
