import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const baseURL = import.meta.env.PUBLIC_API_URL;

interface Banner {
  desktopImg: string;
  tabletImg: string;
  mobileImg: string;
  itemHref: string;
  bannerName: string;
  length: number;
}

interface ApiResponse {
  data: {
    data: Banner[];
  };
}

const getBanners = async (): Promise<Banner[]> => {
  let genderState;
  // if (typeof window !== 'undefined' && window.localStorage) {
  //   genderState = JSON.parse(localStorage.getItem('selectedGender'));
  // }
  const response = await axios.get<ApiResponse>(
    genderState === 'women'
      ? `${baseURL}banners/website?gender=women`
      : `${baseURL}banners/website?gender=men`,
  );
  return response.data.data.data;
};

const useGetBanners = (): UseQueryResult<Banner[]> => {
  return useQuery({
    queryKey: ['banners'],
    queryFn: getBanners,
  });
};

export { useGetBanners, getBanners };
