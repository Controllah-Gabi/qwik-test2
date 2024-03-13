import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const baseURL =
  process.env.NEXT_PUBLIC_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_SERVER
    : process.env.NEXT_PUBLIC_SERVER;

interface Product {
  // Define the properties of a product here
}

const getLatestReleases = async (): Promise<Product[]> => {
  let genderState;
  if (typeof window !== 'undefined' && window.localStorage) {
    genderState = JSON.parse(localStorage.getItem('selectedGender'));
  }
  const response = await axios.get<{ data }>(
    genderState === 'women'
      ? `${baseURL}products/latest-releases?gender=women`
      : `${baseURL}products/latest-releases?gender=men`,
  );

  return response.data.data.data;
};

const useGetLatestReleases = (): UseQueryResult<Product[]> => {
  return useQuery({
    queryKey: ['latest_releases'],
    queryFn: () => getLatestReleases(),
  });
};

export { getLatestReleases, useGetLatestReleases };
