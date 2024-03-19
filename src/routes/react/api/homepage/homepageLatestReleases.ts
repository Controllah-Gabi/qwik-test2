import axios from 'axios';

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

const getLatestReleases = async (): Promise<Product[]> => {
  let genderState;
  // if (typeof window !== 'undefined' && window.localStorage) {
  //   genderState = JSON.parse(localStorage.getItem('selectedGender'));
  // }
  const response = await axios.get<{ data: any }>(
    genderState === 'women'
      ? `${baseURL}products/latest-releases?gender=women`
      : `${baseURL}products/latest-releases?gender=men`,
  );

  return response.data.data.data;
};

// const useGetLatestReleases = (): UseQueryResult<Product[]> => {
//   return useQuery({
//     queryKey: ['latest_releases'],
//     queryFn: () => getLatestReleases(),
//   });
// };

export {
  getLatestReleases,
  // useGetLatestReleases
};
